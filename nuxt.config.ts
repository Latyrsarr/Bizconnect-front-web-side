export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', '@nuxtjs/sitemap'
  ],
  sitemap: {
    siteUrl: 'https://bizconnect-front-web-side.vercel.app',
  },
  css: [
    '@/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'BizConnect',
      meta: [
        { name: 'description', content: 'La plateforme de mise en relation pour les professionnels, carte de visite numérique et gestion de contacts. carte de visite sans contact. carte de visite nfc.' },
        { name: 'robots', content: 'index, follow' }
      ],
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
  },
  ssr: true
})
