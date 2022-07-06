import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
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
    '~/assets/css/keyframes.scss'
  ],

  plugins: [
    '~/plugins/error-handler.js',
    '~/plugins/eventBus.js',
    '~/plugins/repositories.js',
    '~/plugins/filters.js',
    '~/plugins/mock-service-worker.js',
    { src: '~/plugins/vue-countdown.js', ssr: false },
    { src: '~/plugins/vue-flag-icon.js', ssr: false },
    { src: '~/plugins/vue-marquee-text-component.js', ssr: false },
    { src: '~/plugins/vue-masonry.js', ssr: false }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/svg'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    '@nuxtjs/toast'
  ],

  i18n: {
    locales: [
      {
        code: 'nl',
        file: 'nl.js',
        iso: 'nl'
      },
      {
        code: 'en',
        file: 'en.js',
        iso: 'gb'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'nl'
  },

  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    optionsPath: '~/vuetify.options.js',
    defaultAssets: {
      font: false,
      icons: 'fa'
    },
    treeShake: true
  },

  router: {
    // middleware: ['auth'],
    prefetchLinks: false
  },

  axios: {
    baseURL: process.env.API_BASE_URL
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1800,
          global: true
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user'
        // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
          refresh: { url: '/api/auth/refresh', method: 'post' }
        }
      }
    }
  },

  toast: {
    position: 'bottom-center',
    duration: 3000,
    iconPack: 'fontawesome'
  },

  build: {
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler')
      }
    }
  }
})
