import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },

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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8002/api'
    }
  },

  vite: {
    test: {
      environment: 'happy-dom'
    }
  }
})
