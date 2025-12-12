<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Logo et description -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-14 h-14 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg flex items-center justify-center pt-2">
              <img src="assets/bizconnect.svg" alt="">
            </div>
            <span class="text-2xl font-bold">BizConnect</span>
          </div>
          <p class="text-gray-400">
            La connectivité au bout des doigts. Solutions innovantes pour votre entreprise.
          </p>
        </div>

        <!-- Liens rapides -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Solutions</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/solutions#cartes" class="text-gray-400 hover:text-white">Cartes NFC</NuxtLink></li>
            <li><NuxtLink to="/solutions#menus" class="text-gray-400 hover:text-white">Menus Digitaux</NuxtLink></li>
            <li><NuxtLink to="/solutions#visibilite" class="text-gray-400 hover:text-white">Visibilité</NuxtLink></li>
            <li><NuxtLink to="/solutions#evenements" class="text-gray-400 hover:text-white">Événements</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-gray-400">
            <li>bizconnectnfc@gmail.com</li>
            <li>+221 77 032 62 86</li>
            <li>Dakar, Senegal</li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
          <p class="text-gray-400 mb-4">Recevez nos dernières innovations</p>
          <div class="flex">
            <input type="email" placeholder="Votre email" 
              class="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-grow">
            <button class="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
              →
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
        <p>© 2024 BizConnect. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>