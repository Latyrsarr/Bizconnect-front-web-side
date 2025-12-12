<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header présent dans toutes les pages -->
    <Header />
    
    <!-- Contenu spécifique à chaque page -->
    <main class="flex-grow">
      <slot />
    </main>
    
    <!-- Footer présent dans toutes les pages -->
    <Footer />
  </div>
</template>

<script setup>
// Import des composants Header et Footer
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>