# 📄 Resume

![Nuxt](https://img.shields.io/badge/Nuxt-4.2.2-00DC82?logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![GitHub](https://img.shields.io/github/stars/GabrielFavot/resume?style=social)

Nuxt 4 application to display an interactive resume based on the [JSON Resume](https://jsonresume.org) schema.

🌐 **Live Demo**: [cv.gab.pm](https://cv.gab.pm)  
🚀 **Hosted on**: [Coolify](https://coolify.io) - Auto-deployed on push

## 🚀 How to Install

```bash
# Clone the repository
git clone https://github.com/GabrielFavot/resume.git
cd resume

# Install dependencies
npm install
```

## 📝 How to Use

1. **Replace the JSON files** in `public/resume/` with your own resume data following the [JSON Resume schema](https://jsonresume.org/schema/):
   - `public/resume/resume_en.json` - English version
   - `public/resume/resume_fr.json` - French version

2. **Set up logo.dev API key** (optional but recommended):
   
   Create a `.env` file:
   ```env
   NUXT_PUBLIC_LOGO_DEV_API_KEY=your_api_key_here
   ```
   
   Or with Docker Compose:
   ```bash
   LOGO_DEV_API_KEY=your_api_key_here docker-compose up
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🎨 Assets

Assets like profile pictures and company logos are automatically fetched via [logo.dev](https://logo.dev):
- **Profile picture**: Automatically fetched from the first profile URL in `basics.profiles`
- **Company logos**: Automatically fetched using the company name from the work/education sections

## 🐳 Docker

```bash
docker-compose up
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
