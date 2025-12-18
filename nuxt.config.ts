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
  },
  runtimeConfig: {
    // valeurs par défaut (à surcharger via .env)
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || 587,
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    contactRecipient: process.env.CONTACT_RECIPIENT || 'bizconnectnfc@gmail.com',
    // public: { ... } // si besoin d'exposer qqch au client
    public: {
      // Variables publiques (client + serveur)
      accessPassword: process.env.NUXT_PUBLIC_ACCESS_PASSWORD
    }
  }
})
