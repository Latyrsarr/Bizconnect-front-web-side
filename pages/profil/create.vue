<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- En-tête -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Créer votre profil</h1>
        <p class="text-gray-600">Remplissez les informations pour créer une carte de visite numérique</p>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="submitForm" class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <!-- Messages d'état -->
        <div v-if="message" :class="messageClass" class="mb-6 p-4 rounded-lg">
          {{ message }}
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center text-gray-500 mb-6">
          Création en cours...
        </div>

        <!-- Section Informations Personnelles -->
        <div class="mb-10">
          <h2 class="text-xl font-bold text-blue-900 mb-6 pb-2 border-b border-gray-200">
            <span class="bg-blue-100 px-3 py-1 rounded-full">1</span>
            Informations Personnelles
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nom Complet -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Nom Complet <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.nom_complet"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: Indou Sarr"
              />
            </div>

            <!-- Poste -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Poste <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.post"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: CEO"
              />
            </div>

            <!-- Téléphone Contact -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Téléphone Contact <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.num_contact"
                type="tel"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: +221784528257"
              />
            </div>

            <!-- Email Contact -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Email Contact <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.mail_contact"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: indou.sarr@entreprise.sn"
              />
            </div>

            <!-- Adresse Contact -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 mb-2 font-medium">
                Adresse Contact
              </label>
              <textarea
                v-model="form.address_contact"
                rows="2"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: Bambey Serere, Sénégal"
              ></textarea>
            </div>

            <!-- Photo Professionnelle -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Photo Professionnelle
              </label>
              <div class="relative">
                <input
                  type="file"
                  ref="photoInput"
                  @change="handlePhotoUpload"
                  accept="image/*"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                  <svg class="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <p class="text-gray-600">{{ photoFileName || 'Cliquez pour ajouter une photo' }}</p>
                  <p class="text-sm text-gray-500 mt-1">PNG, JPG, JPEG (Max 5MB)</p>
                </div>
              </div>
            </div>

            <!-- Réseaux Sociaux Personnels -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Réseaux Sociaux Personnels
              </label>
              <div class="space-y-3">
                <!-- Facebook -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialContact.facebook"
                    type="url"
                    placeholder="Lien Facebook"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- LinkedIn -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialContact.linkedin"
                    type="url"
                    placeholder="Lien LinkedIn"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- Instagram -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialContact.Instagram"
                    type="url"
                    placeholder="Lien Instagram"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- Twitter/X -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialContact.twitter"
                    type="url"
                    placeholder="Lien Twitter/X"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- Site Web -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialContact['web-side']"
                    type="url"
                    placeholder="Lien Site Web"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- Autres réseaux sociaux -->
                <div v-for="(value, key) in otherSocialContact" :key="key" class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </div>
                  <div class="flex-1 flex gap-2">
                    <input
                      v-model="otherSocialContact[key].name"
                      type="text"
                      placeholder="Nom (ex: TikTok, YouTube)"
                      class="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
                      @change="updateOtherSocialKey(key, $event)"
                    />
                    <input
                      v-model="otherSocialContact[key].url"
                      type="url"
                      placeholder="Lien"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removeOtherSocialContact(key)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <!-- Bouton pour ajouter un autre réseau -->
                <button
                  type="button"
                  @click="addOtherSocialContact"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  Ajouter un autre réseau social
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Entreprise -->
        <div class="mb-10">
          <h2 class="text-xl font-bold text-blue-900 mb-6 pb-2 border-b border-gray-200">
            <span class="bg-blue-100 px-3 py-1 rounded-full">2</span>
            Informations Entreprise
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nom Entreprise -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Nom de l'entreprise <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.nom_entreprise"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: NasAgro"
              />
            </div>

            <!-- Téléphone Entreprise -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Téléphone Entreprise
              </label>
              <input
                v-model="form.num_entreprise"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: +221784528257"
              />
            </div>

            <!-- Email Entreprise -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Email Entreprise
              </label>
              <input
                v-model="form.mail_entreprise"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: contact@entreprise.sn"
              />
            </div>

            <!-- Adresse Entreprise -->
            <div class="md:col-span-2">
              <label class="block text-gray-700 mb-2 font-medium">
                Adresse Entreprise
              </label>
              <textarea
                v-model="form.address_entreprise"
                rows="2"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ex: Bambey, Sénégal"
              ></textarea>
            </div>

            <!-- Logo Entreprise -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Logo de l'entreprise
              </label>
              <div class="relative">
                <input
                  type="file"
                  ref="logoInput"
                  @change="handleLogoUpload"
                  accept="image/*"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                  <svg class="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <p class="text-gray-600">{{ logoFileName || 'Cliquez pour ajouter un logo' }}</p>
                  <p class="text-sm text-gray-500 mt-1">PNG, JPG, JPEG (Max 5MB)</p>
                </div>
              </div>
            </div>

            <!-- Réseaux Sociaux Entreprise -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Réseaux Sociaux Entreprise
              </label>
              <div class="space-y-3">
                <!-- Facebook Entreprise -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialEntreprise.facebook"
                    type="url"
                    placeholder="Lien Facebook"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- LinkedIn Entreprise -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialEntreprise.linkedin"
                    type="url"
                    placeholder="Lien LinkedIn"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- Instagram Entreprise -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialEntreprise.Instagram"
                    type="url"
                    placeholder="Lien Instagram"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- Twitter/X Entreprise -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialEntreprise.twitter"
                    type="url"
                    placeholder="Lien Twitter/X"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- Site Web Entreprise -->
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                  </div>
                  <input
                    v-model="socialEntreprise['web-side']"
                    type="url"
                    placeholder="Lien Site Web"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <!-- Autres réseaux sociaux entreprise -->
                <div v-for="(value, key) in otherSocialEntreprise" :key="`entreprise-${key}`" class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </div>
                  <div class="flex-1 flex gap-2">
                    <input
                      v-model="otherSocialEntreprise[key].name"
                      type="text"
                      placeholder="Nom (ex: TikTok, YouTube)"
                      class="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
                      @change="updateOtherSocialEntrepriseKey(key, $event)"
                    />
                    <input
                      v-model="otherSocialEntreprise[key].url"
                      type="url"
                      placeholder="Lien"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removeOtherSocialEntreprise(key)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <!-- Bouton pour ajouter un autre réseau entreprise -->
                <button
                  type="button"
                  @click="addOtherSocialEntreprise"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  Ajouter un autre réseau social
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Palette de couleur seulement -->
        <div class="mb-10">
          <h2 class="text-xl font-bold text-blue-900 mb-6 pb-2 border-b border-gray-200">
            <span class="bg-blue-100 px-3 py-1 rounded-full">3</span>
            Options d'affichage
          </h2>
          
          <div class="max-w-md">
            <!-- Palette de couleur avec aperçu -->
            <div>
              <label class="block text-gray-700 mb-2 font-medium">
                Palette de couleur
              </label>
              <div class="flex items-center gap-3">
                <select
                  v-model="form.pallette_couleur"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="A">A - Vert (Green)</option>
                  <option value="B">B - Gris (Gray)</option>
                  <option value="C" selected>C - Orange (Orange)</option>
                  <option value="D">D - Jaune (Yellow)</option>
                  <option value="E">E - Rouge clair (Red)</option>
                  <option value="F">F - Rouge foncé (Dark Red)</option>
                  <option value="G">G - Jaune foncé (Dark Yellow)</option>
                  <option value="H">H - Bleu (Blue)</option>
                </select>
                
                <!-- Aperçu de la couleur sélectionnée -->
                <div class="flex items-center">
                    <div 
                        :class="selectedColorClass"
                        class="w-12 h-12 rounded-lg border border-gray-300 shadow-sm"
                        :title="`Palette ${form.pallette_couleur} - ${getPaletteName(form.pallette_couleur)}`"
                    ></div>
                    <div 
                        class="w-12 h-12 bg-slate-50 rounded-lg border border-gray-300 shadow-sm"
                    ></div>
                    <div 
                        class="w-12 h-12 bg-blue-900 rounded-lg border border-gray-300 shadow-sm"
                    ></div>
                    </div>
                </div>
              <p class="text-xs text-gray-500 mt-2">
                Définit les couleurs de l'en-tête et du poste sur la carte de visite
              </p>
            </div>

            <!-- Information sur la génération automatique -->
            <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 class="font-medium text-blue-800 mb-2">Information</h3>
              <p class="text-sm text-blue-700">
                Après la création de votre profil, notre équipe vous contactera dans les jours à venir afin de finaliser et vous livrer votre business carte.
              </p>
            </div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex flex-col md:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Réinitialiser
          </button>
          
          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="loading"
              class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium shadow-lg flex items-center gap-2"
            >
              <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="loading">Création...</span>
              <span v-else>Créer le profil</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

interface FormData {
  nom_complet: string
  post: string
  num_contact: string
  mail_contact: string
  address_contact: string
  reseaux_sociaux_contact: string
  nom_entreprise: string
  num_entreprise: string
  mail_entreprise: string
  address_entreprise: string
  reseaux_sociaux_entreprise: string
  pallette_couleur: string
}

// Interface pour les réseaux sociaux
interface SocialNetwork {
  name: string
  url: string
}

const router = useRouter()

const form = reactive<FormData>({
  nom_complet: '',
  post: '',
  num_contact: '',
  mail_contact: '',
  address_contact: '',
  reseaux_sociaux_contact: '',
  nom_entreprise: '',
  num_entreprise: '',
  mail_entreprise: '',
  address_entreprise: '',
  reseaux_sociaux_entreprise: '',
  pallette_couleur: 'C'
})

// Réseaux sociaux pour contact
const socialContact = reactive({
  facebook: '',
  linkedin: '',
  Instagram: '',
  twitter: '',
  'web-side': ''
})

// Réseaux sociaux pour entreprise
const socialEntreprise = reactive({
  facebook: '',
  linkedin: '',
  Instagram: '',
  twitter: '',
  'web-side': ''
})

// Autres réseaux sociaux (dynamiques)
const otherSocialContact = reactive<Record<string, SocialNetwork>>({})
const otherSocialEntreprise = reactive<Record<string, SocialNetwork>>({})

const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Gestion des fichiers
const photoInput = ref<HTMLInputElement | null>(null)
const logoInput = ref<HTMLInputElement | null>(null)
const photoFile = ref<File | null>(null)
const logoFile = ref<File | null>(null)
const photoFileName = ref('')
const logoFileName = ref('')

const messageClass = computed(() => {
  return messageType.value === 'success' 
    ? 'bg-green-100 text-green-700 border border-green-200' 
    : 'bg-red-100 text-red-700 border border-red-200'
})

// Mapping des couleurs pour l'aperçu
const paletteColors = {
  A: 'bg-gradient-to-br from-green-600 to-green-700',
  B: 'bg-gradient-to-br from-gray-600 to-gray-800',
  C: 'bg-gradient-to-br from-orange-500 to-orange-600',
  D: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
  E: 'bg-gradient-to-br from-red-500 to-red-600',
  F: 'bg-gradient-to-br from-red-800 to-red-900',
  G: 'bg-gradient-to-br from-yellow-800 to-yellow-900',
  H: 'bg-gradient-to-br from-blue-500 to-blue-600'
} as const

const paletteNames = {
  A: 'Vert',
  B: 'Gris',
  C: 'Orange',
  D: 'Jaune',
  E: 'Rouge clair',
  F: 'Rouge foncé',
  G: 'Jaune foncé',
  H: 'Bleu'
} as const

// Computed pour la classe de couleur sélectionnée
const selectedColorClass = computed(() => {
  return paletteColors[form.pallette_couleur as keyof typeof paletteColors] || paletteColors.C
})

// Fonction pour obtenir le nom de la palette
const getPaletteName = (palette: string) => {
  return paletteNames[palette as keyof typeof paletteNames] || 'Orange'
}

// Fonctions pour gérer les réseaux sociaux dynamiques
const addOtherSocialContact = () => {
  const key = `other_${Date.now()}`
  otherSocialContact[key] = { name: '', url: '' }
}

const removeOtherSocialContact = (key: string) => {
  delete otherSocialContact[key]
}

const updateOtherSocialKey = (oldKey: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const newName = target.value.trim()
  
  if (newName && newName !== oldKey) {
    const newKey = newName.toLowerCase().replace(/\s+/g, '_')
    otherSocialContact[newKey] = {
      name: newName,
      url: otherSocialContact[oldKey].url
    }
    delete otherSocialContact[oldKey]
  }
}

const addOtherSocialEntreprise = () => {
  const key = `other_${Date.now()}`
  otherSocialEntreprise[key] = { name: '', url: '' }
}

const removeOtherSocialEntreprise = (key: string) => {
  delete otherSocialEntreprise[key]
}

const updateOtherSocialEntrepriseKey = (oldKey: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const newName = target.value.trim()
  
  if (newName && newName !== oldKey) {
    const newKey = newName.toLowerCase().replace(/\s+/g, '_')
    otherSocialEntreprise[newKey] = {
      name: newName,
      url: otherSocialEntreprise[oldKey].url
    }
    delete otherSocialEntreprise[oldKey]
  }
}

// Convertir les réseaux sociaux en JSON
const socialContactToJSON = () => {
  const result: Record<string, string> = {}
  
  Object.entries(socialContact).forEach(([key, value]) => {
    if (value && value.trim()) {
      result[key] = value.trim()
    }
  })
  
  Object.entries(otherSocialContact).forEach(([key, { name, url }]) => {
    if (name && name.trim() && url && url.trim()) {
      const cleanKey = name.toLowerCase().replace(/\s+/g, '_')
      result[cleanKey] = url.trim()
    }
  })
  
  return Object.keys(result).length > 0 ? JSON.stringify(result) : ''
}

const socialEntrepriseToJSON = () => {
  const result: Record<string, string> = {}
  
  Object.entries(socialEntreprise).forEach(([key, value]) => {
    if (value && value.trim()) {
      result[key] = value.trim()
    }
  })
  
  Object.entries(otherSocialEntreprise).forEach(([key, { name, url }]) => {
    if (name && name.trim() && url && url.trim()) {
      const cleanKey = name.toLowerCase().replace(/\s+/g, '_')
      result[cleanKey] = url.trim()
    }
  })
  
  return Object.keys(result).length > 0 ? JSON.stringify(result) : ''
}

// Gestion de l'upload de photo
const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    photoFile.value = target.files[0]
    photoFileName.value = photoFile.value.name
    
    if (photoFile.value.size > 5 * 1024 * 1024) {
      showMessage('La photo ne doit pas dépasser 5MB', 'error')
      photoFile.value = null
      photoFileName.value = ''
      if (photoInput.value) photoInput.value.value = ''
    }
  }
}

// Gestion de l'upload de logo
const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    logoFile.value = target.files[0]
    logoFileName.value = logoFile.value.name
    
    if (logoFile.value.size > 5 * 1024 * 1024) {
      showMessage('Le logo ne doit pas dépasser 5MB', 'error')
      logoFile.value = null
      logoFileName.value = ''
      if (logoInput.value) logoInput.value.value = ''
    }
  }
}

// Affichage des messages
const showMessage = (text: string, type: 'success' | 'error') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

// Validation du formulaire
const validateForm = (): boolean => {
  if (!form.nom_complet.trim()) {
    showMessage('Le nom complet est requis', 'error')
    return false
  }
  if (!form.post.trim()) {
    showMessage('Le poste est requis', 'error')
    return false
  }
  if (!form.num_contact.trim()) {
    showMessage('Le téléphone contact est requis', 'error')
    return false
  }
  if (!form.mail_contact.trim()) {
    showMessage('L\'email contact est requis', 'error')
    return false
  }
  if (!form.nom_entreprise.trim()) {
    showMessage('Le nom de l\'entreprise est requis', 'error')
    return false
  }
  
  return true
}

// Soumission du formulaire
const submitForm = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    // Convertir les réseaux sociaux en JSON
    form.reseaux_sociaux_contact = socialContactToJSON()
    form.reseaux_sociaux_entreprise = socialEntrepriseToJSON()
    
    // Préparation des données FormData
    const formData = new FormData()
    
    // Ajout des champs texte
    Object.entries(form).forEach(([key, value]) => {
      if (value && value.trim()) {
        formData.append(key, value.trim())
      }
    })
    
    // Ajout des fichiers
    if (photoFile.value) {
      formData.append('professionnel-photos', photoFile.value)
    }
    if (logoFile.value) {
      formData.append('entreprise-logos', logoFile.value)
    }
    
    // Envoi à l'API
    const response = await fetch(
      'https://bizconnect-back-web-side.vercel.app/profiles',
      {
        method: 'POST',
        body: formData
      }
    )
    
    const data = await response.json()
    
    if (response.ok) {
      // Afficher les informations générées
      const generatedInfo = []
      if (data.code) generatedInfo.push(`Code: ${data.code}`)
      if (data.contact_url) generatedInfo.push(`URL: ${data.contact_url}`)
      
      showMessage(
        `Profil créé avec succès! Redirection vers le profil...`,
        'success'
      )
      
      // Redirection vers le profil créé après 2 secondes
      setTimeout(() => {
        if (data.code) {
          router.push(`/profil/${data.code}`)
        } else {
          showMessage('Erreur: Code non reçu du serveur', 'error')
        }
      }, 2000)
      
    } else {
      showMessage(
        data.message || 'Erreur lors de la création du profil', 
        'error'
      )
    }
    
  } catch (error: any) {
    console.error('Erreur lors de la création:', error)
    showMessage('Erreur réseau lors de la création du profil', 'error')
  } finally {
    loading.value = false
  }
}

// Réinitialisation du formulaire
const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (key === 'pallette_couleur') {
      form[key as keyof FormData] = 'C' as any
    } else {
      form[key as keyof FormData] = '' as any
    }
  })
  
  // Réinitialiser les réseaux sociaux
  Object.keys(socialContact).forEach(key => {
    socialContact[key as keyof typeof socialContact] = ''
  })
  Object.keys(socialEntreprise).forEach(key => {
    socialEntreprise[key as keyof typeof socialEntreprise] = ''
  })
  
  // Réinitialiser les autres réseaux sociaux
  Object.keys(otherSocialContact).forEach(key => {
    delete otherSocialContact[key]
  })
  Object.keys(otherSocialEntreprise).forEach(key => {
    delete otherSocialEntreprise[key]
  })
  
  photoFile.value = null
  logoFile.value = null
  photoFileName.value = ''
  logoFileName.value = ''
  if (photoInput.value) photoInput.value.value = ''
  if (logoInput.value) logoInput.value.value = ''
}
</script>

<style scoped>
input:focus, textarea:focus, select:focus {
  outline: none;
  ring: 2px;
}

.border-dashed:hover {
  border-color: #3b82f6;
}
</style>