import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [
      svgLoader()
    ]
  },
  
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '@/assets/css/main.scss',
    '@/assets/css/keyframes.scss',
  ],
})
