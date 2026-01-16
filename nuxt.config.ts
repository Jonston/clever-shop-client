// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-laravel-echo',
  ],
  css: [
    '~/assets/css/main.css'
  ],
  echo: {
    key: process.env.ECHO_APP_KEY || 'zeziyjko1mwac64iwuru',
    broadcaster: 'reverb', // available: reverb, pusher
    host: 'localhost',
    port: 8080,
    scheme: 'http', // available: http, https
    transports: ['ws', 'wss'],
    authentication: {
      mode: 'cookie',
      baseUrl: 'http://localhost',
      authEndpoint: '/broadcasting/auth',
      csrfEndpoint: '/sanctum/csrf-cookie',
      csrfCookie: 'XSRF-TOKEN',
      csrfHeader: 'X-XSRF-TOKEN',
    },
    logLevel: 3,
    properties: undefined,
  },
  vite: {
    optimizeDeps: {
      include: ['nuxt-laravel-echo > pusher-js'],
    },
  },
  devtools: {
    enabled: false
  },
  compatibilityDate: '2024-04-03',
})