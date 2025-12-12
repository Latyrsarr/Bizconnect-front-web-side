<template>
  <div>
    <!-- Hero Solutions -->
    <section class="bg-gradient-to-br from-blue-50 to-white py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-6">
          Nos <span class="text-blue-600">Solutions</span> Innovantes
        </h1>
        <p class="text-xl text-gray-600 text-center max-w-3xl mx-auto">
          Découvrez notre gamme complète de produits et services pour digitaliser votre entreprise
        </p>
      </div>
    </section>

    <!-- Navigation ancres -->
    <!-- <div class="sticky top-20 z-40 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex overflow-x-auto py-4 space-x-6">
          <a href="#cartes" class="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50">Cartes NFC</a>
          <a href="#menus" class="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50">Menus Digitaux</a>
          <a href="#visibilite" class="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50">Visibilité</a>
          <a href="#evenements" class="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50">Événements</a>
          <a href="#services" class="whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50">Services</a>
        </div>
      </div>
    </div> -->
    <div class="sticky top-20 z-40 bg-white shadow-sm">
      <nav class="flex justify-center space-x-6 py-3">
        
        <a href="#cartes"
          @click="activeSection = 'carte-nfc'"
          :class="activeSection === 'carte-nfc'
            ? 'bg-blue-600 text-white px-4 py-2 rounded-lg'
            : 'text-gray-700 hover:text-blue-600 px-4 py-2'">
          Cartes NFC
        </a>

        <a href="#menus"
          @click="activeSection = 'menu-digital'"
          :class="activeSection === 'menu-digital'
            ? 'bg-blue-600 text-white px-4 py-2 rounded-lg'
            : 'text-gray-700 hover:text-blue-600 px-4 py-2'">
          Menus Digitaux
        </a>

        <a href="#services"
          @click="activeSection = 'site-internet'"
          :class="activeSection === 'site-internet'
            ? 'bg-blue-600 text-white px-4 py-2 rounded-lg'
            : 'text-gray-700 hover:text-blue-600 px-4 py-2'">
          Visibilité Numérique
        </a>

        <a href="#services"
          @click="activeSection = 'event'"
          :class="activeSection === 'event'
            ? 'bg-blue-600 text-white px-4 py-2 rounded-lg'
            : 'text-gray-700 hover:text-blue-600 px-4 py-2'">
          Événementiel
        </a>

        <a href="#services"
          @click="activeSection = 'automation'"
          :class="activeSection === 'automation'
            ? 'bg-blue-600 text-white px-4 py-2 rounded-lg'
            : 'text-gray-700 hover:text-blue-600 px-4 py-2'">
          Services
        </a>

      </nav>
    </div>

    <!-- Cartes NFC -->
    <section id="cartes" class="py-20 scroll-mt-24">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold mb-4">
              Produit Phare
            </span>
            <h2 class="text-3xl font-bold mb-6">Cartes de Visite NFC</h2>
            <p class="text-gray-600 mb-6">
              Dites adieu aux cartes papier. Nos cartes NFC réutilisables vous permettent de partager 
              vos informations professionnelles en un simple tap avec un smartphone.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600">♻️</span>
                </div>
                <span>Écologique et réutilisable à vie</span>
              </li>
              <li class="flex items-center">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-blue-600">🔄</span>
                </div>
                <span>Mises à jour à distance via votre espace client</span>
              </li>
              <li class="flex items-center">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-purple-600">📊</span>
                </div>
                <span>Analytics des scans (qui, quand, où)</span>
              </li>
            </ul>
            <div class="flex gap-4 w-full justify-between">
              <NuxtLink to="/profil/create" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
                Commander Maintenant
              </NuxtLink>
              <p class="text-xl text-green-800 px-6 py-3 rounded-full font-bold bg-green-50">
                <span>🏷️</span>15.000 FCFA
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 transform rotate-3">
              <div class="bg-white rounded-xl p-2 shadow-2xl transform -rotate-3">
                  <img src="assets/photo5.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menus NFC -->
    <section id="menus" class="py-20 scroll-mt-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
              <h3 class="text-3xl font-bold mb-10">Menu Digital Interactif</h3>
              <div class="relative">
                <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 transform rotate-3">
                  <div class="bg-white rounded-xl p-2 shadow-2xl transform -rotate-3">
                      <img src="assets/photo8.jpg" alt="">
                  </div>
                </div>
              </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full font-semibold mb-4">
              Pour Restaurants & Cafés
            </span>
            <h2 class="text-3xl font-bold mb-6">Tags Menu NFC</h2>
            <p class="text-gray-600 mb-6">
              Transformez l'expérience client de votre restaurant avec des menus digitaux interactifs. 
              Plus besoin d'imprimer à chaque changement.
            </p>
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <div class="text-2xl mb-2">🔄</div>
                <p class="font-semibold">Mises à jour instantanées</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <div class="text-2xl mb-2">📱</div>
                <p class="font-semibold">Multilingue automatique</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <div class="text-2xl mb-2">📸</div>
                <p class="font-semibold">Photos haute qualité</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <div class="text-2xl mb-2">⭐</div>
                <p class="font-semibold">Avis clients intégrés</p>
              </div>
            </div>
            <NuxtLink to="/contact" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
              Voir une démo
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Services complémentaires -->
    <section id="services" class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Nos Services d'Accompagnement</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-xl font-bold mb-3">Visibilité Numérique</h3>
            <p class="text-gray-600 mb-4">
              Accompagnement personnalisé pour améliorer votre présence en ligne.
            </p>
            <ul class="text-sm text-gray-500">
              <li>• Audit de présence digitale</li>
              <li>• Stratégie réseaux sociaux</li>
              <li>• SEO local</li>
            </ul>
          </div>
          <div class="border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">📊</span>
            </div>
            <h3 class="text-xl font-bold mb-3">Formation & Support</h3>
            <p class="text-gray-600 mb-4">
              Formation de vos équipes à l'utilisation des solutions NFC.
            </p>
            <ul class="text-sm text-gray-500">
              <li>• Formation en présentiel</li>
              <li>• Support technique 7j/7</li>
              <li>• Guides d'utilisation</li>
            </ul>
          </div>
          <div class="border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🛠️</span>
            </div>
            <h3 class="text-xl font-bold mb-3">Personnalisation</h3>
            <p class="text-gray-600 mb-4">
              Solutions sur mesure adaptées à vos besoins spécifiques.
            </p>
            <ul class="text-sm text-gray-500">
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