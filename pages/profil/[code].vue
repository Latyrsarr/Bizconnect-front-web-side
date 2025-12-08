<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8 px-4">
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
              :href="profile.url_professionnel_photo.startsWith('http') ? profile.contact_url : `https://${profile.contact_url}`"
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
          <button
            class="mt-4 bg-blue-900 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-800 transition"
            @click="saveContact"
            aria-label="Enregistrer le contact"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
            </svg>
            Enregistrer le contact
          </button>
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
          </div>
          <!-- <p>{{ profile.reseaux_sociaux_contact }}</p> -->
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
import { ref, onMounted } from 'vue'
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
  reseaux_sociaux_contact?: Record<string, string>
  nom_entreprise?: string
  num_entreprise?: string
  mail_entreprise?: string
  address_entreprise?: string
  reseaux_sociaux_entreprise?: Record<string, string>
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

async function fetchProfile(codeParam: string) {
  if (!codeParam) {
    profile.value = null
    loading.value = false
    return
  }

  try {
    // NOTE: en prod, utilisez une variable d'environnement pour baseURL
    const { data } = await axios.get<Profile>(`http://localhost:3001/profiles/code/${encodeURIComponent(codeParam)}`)
    // la réponse de votre API correspond aux clés utilisées dans le template
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