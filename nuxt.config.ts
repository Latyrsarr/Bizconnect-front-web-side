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
      title: 'BizConnect - Solutions NFC à Dakar',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'BizConnect - Plateforme de mise en relation professionnelle à Dakar. Carte de visite numérique NFC, gestion de contacts et solutions sans contact.' 
        },
        { name: 'robots', content: 'index, follow' },
        
        // Open Graph pour Facebook/LinkedIn
        { property: 'og:title', content: 'BizConnect - Solutions NFC Innovantes à Dakar' },
        { property: 'og:description', content: 'Transformez vos interactions physiques en opportunités numériques avec nos solutions NFC à Dakar, Sénégal.' },
        { property: 'og:image', content: 'https://bizconnect-front-web-side.vercel.app/bizconnect.svg' },
        { property: 'og:url', content: 'https://bizconnect-front-web-side.vercel.app' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_SN' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'BizConnect Dakar' },
        { name: 'twitter:description', content: 'La connectivité au bout des doigts à Dakar' },
        { name: 'twitter:image', content: 'https://bizconnect-front-web-side.vercel.app/bizconnect.svg' },
        
        // Mobile
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        // UNIQUEMENT votre logo SVG - CORRECTEMENT FORMATÉ
        { 
          rel: 'icon', 
          type: 'image/svg+xml', 
          href: '/bizconnect.svg' 
        },
        
        // Optionnel: pour Apple devices
        { 
          rel: 'apple-touch-icon', 
          href: '/bizconnect.svg' 
        }
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
