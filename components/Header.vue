<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4 relative">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-14 h-14 rounded-lg flex items-center justify-center mt-2">
            <img src="assets/bizconnect.svg" alt="">
          </div>
          <span class="text-2xl font-bold text-blue-900">BizConnect</span>
        </div>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium">
            Accueil
          </NuxtLink>
          <NuxtLink to="/solutions" class="text-gray-700 hover:text-blue-600 font-medium">
            Solutions
          </NuxtLink>
          <NuxtLink to="/pricing" class="text-gray-700 hover:text-blue-600 font-medium">
            Tarifs
          </NuxtLink>
          <NuxtLink to="/events" class="text-gray-700 hover:text-blue-600 font-medium">
            Événements
          </NuxtLink>
          <NuxtLink to="/contact" 
            class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
            Demander un devis
          </NuxtLink>
        </div>

        <!-- Menu Mobile (Burger) -->
        <button @click="toggleMenu" class="md:hidden focus:outline-none z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Menu Mobile (Dropdown) - Position absolue -->
      <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 right-0 bg-gray-400 opacity-90 shadow-lg border-t border-gray-100 z-40">
        <div class="container mx-auto px-4 py-6">
          <div class="flex flex-col space-y-5">
            <NuxtLink to="/" @click="closeMenu" class="text-gray-900 hover:text-blue-600 font-medium py-2 text-lg flex justify-center">
              Accueil
            </NuxtLink>
            <NuxtLink to="/solutions" @click="closeMenu" class="text-gray-900 hover:text-blue-600 font-medium py-2 text-lg flex justify-center">
              Solutions
            </NuxtLink>
            <NuxtLink to="/pricing" @click="closeMenu" class="text-gray-900 hover:text-blue-600 font-medium py-2 text-lg flex justify-center">
              Tarifs
            </NuxtLink>
            <NuxtLink to="/events" @click="closeMenu" class="text-gray-900 hover:text-blue-600 font-medium py-2 text-lg flex justify-center">
              Événements
            </NuxtLink>
            <NuxtLink to="/contact" @click="closeMenu"
              class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition text-center mt-4">
              Demander un devis
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.router-link-active {
  color: #2563eb;
  font-weight: 600;
}

/* Optionnel: Animation pour le menu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>