import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Markt | Tintelingen',
    htmlAttrs: {
      lang: 'nl'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: '//use.typekit.net/wvv0oba.css' }
    ]
  },

  css: [
    '~/assets/css/main.scss',
    '~/assets/css/keyframes.scss',
  ],

  plugins: [
    '~/plugins/eventBus.js',
    '~/plugins/repositories.js',
    '~/plugins/filters.js',
    { src: '~/plugins/vue-countdown.js', ssr: false },
    { src: '~/plugins/vue-masonry.js', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/svg',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      {
        code: 'nl',
        file: 'nl.js'
      },
      {
        code: 'en',
        file: 'en.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'nl'
  },

  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    optionsPath: '~/vuetify.options.js',
    defaultAssets: {
      font: false,
      icons: 'fa'
    },
    treeShake: true,
  },

  axios: {
    baseURL: process.env.API_BASE_URL
  },

  build: {
  }
})