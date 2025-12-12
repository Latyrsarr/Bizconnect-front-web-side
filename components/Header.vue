<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
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
        <button class="md:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.router-link-active {
  color: #2563eb;
  font-weight: 600;
}
</style>