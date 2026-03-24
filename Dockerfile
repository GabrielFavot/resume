FROM node:20-alpine AS base

# Stage deps
FROM base AS deps
WORKDIR /app
COPY package*.json ./
ENV npm_config_loglevel=error
RUN npm install --legacy-peer-deps --ignore-scripts

# Stage builder (with Chromium for PDF generation)
FROM base AS builder

# Install Chromium dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Re-install to ensure devDependencies are available (for build scripts)
RUN npm install --legacy-peer-deps

# Build the theme
RUN npm run build:theme

# Build Nuxt
RUN npm run build

# Generate PDFs (requires the built app)
RUN npm run generate:pdf

# Stage runner (lightweight, no Chromium needed)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
