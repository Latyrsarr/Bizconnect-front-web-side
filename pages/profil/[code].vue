<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-4">
    <div class="max-w-md mx-auto">
      <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

      <div v-else-if="profile" class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <!-- En-tête avec photo -->
        <div class="relative bg-gradient-to-br from-orange-400 to-orange-500 h-32"></div>
        
        <!-- Photo de profil -->
        <div class="flex flex-col items-center -mt-16 pb-6">
          <div class="relative">
            <a
              v-if="profile.url_professionnel_photo"
              :href="profile.contact_url ? formatUrl(profile.contact_url) : '#'"
              target="_blank"
              rel="noopener noreferrer"
              title="Lien du profil"
            >
              <img
                v-if="profile.url_professionnel_photo"
                :src="profile.url_professionnel_photo"
                :alt="`Photo de ${profile.nom_complet}`"
                class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div v-else class="w-32 h-32 rounded-full bg-gray-300 border-4 border-white shadow-lg"></div>
            </a>

            <div v-else>
              <img
                v-if="profile.url_professionnel_photo"
                :src="profile.url_professionnel_photo"
                :alt="`Photo de ${profile.nom_complet}`"
                class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div v-else class="w-32 h-32 rounded-full bg-gray-300 border-4 border-white shadow-lg"></div>
            </div>
          </div>

          <!-- Nom et poste -->
          <h1 class="text-2xl font-bold text-gray-800 mt-4">{{ profile.nom_complet }}</h1>
          <p v-if="profile.post" class="text-orange-500 font-medium text-lg italic">{{ profile.post }}</p>
          
          <!-- Bouton Enregistrer (exemple d'action) -->
          <a
            v-if="profile.contact_url"
            :href="formatUrl(profile.contact_url)"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 bg-blue-900 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-800 transition"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
            </svg>
            Enregistrer le contact
          </a>
        </div>

        <!-- Section CONTACT -->
        <div class="px-6 pb-6">
          <div class="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-4">
            <h2 class="text-blue-900 font-bold text-lg mb-4 uppercase">Contact</h2>
            
            <div class="space-y-3">
              <div v-if="profile.num_contact" class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <span class="text-gray-700">{{ profile.num_contact }}</span>
              </div>

              <div v-if="profile.mail_contact" class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <a :href="`mailto:${profile.mail_contact}`" class="text-gray-700 text-sm">{{ profile.mail_contact }}</a>
              </div>

              <div v-if="profile.address_contact" class="flex items-start gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                </div>
                <span class="text-gray-700 text-sm">{{ profile.address_contact }}</span>
              </div>
            </div>
            <!-- Section RÉSEAUX SOCIAUX -->
            <div v-if="socialLinks && Object.keys(socialLinks).length > 0" class="mt-3 w-full">
              <!-- <h2 class="text-blue-900 font-bold text-lg mb-4 uppercase">Réseaux Sociaux</h2> -->
              <div class="flex flex-wrap gap-3 w-full justify-center">
                <!-- Facebook -->
                <a 
                  v-if="socialLinks.facebook" 
                  :href="formatUrl(socialLinks.facebook)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon facebook"
                  title="Facebook"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <!-- LinkedIn -->
                <a 
                  v-if="socialLinks.linkedin" 
                  :href="formatUrl(socialLinks.linkedin)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon linkedin"
                  title="LinkedIn"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <!-- Instagram -->
                <a 
                  v-if="socialLinks.Instagram" 
                  :href="formatUrl(socialLinks.Instagram)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon instagram"
                  title="Instagram"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <!-- Site Web -->
                <a 
                  v-if="socialLinks['web-side']" 
                  :href="formatUrl(socialLinks['web-side'])" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon website"
                  title="Site Web"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </a>

                <!-- Autres réseaux sociaux (générique) -->
                <a 
                  v-for="(value, key) in otherSocialLinks" 
                  :key="key"
                  :href="formatUrl(value)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon other"
                  :title="key"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Section ENTREPRISE -->
          <div class="bg-white border-2 border-gray-200 rounded-2xl p-5">
            <h2 class="text-blue-900 font-bold text-lg mb-4 uppercase">Entreprise</h2>
            
            <!-- Logo entreprise -->
            <div class="flex items-center">
              <div v-if="profile.url_logo_entreprise" class="">
                <img
                  :src="profile.url_logo_entreprise"
                  alt="Logo entreprise"
                  class="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h1 class="text-blue-900 font-bold text-lg">{{ profile.nom_entreprise }}</h1>
              </div>
            </div>

            <div class="space-y-3">
              <div v-if="profile.num_entreprise" class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <span class="text-gray-700">{{ profile.num_entreprise }}</span>
              </div>

              <div v-if="profile.mail_entreprise" class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <a :href="`mailto:${profile.mail_entreprise}`" class="text-gray-700 text-sm">{{ profile.mail_entreprise }}</a>
              </div>

              <div v-if="profile.address_entreprise" class="flex items-start gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span class="text-gray-700 text-sm">{{ profile.address_entreprise }}</span>
              </div>
            </div>
            <div v-if="socialEntrepriseLinks && Object.keys(socialEntrepriseLinks).length > 0" class="mt-3 w-full">
              <div class="w-full flex justify-center flex-wrap gap-3">
                <!-- Facebook Entreprise -->
                <a 
                  v-if="socialEntrepriseLinks.facebook" 
                  :href="formatUrl(socialEntrepriseLinks.facebook)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon facebook"
                  title="Facebook Entreprise"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <!-- LinkedIn Entreprise -->
                <a 
                  v-if="socialEntrepriseLinks.linkedin" 
                  :href="formatUrl(socialEntrepriseLinks.linkedin)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon linkedin"
                  title="LinkedIn Entreprise"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <!-- Instagram Entreprise -->
                <a 
                  v-if="socialEntrepriseLinks.Instagram" 
                  :href="formatUrl(socialEntrepriseLinks.Instagram)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon instagram"
                  title="Instagram Entreprise"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <!-- Twitter/X Entreprise -->
                <a 
                  v-if="socialEntrepriseLinks.twitter || socialEntrepriseLinks.Twitter" 
                  :href="formatUrl(socialEntrepriseLinks.twitter || socialEntrepriseLinks.Twitter)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon twitter"
                  title="Twitter Entreprise"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                <!-- Site Web Entreprise -->
                <a 
                  v-if="socialEntrepriseLinks.website || socialEntrepriseLinks['web-side']" 
                  :href="formatUrl(socialEntrepriseLinks.website || socialEntrepriseLinks['web-side'])" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon website"
                  title="Site Web Entreprise"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </a>

                <!-- YouTube Entreprise -->
                <a 
                  v-if="socialEntrepriseLinks.youtube || socialEntrepriseLinks.Youtube" 
                  :href="formatUrl(socialEntrepriseLinks.youtube || socialEntrepriseLinks.Youtube)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon youtube"
                  title="YouTube Entreprise"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>

                <!-- TikTok Entreprise -->
                <a 
                  v-if="socialEntrepriseLinks.tiktok || socialEntrepriseLinks.TikTok" 
                  :href="formatUrl(socialEntrepriseLinks.tiktok || socialEntrepriseLinks.TikTok)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon tiktok"
                  title="TikTok Entreprise"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>

                <!-- Autres réseaux sociaux entreprise (générique) -->
                <a 
                  v-for="(value, key) in otherEntrepriseLinks" 
                  :key="`entreprise-${key}`"
                  :href="formatUrl(value)" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-icon other"
                  :title="`${key} Entreprise`"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-900 text-white text-center py-4 px-6">
          <p class="text-sm">©{{ year }} BizConnectNFC | {{ profile.num_contact ?? '' }}</p>
        </div>
      </div>

      <div v-else class="text-center text-red-500 bg-white p-8 rounded-3xl shadow-lg">
        Profil introuvable.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Profile {
  id?: number
  code?: string
  nom_complet?: string
  post?: string
  contact_url?: string
  num_contact?: string
  mail_contact?: string
  address_contact?: string
  reseaux_sociaux_contact?: Record<string, string> | string
  nom_entreprise?: string
  num_entreprise?: string
  mail_entreprise?: string
  address_entreprise?: string
  reseaux_sociaux_entreprise?: Record<string, string> | string
  url_logo_entreprise?: string
  url_professionnel_photo?: string
  etat?: string
  createdAt?: string
  updatedAt?: string
}

const route = useRoute()
const code = (route.params.code as string) ?? ''

const profile = ref<Profile | null>(null)
const loading = ref(true)
const year = new Date().getFullYear()

// Fonction pour formater les URLs
const formatUrl = (url: string): string => {
  if (!url) return '#'
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

// Computed pour parser les réseaux sociaux
const socialLinks = computed(() => {
  if (!profile.value?.reseaux_sociaux_contact) return {}
  
  try {
    // Si c'est une string, on la parse
    if (typeof profile.value.reseaux_sociaux_contact === 'string') {
      return JSON.parse(profile.value.reseaux_sociaux_contact)
    }
    // Sinon, on retourne l'objet tel quel
    return profile.value.reseaux_sociaux_contact
  } catch (e) {
    console.error('Erreur de parsing des réseaux sociaux:', e)
    return {}
  }
})

// Computed pour les autres réseaux sociaux (non spécifiquement traités)
const otherSocialLinks = computed(() => {
  const excludedKeys = ['facebook', 'linkedin', 'Instagram', 'web-side']
  return Object.fromEntries(
    Object.entries(socialLinks.value).filter(([key]) => !excludedKeys.includes(key))
  )
})

const socialContactLinks = computed(() => {
  if (!profile.value?.reseaux_sociaux_contact) return {}
  
  try {
    if (typeof profile.value.reseaux_sociaux_contact === 'string') {
      return JSON.parse(profile.value.reseaux_sociaux_contact)
    }
    return profile.value.reseaux_sociaux_contact
  } catch (e) {
    console.error('Erreur de parsing des réseaux sociaux contact:', e)
    return {}
  }
})

const socialEntrepriseLinks = computed(() => {
  if (!profile.value?.reseaux_sociaux_entreprise) return {}
  
  try {
    if (typeof profile.value.reseaux_sociaux_entreprise === 'string') {
      return JSON.parse(profile.value.reseaux_sociaux_entreprise)
    }
    return profile.value.reseaux_sociaux_entreprise
  } catch (e) {
    console.error('Erreur de parsing des réseaux sociaux entreprise:', e)
    return {}
  }
})

const otherEntrepriseLinks = computed(() => {
  const excludedKeys = ['facebook', 'linkedin', 'Instagram', 'twitter', 'Twitter', 
                       'website', 'web-side', 'youtube', 'Youtube', 'tiktok', 'TikTok']
  return Object.fromEntries(
    Object.entries(socialEntrepriseLinks.value).filter(([key]) => !excludedKeys.includes(key))
  )
})

const otherContactLinks = computed(() => {
  const excludedKeys = ['facebook', 'linkedin', 'Instagram', 'web-side']
  return Object.fromEntries(
    Object.entries(socialContactLinks.value).filter(([key]) => !excludedKeys.includes(key))
  )
})

async function fetchProfile(codeParam: string) {
  if (!codeParam) {
    profile.value = null
    loading.value = false
    return
  }

  try {
    // NOTE: en prod, utilisez une variable d'environnement pour baseURL
    const { data } = await axios.get<Profile>(`https://bizconnect-back-web-side.onrender.com/profiles/code/${encodeURIComponent(codeParam)}`)
    profile.value = data
  } catch (err) {
    console.error('Erreur lors de la récupération du profil :', err)
    profile.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfile(code)
})

function saveContact() {
  // Exemple minimal : ouvrir le mailto si mail présent, sinon rien.
  if (profile.value?.mail_contact) {
    window.location.href = `mailto:${profile.value.mail_contact}`
  } else if (profile.value?.num_contact) {
    // Essayer d'ouvrir le dialer sur mobile
    window.location.href = `tel:${profile.value.num_contact}`
  } else {
    // placeholder - ici vous pouvez implémenter la sauvegarde dans le carnet d'adresses
    console.info('Aucune info de contact disponible pour enregistrer.')
  }
}
</script>

<style scoped>
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: #374151;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.social-icon.facebook:hover {
  background-color: #1877f2;
  color: white;
}

.social-icon.linkedin:hover {
  background-color: #0077b5;
  color: white;
}

.social-icon.instagram:hover {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
  color: white;
}

.social-icon.website:hover {
  background-color: #10b981;
  color: white;
}

.social-icon.other:hover {
  background-color: #8b5cf6;
  color: white;
}

.social-icon svg {
  width: 24px;
  height: 24px;
}

.social-icon.twitter:hover {
  background-color: #000000;
  color: white;
}

.social-icon.youtube:hover {
  background-color: #FF0000;
  color: white;
}

.social-icon.tiktok:hover {
  background-color: #000000;
  color: white;
}

/* Taille des icônes entreprise (légèrement plus petites pour mieux s'intégrer) */
.social-icon {
  width: 40px;
  height: 40px;
}

.social-icon svg {
  width: 20px;
  height: 20px;
}

/* Style spécifique pour la section entreprise */
.border-t {
  border-top-width: 1px;
}
</style>