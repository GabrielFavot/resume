export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },
  css: ['~/assets/css/main.css'],
  nitro: {
    host: '0.0.0.0',
    port: 3000
  },
  runtimeConfig: {
    public: {
      logoDevApiKey: ''
    }
  }
})