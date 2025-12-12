<template>
  <div>
    <!-- Hero Tarifs -->
    <section class="bg-gradient-to-b from-blue-50 to-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          Des <span class="text-blue-600">Tarifs</span> Transparents
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Choisissez l'offre qui correspond à vos besoins. Toutes nos solutions sont modulables.
        </p>
      </div>
    </section>

    <!-- Cartes de prix -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Starter -->
          <div class="border border-gray-200 rounded-2xl p-8">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold mb-2">Starter</h3>
              <p class="text-gray-600 mb-4">Pour les indépendants</p>
              <div class="flex justify-center items-baseline">
                <span class="text-5xl font-bold">49€</span>
                <span class="text-gray-500 ml-2">/mois</span>
              </div>
            </div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>10 cartes NFC</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Dashboard basique</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Support email</span>
              </li>
              <li class="flex items-center text-gray-400">
                <span class="mr-3">✗</span>
                <span>Tags menu NFC</span>
              </li>
              <li class="flex items-center text-gray-400">
                <span class="mr-3">✗</span>
                <span>Formation en ligne</span>
              </li>
            </ul>
            <button class="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50">
              Commencer
            </button>
          </div>

          <!-- Business (Recommandé) -->
          <div class="border-2 border-blue-600 rounded-2xl p-8 relative transform scale-105 shadow-xl">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span class="bg-blue-600 text-white px-4 py-1 rounded-full font-bold">
                POPULAIRE
              </span>
            </div>
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold mb-2">Business</h3>
              <p class="text-gray-600 mb-4">Pour les PME</p>
              <div class="flex justify-center items-baseline">
                <span class="text-5xl font-bold">99€</span>
                <span class="text-gray-500 ml-2">/mois</span>
              </div>
            </div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>50 cartes NFC</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Dashboard avancé</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>10 tags menu NFC</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Formation en ligne</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Support téléphonique</span>
              </li>
            </ul>
            <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
              Choisir cette offre
            </button>
          </div>

          <!-- Enterprise -->
          <div class="border border-gray-200 rounded-2xl p-8">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold mb-2">Enterprise</h3>
              <p class="text-gray-600 mb-4">Pour les grandes entreprises</p>
              <div class="flex justify-center items-baseline">
                <span class="text-5xl font-bold">Sur mesure</span>
              </div>
            </div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Cartes NFC illimitées</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Tags NFC personnalisés</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Formation en présentiel</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Support dédié 24/7</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-3">✓</span>
                <span>Intégration API</span>
              </li>
            </ul>
            <NuxtLink to="/contact" 
              class="w-full border-2 border-gray-800 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-50 block text-center">
              Nous contacter
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Produits à l'unité -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Produits à l'unité</h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">📇</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Carte NFC Simple</h3>
            <p class="text-gray-600 mb-4">Design standard, personnalisable</p>
            <div class="text-3xl font-bold text-blue-600 mb-4">19€<span class="text-sm text-gray-500">/unité</span></div>
            <button class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
              Commander
            </button>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">🏷️</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Tag Menu NFC</h3>
            <p class="text-gray-600 mb-4">Pour restaurants et cafés</p>
            <div class="text-3xl font-bold text-green-600 mb-4">29€<span class="text-sm text-gray-500">/unité</span></div>
            <button class="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700">
              Commander
            </button>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">🎫</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Badge Événement</h3>
            <p class="text-gray-600 mb-4">Pour conférences et salons</p>
            <div class="text-3xl font-bold text-purple-600 mb-4">12€<span class="text-sm text-gray-500">/unité</span></div>
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700">
              Commander
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
        <div class="space-y-6">
          <div class="border border-gray-200 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">Comment commander ?</h3>
            <p class="text-gray-600">
              Contactez-nous via le formulaire de contact ou par téléphone. Nous vous préparons un devis personnalisé sous 24h.
            </p>
          </div>
          <div class="border border-gray-200 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">Puis-je changer d'offre plus tard ?</h3>
            <p class="text-gray-600">
              Oui, vous pouvez à tout moment passer à une offre supérieure ou inférieure. Aucun frais de résiliation.
            </p>
          </div>
          <div class="border border-gray-200 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">Y a-t-il des frais cachés ?</h3>
            <p class="text-gray-600">
              Non, tous nos tarifs sont transparents. Les prix indiqués sont TTC et incluent la livraison en France métropolitaine.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Tarifs BizConnect - Solutions NFC accessibles',
  description: 'Découvrez nos offres tarifaires transparentes pour cartes NFC, menus digitaux et services'
})
</script>