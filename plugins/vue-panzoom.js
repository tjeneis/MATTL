import panZoom from 'vue-panzoom'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(panZoom)
})