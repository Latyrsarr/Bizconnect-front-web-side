<template>
  <div>
    <!-- Hero Solutions -->
    <section class="bg-gradient-to-br from-blue-50 to-white py-12 md:py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-6">
          Nos <span class="text-blue-600">Solutions</span> Innovantes
        </h1>
        <p class="text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto px-4">
          Découvrez notre gamme complète de produits et services pour digitaliser votre entreprise
        </p>
      </div>
    </section>

    <!-- Navigation ancres - Version mobile améliorée -->
    <div class="sticky top-0 md:top-20 z-40 bg-white shadow-sm">
      <nav class="container mx-auto px-2 md:px-4">
        <div class="flex overflow-x-auto py-3 md:py-4 hide-scrollbar">
          <div class="flex space-x-2 md:space-x-4 md:justify-center min-w-full md:min-w-0">
            <a href="#cartes"
              @click="activeSection = 'carte-nfc'"
              :class="activeSection === 'carte-nfc'
                ? 'bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap'
                : 'text-gray-700 hover:text-blue-600 px-3 md:px-4 py-2 text-sm md:text-base whitespace-nowrap'">
              Cartes NFC
            </a>

            <a href="#menus"
              @click="activeSection = 'menu-digital'"
              :class="activeSection === 'menu-digital'
                ? 'bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap'
                : 'text-gray-700 hover:text-blue-600 px-3 md:px-4 py-2 text-sm md:text-base whitespace-nowrap'">
              Menus Digitaux
            </a>

            <a href="#services"
              @click="activeSection = 'site-internet'"
              :class="activeSection === 'site-internet'
                ? 'bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap'
                : 'text-gray-700 hover:text-blue-600 px-3 md:px-4 py-2 text-sm md:text-base whitespace-nowrap'">
              Visibilité
            </a>

            <a href="#services"
              @click="activeSection = 'event'"
              :class="activeSection === 'event'
                ? 'bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap'
                : 'text-gray-700 hover:text-blue-600 px-3 md:px-4 py-2 text-sm md:text-base whitespace-nowrap'">
              Événements
            </a>

            <a href="#services"
              @click="activeSection = 'automation'"
              :class="activeSection === 'automation'
                ? 'bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap'
                : 'text-gray-700 hover:text-blue-600 px-3 md:px-4 py-2 text-sm md:text-base whitespace-nowrap'">
              Services
            </a>
          </div>
        </div>
      </nav>
    </div>

    <!-- Cartes NFC -->
    <section id="cartes" class="py-12 md:py-20 scroll-mt-20 md:scroll-mt-24">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div class="order-2 lg:order-1">
            <span class="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold mb-4 text-sm md:text-base">
              Produit Phare
            </span>
            <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Cartes de Visite NFC</h2>
            <p class="text-gray-600 mb-6 text-base md:text-lg">
              Dites adieu aux cartes papier. Nos cartes NFC réutilisables vous permettent de partager 
              vos informations professionnelles en un simple tap avec un smartphone.
            </p>
            <ul class="space-y-3 mb-6 md:mb-8">
              <li class="flex items-center">
                <div class="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span class="text-green-600 text-sm md:text-base">♻️</span>
                </div>
                <span class="text-sm md:text-base">Écologique et réutilisable à vie</span>
              </li>
              <li class="flex items-center">
                <div class="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span class="text-blue-600 text-sm md:text-base">🔄</span>
                </div>
                <span class="text-sm md:text-base">Mises à jour à distance via votre espace client</span>
              </li>
              <li class="flex items-center">
                <div class="w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span class="text-purple-600 text-sm md:text-base">📊</span>
                </div>
                <span class="text-sm md:text-base">Analytics des scans (qui, quand, où)</span>
              </li>
            </ul>
            <div class="flex flex-col sm:flex-row gap-4 w-full justify-between">
              <NuxtLink to="/profil/create" class="bg-blue-600 text-white px-4 md:px-6 py-3 rounded-lg font-bold text-center text-sm md:text-base">
                Commander Maintenant
              </NuxtLink>
              <p class="text-lg md:text-xl text-green-800 px-4 md:px-6 py-3 rounded-full font-bold bg-green-50 text-center">
                <span>🏷️</span> 15.000 FCFA
              </p>
            </div>
          </div>
          <div class="order-1 lg:order-2 mb-8 lg:mb-0">
            <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 md:p-8 transform md:rotate-3">
              <div class="bg-white rounded-xl p-2 shadow-2xl transform md:-rotate-3">
                <img src="assets/photo5.png" alt="Carte NFC" class="w-full h-auto rounded-lg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menus NFC -->
    <section id="menus" class="py-12 md:py-20 scroll-mt-20 md:scroll-mt-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Image - Toujours en premier sur mobile et desktop -->
          <div class="order-1 mb-8 lg:mb-0">
            <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 md:p-8 transform md:rotate-3">
              <div class="bg-white rounded-xl p-2 shadow-2xl transform md:-rotate-3">
                <img src="assets/photo8.jpg" alt="Menu Digital NFC" class="w-full h-auto rounded-lg">
              </div>
            </div>
          </div>
          
          <!-- Contenu texte - Toujours en second sur mobile et desktop -->
          <div class="order-2">
            <span class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full font-semibold mb-4 text-sm md:text-base">
              Pour Restaurants & Cafés
            </span>
            <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Menu Digital Interactif (Tags Menu NFC)</h2>
            <p class="text-gray-600 mb-6 text-base md:text-lg">
              Transformez l'expérience client de votre restaurant avec des menus digitaux interactifs. 
              Plus besoin d'imprimer à chaque changement.
            </p>
            <div class="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <div class="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                <div class="text-xl md:text-2xl mb-2">🔄</div>
                <p class="font-semibold text-sm md:text-base">Mises à jour instantanées</p>
              </div>
              <div class="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                <div class="text-xl md:text-2xl mb-2">📱</div>
                <p class="font-semibold text-sm md:text-base">Multilingue automatique</p>
              </div>
              <div class="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                <div class="text-xl md:text-2xl mb-2">📸</div>
                <p class="font-semibold text-sm md:text-base">Photos haute qualité</p>
              </div>
              <div class="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                <div class="text-xl md:text-2xl mb-2">⭐</div>
                <p class="font-semibold text-sm md:text-base">Avis clients intégrés</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 w-full justify-between">
              <NuxtLink to="/resto/create" class="bg-green-600 text-white px-4 md:px-6 py-3 rounded-lg font-bold text-center text-sm md:text-base">
                Commander Maintenant
              </NuxtLink>
              <p class="text-lg md:text-xl text-blue-800 px-4 md:px-6 py-3 rounded-full font-bold bg-blue-50 text-center">
                <span>🏷️</span> 20.000 FCFA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services complémentaires -->
    <section id="services" class="py-12 md:py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Nos Services d'Accompagnement</h2>
        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <div class="border border-gray-200 rounded-xl p-4 md:p-6 hover:border-blue-500 transition">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <span class="text-xl md:text-2xl">🎯</span>
            </div>
            <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3">Visibilité Numérique</h3>
            <p class="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
              Accompagnement personnalisé pour améliorer votre présence en ligne.
            </p>
            <ul class="text-xs md:text-sm text-gray-500 space-y-1">
              <li>• Audit de présence digitale</li>
              <li>• Stratégie réseaux sociaux</li>
              <li>• SEO local</li>
            </ul>
          </div>
          <div class="border border-gray-200 rounded-xl p-4 md:p-6 hover:border-blue-500 transition">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <span class="text-xl md:text-2xl">📊</span>
            </div>
            <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3">Formation & Support</h3>
            <p class="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
              Formation de vos équipes à l'utilisation des solutions NFC.
            </p>
            <ul class="text-xs md:text-sm text-gray-500 space-y-1">
              <li>• Formation en présentiel</li>
              <li>• Support technique 7j/7</li>
              <li>• Guides d'utilisation</li>
            </ul>
          </div>
          <div class="border border-gray-200 rounded-xl p-4 md:p-6 hover:border-blue-500 transition">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <span class="text-xl md:text-2xl">🛠️</span>
            </div>
            <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3">Personnalisation</h3>
            <p class="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
              Solutions sur mesure adaptées à vos besoins spécifiques.
            </p>
            <ul class="text-xs md:text-sm text-gray-500 space-y-1">
              <li>• Développement spécifique</li>
              <li>• Intégration CRM/ERP</li>
              <li>• Design personnalisé</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeSection = ref('carte-nfc')

useSeoMeta({
  title: 'Solutions BizConnect - Cartes NFC, Menus Digitaux, Événements',
  description: 'Découvrez nos solutions NFC innovantes pour digitaliser votre entreprise'
})
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera */
}

/* Styles pour améliorer l'apparence sur mobile */
@media (max-width: 768px) {
  section {
    scroll-margin-top: 80px; /* Compensation pour la navigation sticky mobile */
  }
}
</style>