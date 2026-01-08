<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/10"></div>
      <div class="container mx-auto px-4 py-24 relative">
        <div class="max-w-3xl">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            La connectivité 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              au bout des doigts
            </span>
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Transformez vos interactions physiques en opportunités numériques avec nos solutions NFC innovantes. 
            Écologique, efficace et moderne.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/solutions" 
              class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg font-bold text-lg hover:shadow-lg transition">
              Découvrir nos solutions
            </NuxtLink>
            <NuxtLink to="/contact" 
              class="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition">
              Demander une démo
            </NuxtLink>
          </div>
        </div>
        <div class="absolute right-0 top-1/4 hidden lg:block">
          <div class="w-64 h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </section>

    <!-- Problèmes résolus -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-blue-700">Les problèmes que nous résolvons</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <div class="w-full flex justify-center">
                <div class="w-72 h-72">
                <!-- <span class="text-2xl">📄</span> -->
                <img src="assets/photo1.jpg" alt="">
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2">Cartes papier obsolètes</h3>
            <p class="text-gray-600">Coûteuses, perdues, peu écologiques</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <div class="w-full flex justify-center">
                <div class="w-72 h-72">
                <!-- <span class="text-2xl">📄</span> -->
                <img src="assets/photo2.jpg" alt="">
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2">Manque d'interactivité</h3>
            <p class="text-gray-600">Supports statiques sans liens numériques</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <div class="w-full flex justify-center">
                <div class="w-72 h-72">
                <!-- <span class="text-2xl">📄</span> -->
                <img src="assets/photo3.jpg" alt="">
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2">Conversion difficile</h3>
            <p class="text-gray-600">Visiteurs physiques vers clients en ligne</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <div class="w-full flex justify-center">
                <div class="w-72 h-72">
                    <!-- <span class="text-2xl">📄</span> -->
                    <img src="assets/photo4.jpg" alt="">
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2">Événements complexes</h3>
            <p class="text-gray-600">Organisation chronophage et coûteuse</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Solutions phares -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-blue-700">Nos solutions phares</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Carte de visite NFC -->
          <div class="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
            <!-- <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6"> -->
              <!-- <span class="text-3xl">📇</span> -->
              

            <!-- </div> -->
            <div class="w-full flex justify-center mb-4">
                <div class="">
                    <!-- <span class="text-2xl">📄</span> -->
                    <img src="assets/photo5.png" alt="">
                </div>
            </div>
            <h3 class="text-2xl font-bold mb-4">Cartes de visite et Tag NFC</h3>
            <p class="text-gray-600 mb-6">
              Échangez vos informations professionnelles en un simple tap. Réutilisable à vie, zéro papier.
            </p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Sans contact</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Écologique</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Mises à jour à distance</li>
            </ul>
            <NuxtLink to="/solutions#cartes" class="text-blue-600 font-bold">
              En savoir plus →
            </NuxtLink>
          </div>

          <!-- Tags Menu NFC -->
          <div class="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
            <div class="w-full flex justify-center mb-4">
                <div class="">
                    <!-- <span class="text-2xl">📄</span> -->
                    <img src="assets/photo6.jpg" alt="">
                </div>
            </div>
            <h3 class="text-2xl font-bold mb-4">Tags Menu NFC</h3>
            <p class="text-gray-600 mb-6">
              Transformez vos menus papiers en expérience digitale interactive. Mises à jour en temps réel.
            </p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Menu digital</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Partage réseaux sociaux</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Multilingue</li>
            </ul>
            <NuxtLink to="/solutions#menus" class="text-blue-600 font-bold">
              En savoir plus →
            </NuxtLink>
          </div>

          <!-- Événements -->
          <div class="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
            <div class="w-full flex justify-center mb-4">
                <div class="">
                    <!-- <span class="text-2xl">📄</span> -->
                    <img src="assets/photo7.jpg" alt="">
                </div>
            </div>
            <h3 class="text-2xl font-bold mb-4">Accompagnement Digital</h3>
            <p class="text-gray-600 mb-6">
              Gestion complète de la visibilité de votre entreprise. De la planification à l'exécution.
            </p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Gestion complète</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Badges NFC</li>
              <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Analytics</li>
            </ul>
            <NuxtLink to="/events" class="text-blue-600 font-bold">
              En savoir plus →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Prêt à digitaliser votre entreprise ?</h2>
        <p class="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Rejoignez plus de 5 entreprises qui ont choisi BizConnect pour leur transformation numérique
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" 
            class="bg-white text-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition">
            Demander un devis gratuit
          </NuxtLink>
          <a href="tel:+221770326286" 
            class="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition">
            <span class="flex items-center justify-center">
              <span class="mr-2">📞</span> Nous appeler
            </span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'BizConnect Sénégal - La connectivité au bout des doigts',
  description: 'Solutions NFC innovantes pour connecter votre entreprise au monde numérique',
  ogTitle: 'BizConnect Sénégal - Solutions NFC pour entreprises',
  ogDescription: 'Transformez vos interactions physiques en opportunités numériques'
})
</script>