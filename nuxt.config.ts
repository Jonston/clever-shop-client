// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  devtools: {
    enabled: false
  },
  compatibilityDate: '2024-04-03',
})