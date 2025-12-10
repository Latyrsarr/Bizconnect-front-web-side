export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  css: [
    '@/assets/css/main.css'
  ],
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg", href: "/bizconnect.svg" }
      ]
    }
  }
})
