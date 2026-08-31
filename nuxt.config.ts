export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/i18n'
  ],
  icon: {
    clientBundle: {
      scan: true,
      icons: ['circle-flags:fr', 'circle-flags:gb']
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },
  css: ['~/assets/css/main.css'],
  nitro: {
    host: '0.0.0.0',
    port: 3000
  },
  runtimeConfig: {
    public: {
      logoDevApiKey: '',
      resumeDefaultLang: process.env.RESUME_DEFAULT_LANG || 'en'
    }
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix'
  }
})