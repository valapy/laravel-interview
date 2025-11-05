// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'Josefin Sans': [400, 700]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
    }
  },

  vite: {
    test: {
      environment: 'happy-dom'
    }
  }
})
