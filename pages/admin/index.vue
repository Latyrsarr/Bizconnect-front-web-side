<script setup>
import { ref } from 'vue'

useSeoMeta({
  title: 'Page Admin',
  description: 'Gestion des profils et des utilisateurs'
})

const password = ref('')
const isAuthenticated = ref(false)

// Récupération du mot de passe depuis l'environnement
const config = useRuntimeConfig()
const correctPassword = config.public.accessPassword

const validatePassword = () => {
  if (password.value === correctPassword) {
    isAuthenticated.value = true
  } else {
    alert('Mot de passe incorrect !')
    password.value = '' // Réinitialise le champ
  }
}
</script>

<template>
  <div>
    <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-screen">
      <div class="w-full max-w-md border-2 border-gray-300 rounded-lg p-6">
        <h1 class="text-xl font-bold text-center mb-6">
          Entrez le mot de passe pour accéder :
        </h1>
        
        <input 
          v-model="password"
          type="password" 
          class="border-2 rounded-lg w-full px-4 text-lg h-10 mb-6" 
          placeholder="Mot de passe"
          @keyup.enter="validatePassword"
        />
        
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-lg text-white py-2 px-8 rounded-lg w-full" 
          @click="validatePassword"
        >
          Valider
        </button>
      </div>
    </div>

    <div v-else>
      <Profiles />
    </div>
  </div>
</template>