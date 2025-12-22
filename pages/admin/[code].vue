<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 pt-4">
    <div class="max-w-md mx-auto">
      <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

      <div v-else-if="profile" class="bg-white rounded-t-3xl shadow-2xl overflow-hidden">
        <!-- En-tête avec photo - Couleur dynamique -->
        <div 
          :class="headerGradientClass" 
          class="relative h-32"
        ></div>
        
        <!-- Photo de profil -->
        <div class="flex flex-col items-center -mt-16 pb-6">
          <div class="relative">
            <a
              v-if="profile.url_professionnel_photo && !isEditing"
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
              <div v-if="!isEditing">
                <img
                  v-if="profile.url_professionnel_photo"
                  :src="profile.url_professionnel_photo"
                  :alt="`Photo de ${profile.nom_complet}`"
                  class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div v-else class="w-32 h-32 rounded-full bg-gray-300 border-4 border-white shadow-lg"></div>
              </div>
              
              <!-- Champ de modification de la photo en mode édition -->
              <div v-if="isEditing" class="flex flex-col items-center gap-2">
                <div v-if="profile.url_professionnel_photo" class="mb-2">
                  <img
                    :src="profile.url_professionnel_photo"
                    :alt="`Photo de ${profile.nom_complet}`"
                    class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div class="w-full max-w-xs">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Photo de profil URL</label>
                  <input
                    v-model="editableProfile.url_professionnel_photo"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://exemple.com/photo.jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Nom et poste -->
          <div v-if="!isEditing" class="text-center">
            <h1 class="text-2xl font-bold text-gray-800 mt-4">{{ profile.nom_complet }}</h1>
            <!-- Poste avec couleur dynamique -->
            <p 
              v-if="profile.post" 
              :class="postTextColorClass"
              class="font-medium text-lg italic mt-2"
            >
              {{ profile.post }}
            </p>

            <!-- Badge affichant l'état du profil -->
            <div v-if="profile.etat" class="mt-3">
              <span :class="['inline-block px-3 py-1 rounded-full text-xs font-semibold', etatBadgeClass]">
                {{ profile.etat }}
              </span>
            </div>
          </div>
          
          <!-- Champs éditables pour nom et poste -->
          <div v-else class="w-full max-w-xs space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                v-model="editableProfile.nom_complet"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom complet"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
              <input
                v-model="editableProfile.post"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre poste"
              />
            </div>

            <!-- Nouveau: sélection de l'état du profil -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">État du profil</label>
              <select
                v-model="editableProfile.etat"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choisir --</option>
                <option value="en_attente_de_validation">En attente de validation</option>
                <option value="active">Active</option>
                <option value="desactive">Desactive</option>
              </select>
            </div>
          </div>
          
          <!-- Bouton Enregistrer contact -->
          <a
            v-if="profile.contact_url && !isEditing"
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

          <!-- Bouton Modifier/Enregistrer/Annuler -->
          <div class="mt-4 flex gap-3">
            <button
              v-if="!isEditing"
              @click="startEditing"
              class="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Modifier le profil
            </button>
            
            <div v-else class="flex gap-3">
              <button
                @click="saveChanges"
                :disabled="saving"
                class="bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-50"
              >
                <svg v-if="!saving" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span v-if="saving" class="animate-pulse">Sauvegarde...</span>
                <span v-else>Enregistrer</span>
              </button>
              
              <button
                @click="cancelEditing"
                :disabled="saving"
                class="bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-700 transition disabled:opacity-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Annuler
              </button>
            </div>
          </div>
        </div>

        <!-- Section CONTACT -->
        <div class="px-6 pb-6">
          <div class="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-4">
            <h2 class="text-blue-900 font-bold text-lg mb-4 uppercase">Contact</h2>
            
            <div class="space-y-3">
              <!-- Téléphone personnel -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div v-if="!isEditing" class="flex-1">
                  <a v-if="profile.num_contact" :href="`tel:${profile.num_contact}`" class="text-gray-700 hover:text-blue-600 transition">{{ profile.num_contact }}</a>
                  <span v-else class="text-gray-500 italic">Non renseigné</span>
                </div>
                <div v-else class="flex-1">
                  <input
                    v-model="editableProfile.num_contact"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Numéro de téléphone"
                  />
                </div>
              </div>

              <!-- Email personnel -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div v-if="!isEditing" class="flex-1">
                  <a v-if="profile.mail_contact" :href="`mailto:${profile.mail_contact}`" class="text-gray-700 text-sm">{{ profile.mail_contact }}</a>
                  <span v-else class="text-gray-500 italic text-sm">Non renseigné</span>
                </div>
                <div v-else class="flex-1">
                  <input
                    v-model="editableProfile.mail_contact"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adresse email"
                  />
                </div>
              </div>

              <!-- Adresse personnelle -->
              <div class="flex gap-3 items-center">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                </div>
                <div v-if="!isEditing" class="flex-1">
                  <span v-if="profile.address_contact" class="text-gray-700 text-sm">{{ profile.address_contact }}</span>
                  <span v-else class="text-gray-500 italic text-sm">Non renseigné</span>
                </div>
                <div v-else class="flex-1">
                  <input
                    v-model="editableProfile.address_contact"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adresse"
                  />
                </div>
              </div>

              <!-- URL de contact -->
              <div v-if="isEditing" class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <input
                    v-model="editableProfile.contact_url"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="URL de contact personnel"
                  />
                </div>
              </div>
            </div>

            <!-- Section RÉSEAUX SOCIAUX PERSONNELS -->
            <div v-if="(!isEditing && socialLinks && Object.keys(socialLinks).length > 0) || isEditing" class="mt-2">
              <!-- <h3 class="text-blue-900 font-bold text-md mb-3">Réseaux Sociaux Personnels</h3> -->
              
              <div v-if="!isEditing" class="flex flex-wrap gap-3 w-full justify-center">
                <!-- Icônes des réseaux sociaux (mode lecture) -->
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
                <!-- ... autres icônes ... -->
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
              
              <!-- Champs éditables pour les réseaux sociaux personnels -->
              <div v-else class="space-y-3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Facebook</label>
                    <input
                      v-model="editableSocialLinks.facebook"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL Facebook"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input
                      v-model="editableSocialLinks.linkedin"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL LinkedIn"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Instagram</label>
                    <input
                      v-model="editableSocialLinks.Instagram"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL Instagram"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Site Web</label>
                    <input
                      v-model="editableSocialLinks['web-side']"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL Site Web"
                    />
                  </div>
                </div>
                
                <!-- Champ pour autres réseaux sociaux -->
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Autres réseaux (JSON)</label>
                  <textarea
                    v-model="otherSocialLinksJson"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                    rows="3"
                    placeholder='{"twitter": "https://twitter.com/...", "youtube": "https://youtube.com/..."}'
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">Format JSON: {"nom_plateforme": "url"}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section ENTREPRISE -->
          <div class="bg-white border-2 border-gray-200 rounded-2xl p-5">
            <!-- Logo et nom entreprise -->
            <div class="flex items-center mb-6">
              <div v-if="!isEditing && profile.url_logo_entreprise" class="">
                <img
                  :src="profile.url_logo_entreprise"
                  alt="Logo entreprise"
                  class="w-16 h-16 object-contain"
                />
              </div>
              
              <div v-if="!isEditing">
                <h2 :class="postTextColorClass" class="font-bold text-xl ml-2">{{ profile.nom_entreprise }}</h2>
              </div>
              
              <!-- Champs éditables pour l'entreprise -->
              <div v-else class="flex-1 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                  <input
                    v-model="editableProfile.nom_entreprise"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom de l'entreprise"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Logo entreprise URL</label>
                  <input
                    v-model="editableProfile.url_logo_entreprise"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://exemple.com/logo.png"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <!-- Téléphone entreprise -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div v-if="!isEditing" class="flex-1">
                  <a v-if="profile.num_entreprise" :href="`tel:${profile.num_entreprise}`" class="text-gray-700 hover:text-blue-600 transition">{{ profile.num_entreprise }}</a>
                  <span v-else class="text-gray-500 italic">Non renseigné</span>
                </div>
                <div v-else class="flex-1">
                  <input
                    v-model="editableProfile.num_entreprise"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Téléphone entreprise"
                  />
                </div>
              </div>

              <!-- Email entreprise -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div v-if="!isEditing" class="flex-1">
                  <a v-if="profile.mail_entreprise" :href="`mailto:${profile.mail_entreprise}`" class="text-gray-700 text-sm">{{ profile.mail_entreprise }}</a>
                  <span v-else class="text-gray-500 italic text-sm">Non renseigné</span>
                </div>
                <div v-else class="flex-1">
                  <input
                    v-model="editableProfile.mail_entreprise"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email entreprise"
                  />
                </div>
              </div>

              <!-- Adresse entreprise -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div v-if="!isEditing" class="flex-1">
                  <span v-if="profile.address_entreprise" class="text-gray-700 text-sm">{{ profile.address_entreprise }}</span>
                  <span v-else class="text-gray-500 italic text-sm">Non renseigné</span>
                </div>
                <div v-else class="flex-1">
                  <input
                    v-model="editableProfile.address_entreprise"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adresse entreprise"
                  />
                </div>
              </div>
            </div>
            
            <!-- Section RÉSEAUX SOCIAUX ENTREPRISE -->
            <div v-if="(!isEditing && socialEntrepriseLinks && Object.keys(socialEntrepriseLinks).length > 0) || isEditing" class="mt-2">
              <!-- <h3 class="text-blue-900 font-bold text-md mb-3">Réseaux Sociaux Entreprise</h3> -->
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


              <!-- Champs éditables pour les réseaux sociaux entreprise -->
              <div v-if="isEditing" class="space-y-3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Facebook Entreprise</label>
                    <input
                      v-model="editableEntrepriseLinks.facebook"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL Facebook"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">LinkedIn Entreprise</label>
                    <input
                      v-model="editableEntrepriseLinks.linkedin"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL LinkedIn"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Instagram Entreprise</label>
                    <input
                      v-model="editableEntrepriseLinks.Instagram"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL Instagram"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Site Web Entreprise</label>
                    <input
                      v-model="editableEntrepriseLinks['web-side']"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL Site Web"
                    />
                  </div>
                </div>
                
                <!-- Champ pour autres réseaux sociaux entreprise -->
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Autres réseaux entreprise (JSON)</label>
                  <textarea
                    v-model="otherEntrepriseLinksJson"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                    rows="3"
                    placeholder='{"twitter": "https://twitter.com/...", "youtube": "https://youtube.com/..."}'
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">Format JSON: {"nom_plateforme": "url"}</p>
                </div>
              </div>
              
              <!-- Icônes des réseaux sociaux entreprise (mode lecture) -->
              <div v-if="!isEditing" class="w-full flex justify-center flex-wrap gap-3">
                <!-- ... icônes existantes ... -->
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex mt-6">
          <div class="w-full bg-gray-900 flex items-center justify-center text-white text-center py-2">
            <p class=" text-base py-2">©{{ year }} BizConnect</p><p class="ml-2">|</p>
            <NuxtLink
              to="/profil/create"
              class="flex items-center bg-gray-900 px-2 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <img class="h-8 mr-2" src="assets/photo9.png" alt=""><p class="underline-custom">Commander ma carte</p>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-red-500 bg-white p-8 rounded-3xl shadow-lg">
        Profil introuvable.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

definePageMeta({
  layout: false
})

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
  pallette_couleur?: string
  createdAt?: string
  updatedAt?: string
}

const route = useRoute()
const code = (route.params.code as string) ?? ''

const profile = ref<Profile | null>(null)
const loading = ref(true)
const saving = ref(false)
const isEditing = ref(false)
const year = new Date().getFullYear()

// Copie modifiable du profil
const editableProfile = ref<Profile>({})
const editableSocialLinks = ref<Record<string, string>>({})
const editableEntrepriseLinks = ref<Record<string, string>>({})
const otherSocialLinksJson = ref('')
const otherEntrepriseLinksJson = ref('')

// Mapping des palettes de couleurs selon vos spécifications
const paletteMapping = {
  A: {
    headerGradient: 'bg-gradient-to-br from-green-600 to-green-700',
    postText: 'text-green-700'
  },
  B: {
    headerGradient: 'bg-gradient-to-br from-gray-600 to-gray-800',
    postText: 'text-gray-700'
  },
  C: {
    headerGradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
    postText: 'text-orange-600'
  },
  D: {
    headerGradient: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
    postText: 'text-yellow-500'
  },
  E: {
    headerGradient: 'bg-gradient-to-br from-red-500 to-red-600',
    postText: 'text-red-600'
  },
  F: {
    headerGradient: 'bg-gradient-to-br from-red-800 to-red-900',
    postText: 'text-red-900'
  },
  G: {
    headerGradient: 'bg-gradient-to-br from-yellow-800 to-yellow-900',
    postText: 'text-yellow-900'
  },
  H: {
    headerGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    postText: 'text-blue-500'
  }
} as const

type PaletteKey = keyof typeof paletteMapping

// Computed pour obtenir la classe de gradient de l'en-tête
const headerGradientClass = computed(() => {
  const paletteKey = (profile.value?.pallette_couleur || 'C') as PaletteKey
  return paletteMapping[paletteKey]?.headerGradient || 'bg-gradient-to-br from-orange-400 to-orange-500'
})

// Computed pour obtenir la couleur du texte du poste
const postTextColorClass = computed(() => {
  const paletteKey = (profile.value?.pallette_couleur || 'C') as PaletteKey
  return paletteMapping[paletteKey]?.postText || 'text-orange-500'
})

// Nouveau: liste des états autorisés
const allowedEtats = ['en_attente_de_validation', 'active', 'desactive'] as const

// Nouveau: classe pour le badge d'état
const etatBadgeClass = computed(() => {
  const e = (profile.value?.etat || '').toString().toLowerCase()
  if (!e) return 'bg-gray-200 text-gray-800'
  if (e === 'active') return 'bg-green-100 text-green-800'
  if (e === 'desactive') return 'bg-yellow-100 text-yellow-800'
  if (e === 'en_attente_de_validation') return 'bg-gray-100 text-gray-800'
  return 'bg-blue-100 text-blue-800'
})

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

// Démarrer l'édition
const startEditing = () => {
  // Copier le profil original dans la version modifiable
  editableProfile.value = { ...profile.value }
  
  // Initialiser les réseaux sociaux éditables
  editableSocialLinks.value = {
    facebook: socialLinks.value.facebook || '',
    linkedin: socialLinks.value.linkedin || '',
    Instagram: socialLinks.value.Instagram || '',
    'web-side': socialLinks.value['web-side'] || ''
  }
  
  // Initialiser les réseaux sociaux entreprise éditables
  editableEntrepriseLinks.value = {
    facebook: socialEntrepriseLinks.value.facebook || '',
    linkedin: socialEntrepriseLinks.value.linkedin || '',
    Instagram: socialEntrepriseLinks.value.Instagram || '',
    'web-side': socialEntrepriseLinks.value['web-side'] || ''
  }
  
  // Préparer les autres réseaux sociaux pour l'édition JSON
  const otherSocialLinks = Object.fromEntries(
    Object.entries(socialLinks.value).filter(([key]) => 
      !['facebook', 'linkedin', 'Instagram', 'web-side'].includes(key)
    )
  )
  otherSocialLinksJson.value = Object.keys(otherSocialLinks).length > 0 
    ? JSON.stringify(otherSocialLinks, null, 2)
    : ''
    
  const otherEntLinks = Object.fromEntries(
    Object.entries(socialEntrepriseLinks.value).filter(([key]) => 
      !['facebook', 'linkedin', 'Instagram', 'web-side'].includes(key)
    )
  )
  otherEntrepriseLinksJson.value = Object.keys(otherEntLinks).length > 0 
    ? JSON.stringify(otherEntLinks, null, 2)
    : ''
  
  isEditing.value = true
}

// Annuler l'édition
const cancelEditing = () => {
  isEditing.value = false
  editableProfile.value = {}
  editableSocialLinks.value = {}
  editableEntrepriseLinks.value = {}
  otherSocialLinksJson.value = ''
  otherEntrepriseLinksJson.value = ''
}

// Sauvegarder les modifications
const saveChanges = async () => {
  saving.value = true
  
  try {
    // Validation: état autorisé
    const etatValue = editableProfile.value.etat ? editableProfile.value.etat.toString() : ''
    if (etatValue && !allowedEtats.includes(etatValue as any)) {
      alert('État invalide. Valeurs autorisées : en_attente_de_validation, active, desactive.')
      saving.value = false
      return
    }

    // Préparer les données des réseaux sociaux
    const reseauxSociauxContact = { ...editableSocialLinks.value }
    if (otherSocialLinksJson.value.trim()) {
      try {
        const otherLinks = JSON.parse(otherSocialLinksJson.value)
        Object.assign(reseauxSociauxContact, otherLinks)
      } catch (e) {
        console.error('Erreur de parsing JSON pour réseaux sociaux:', e)
      }
    }
    
    // Préparer les données des réseaux sociaux entreprise
    const reseauxSociauxEntreprise = { ...editableEntrepriseLinks.value }
    if (otherEntrepriseLinksJson.value.trim()) {
      try {
        const otherEntLinks = JSON.parse(otherEntrepriseLinksJson.value)
        Object.assign(reseauxSociauxEntreprise, otherEntLinks)
      } catch (e) {
        console.error('Erreur de parsing JSON pour réseaux sociaux entreprise:', e)
      }
    }
    
    // Préparer les données complètes à envoyer
    const dataToSend = {
      ...editableProfile.value,
      reseaux_sociaux_contact: JSON.stringify(reseauxSociauxContact),
      reseaux_sociaux_entreprise: JSON.stringify(reseauxSociauxEntreprise)
    }
    
    // Envoyer la requête PUT pour mettre à jour le profil
    const { data } = await axios.put(
      `https://bizconnect-back-web-side.vercel.app/profiles/${editableProfile.value.id}`,
      dataToSend
    )
    
    // Mettre à jour le profil local
    profile.value = data
    
    // Quitter le mode édition
    isEditing.value = false
    
    // Afficher un message de succès
    alert('Profil mis à jour avec succès!')
    
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la mise à jour du profil. Veuillez réessayer.')
  } finally {
    saving.value = false
  }
}

async function fetchProfile(codeParam: string) {
  if (!codeParam) {
    profile.value = null
    loading.value = false
    return
  }

  try {
    const { data } = await axios.get<Profile>(`https://bizconnect-back-web-side.vercel.app/profiles/code/${encodeURIComponent(codeParam)}`)
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
</script>

<!-- Les styles CSS restent identiques -->

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

.underline-custom {
  position: relative;
  display: inline-block;
  font-weight: 600;
}

.underline-custom::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 1px; /* épaisseur du soulignement */
  background-color: #ffffff;
  border-radius: 4px;
}
</style>