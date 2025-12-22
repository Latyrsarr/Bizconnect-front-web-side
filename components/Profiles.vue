<template>
  <div class="container mx-auto px-4 py-8">
    <!-- En-tête avec titre et statistiques -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Gestion des Profils Professionnels
        </h1>
        <button 
          @click="exportToCSV"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
          Exporter en CSV
        </button>
      </div>

      <!-- Cartes de statistiques -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 rounded-lg bg-blue-100 mr-3">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Total Profils</p>
              <p class="text-2xl font-bold text-gray-800">{{ filteredProfiles.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 rounded-lg bg-green-100 mr-3">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Profils Actifs</p>
              <p class="text-2xl font-bold text-gray-800">{{ getCountByStatus('active') }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 rounded-lg bg-yellow-100 mr-3">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">En Attente</p>
              <p class="text-2xl font-bold text-gray-800">{{ getCountByStatus('en_attente_de_validation') }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 rounded-lg bg-red-100 mr-3">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Inactifs</p>
              <p class="text-2xl font-bold text-gray-800">{{ getCountByStatus('inactif') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Filtres et Recherche -->
    <div class="mb-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 lg:mb-0">
          Filtres et Recherche
        </h2>
        <div class="flex items-center space-x-2">
          <button 
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Réinitialiser
          </button>
          <button 
            @click="toggleFilters"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"/>
            </svg>
            {{ showFilters ? 'Masquer' : 'Afficher' }} Filtres
          </button>
        </div>
      </div>

      <!-- Barre de recherche principale -->
      <div class="mb-6">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par nom, post, entreprise, contact..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            @input="debouncedSearch"
          />
          <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button @click="clearSearch" class="text-gray-400 hover:text-gray-600">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Filtres avancés -->
      <div v-if="showFilters" class="border-t border-gray-200 pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Filtre par statut -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <div class="space-y-2">
              <label v-for="status in statusOptions" :key="status.value" class="flex items-center">
                <input
                  type="checkbox"
                  :value="status.value"
                  v-model="selectedStatuses"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">{{ status.label }}</span>
              </label>
            </div>
          </div>

          <!-- Filtre par entreprise -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Entreprise
            </label>
            <select
              v-model="selectedCompany"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les entreprises</option>
              <option v-for="company in companies" :key="company" :value="company">
                {{ company }}
              </option>
            </select>
          </div>

          <!-- Filtre par post -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Poste
            </label>
            <select
              v-model="selectedPost"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les postes</option>
              <option v-for="post in posts" :key="post" :value="post">
                {{ post }}
              </option>
            </select>
          </div>

          <!-- Filtre par date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Date de création
            </label>
            <select
              v-model="dateFilter"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>
        </div>

        <!-- Boutons d'action des filtres -->
        <div class="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            @click="applyFilters"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Appliquer les filtres
          </button>
        </div>
      </div>

      <!-- Résumé des filtres actifs -->
      <div v-if="activeFiltersCount > 0" class="mt-4">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            {{ filteredProfiles.length }} résultat(s) trouvé(s)
            <span v-if="activeFiltersCount > 0" class="ml-2 text-blue-600">
              ({{ activeFiltersCount }} filtre(s) actif(s))
            </span>
          </div>
          <button 
            @click="clearAllFilters"
            class="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Effacer tous les filtres
          </button>
        </div>
        
        <!-- Badges des filtres actifs -->
        <div class="flex flex-wrap gap-2 mt-2">
          <span v-if="searchQuery" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Recherche: "{{ searchQuery }}"
            <button @click="clearSearch" class="ml-1.5 text-blue-600 hover:text-blue-800">
              <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </span>
          
          <span v-if="selectedStatuses.length > 0" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Statut: {{ selectedStatuses.map(s => statusOptions.find(so => so.value === s)?.label).join(', ') }}
            <button @click="selectedStatuses = []" class="ml-1.5 text-green-600 hover:text-green-800">
              <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </span>
          
          <span v-if="selectedCompany" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Entreprise: {{ selectedCompany }}
            <button @click="selectedCompany = ''" class="ml-1.5 text-purple-600 hover:text-purple-800">
              <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </span>
          
          <span v-if="selectedPost" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Poste: {{ selectedPost }}
            <button @click="selectedPost = ''" class="ml-1.5 text-orange-600 hover:text-orange-800">
              <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </span>
          
          <span v-if="dateFilter" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Date: {{ dateOptions.find(d => d.value === dateFilter)?.label }}
            <button @click="dateFilter = ''" class="ml-1.5 text-indigo-600 hover:text-indigo-800">
              <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>

    <!-- État de chargement -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600">Chargement des profils...</span>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p class="text-red-700 font-semibold">
        Erreur lors du chargement des profils : {{ error }}
      </p>
      <button 
        @click="fetchProfiles"
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Réessayer
      </button>
    </div>

    <!-- Tableau des profils -->
    <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- En-tête du tableau avec tri -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('nom_complet')">
                <div class="flex items-center">
                  <span>Profil</span>
                  <svg v-if="sortField === 'nom_complet'" class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="sortDirection === 'asc'" fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    <path v-else fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('nom_entreprise')">
                <div class="flex items-center">
                  <span>Entreprise</span>
                  <svg v-if="sortField === 'nom_entreprise'" class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="sortDirection === 'asc'" fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    <path v-else fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('etat')">
                <div class="flex items-center">
                  <span>État</span>
                  <svg v-if="sortField === 'etat'" class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="sortDirection === 'asc'" fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    <path v-else fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('createdAt')">
                <div class="flex items-center">
                  <span>Date de création</span>
                  <svg v-if="sortField === 'createdAt'" class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="sortDirection === 'asc'" fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                    <path v-else fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="filteredProfiles.length > 0">
              <template v-for="profile in filteredProfiles" :key="profile.id">
                <!-- Ligne principale -->
                <tr 
                  @click="toggleProfile(profile.id)"
                  :class="[
                    'cursor-pointer hover:bg-gray-50 transition-colors',
                    expandedProfile === profile.id ? 'bg-blue-50' : ''
                  ]"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden mr-3">
                        <img 
                          :src="profile.url_professionnel_photo" 
                          :alt="profile.nom_complet"
                          class="h-full w-full object-cover"
                          @error="handleImageError"
                        />
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ profile.nom_complet }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ profile.post }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-8 w-8 flex-shrink-0 mr-2">
                        <img 
                          :src="profile.url_logo_entreprise" 
                          :alt="profile.nom_entreprise"
                          class="h-full w-full object-contain"
                          @error="handleImageError"
                        />
                      </div>
                      <div class="text-sm text-gray-900">{{ profile.nom_entreprise }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ profile.num_contact }}</div>
                    <div class="text-sm text-gray-500">{{ profile.mail_contact }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" 
                          :class="getStatusClass(profile.etat)">
                      {{ formatStatus(profile.etat) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDateShort(profile.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <!-- <button 
                      @click.stop="toggleProfile(profile.code)"
                      class="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Voir détails
                    </button> -->
                    <button
                      type="button"
                      @click.stop="goToProfile(profile.code)"
                      class="text-blue-600 hover:text-blue-900 mr-3"
                      :aria-label="`Voir le profil ${profile.code}`"
                    >
                      Voir détails
                    </button>
                    <a 
                      :href="profile.contact_url" 
                      target="_blank"
                      @click.stop
                      class="text-green-600 hover:text-green-900"
                    >
                      Télécharger
                    </a>
                  </td>
                </tr>

                <!-- Ligne détaillée (expandable) -->
                <tr v-if="expandedProfile === profile.id">
                  <!-- <td colspan="6" class="px-6 py-6 bg-blue-50 border-t border-blue-100">
                  </td> -->
                </tr>
              </template>
            </template>
            <tr v-else>
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="text-gray-500">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="mt-2 text-lg font-medium">Aucun résultat trouvé</p>
                  <p class="mt-1">Essayez de modifier vos critères de recherche ou de filtres</p>
                  <button 
                    @click="resetFilters"
                    class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredProfiles.length > 0" class="px-6 py-4 border-t border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="text-sm text-gray-500 mb-4 sm:mb-0">
            Affichage de 
            <span class="font-medium">{{ startIndex + 1 }}</span> à 
            <span class="font-medium">{{ endIndex }}</span> sur 
            <span class="font-medium">{{ filteredProfiles.length }}</span> profils
          </div>
          
          <div class="flex items-center space-x-2">
            <div class="flex items-center mr-4">
              <span class="text-sm text-gray-700 mr-2">Afficher :</span>
              <select
                v-model="itemsPerPage"
                class="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              :class="[
                'px-3 py-1 border border-gray-300 rounded text-sm',
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              ]"
            >
              Précédent
            </button>
            
            <div class="flex space-x-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 rounded text-sm',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="nextPage"
              :disabled="currentPage === totalPages"
              :class="[
                'px-3 py-1 border border-gray-300 rounded text-sm',
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              ]"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const profiles = ref([])
const loading = ref(true)
const error = ref(null)
const expandedProfile = ref(null)

// Filtres
const searchQuery = ref('')
const selectedStatuses = ref([])
const selectedCompany = ref('')
const selectedPost = ref('')
const dateFilter = ref('')
const showFilters = ref(false)

// Tri et pagination
const sortField = ref('createdAt')
const sortDirection = ref('desc')
const currentPage = ref(1)
const itemsPerPage = ref(25)

const API_URL = 'https://bizconnect-back-web-side.vercel.app/profiles'

// Options pour les filtres
const statusOptions = ref([
  { value: 'active', label: 'Actif' },
  { value: 'en_attente_de_validation', label: 'En attente' },
  { value: 'inactif', label: 'Inactif' }
])

const dateOptions = ref([
  { value: 'today', label: "Aujourd'hui" },
  { value: 'week', label: 'Cette semaine' },
  { value: 'month', label: 'Ce mois' },
  { value: 'year', label: 'Cette année' }
])

// Données uniques pour les filtres
const companies = computed(() => {
  const uniqueCompanies = [...new Set(profiles.value.map(p => p.nom_entreprise))]
  return uniqueCompanies.sort()
})

const posts = computed(() => {
  const uniquePosts = [...new Set(profiles.value.map(p => p.post))]
  return uniquePosts.sort()
})

// Profils filtrés
const filteredProfiles = computed(() => {
  let filtered = [...profiles.value]

  // Recherche globale
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(profile => 
      profile.nom_complet?.toLowerCase().includes(query) ||
      profile.post?.toLowerCase().includes(query) ||
      profile.nom_entreprise?.toLowerCase().includes(query) ||
      profile.num_contact?.includes(query) ||
      profile.mail_contact?.toLowerCase().includes(query)
    )
  }

  // Filtre par statut
  if (selectedStatuses.value.length > 0) {
    filtered = filtered.filter(profile => 
      selectedStatuses.value.includes(profile.etat)
    )
  }

  // Filtre par entreprise
  if (selectedCompany.value) {
    filtered = filtered.filter(profile => 
      profile.nom_entreprise === selectedCompany.value
    )
  }

  // Filtre par poste
  if (selectedPost.value) {
    filtered = filtered.filter(profile => 
      profile.post === selectedPost.value
    )
  }

  // Filtre par date
  if (dateFilter.value) {
    const now = new Date()
    filtered = filtered.filter(profile => {
      const profileDate = new Date(profile.createdAt)
      
      switch (dateFilter.value) {
        case 'today':
          return profileDate.toDateString() === now.toDateString()
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          return profileDate >= weekAgo
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
          return profileDate >= monthAgo
        case 'year':
          const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
          return profileDate >= yearAgo
        default:
          return true
      }
    })
  }

  // Tri
  filtered.sort((a, b) => {
    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    if (sortField.value === 'createdAt') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filtered
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredProfiles.value.length / itemsPerPage.value)
})

const paginatedProfiles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProfiles.value.slice(start, end)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  const end = startIndex.value + itemsPerPage.value
  return end > filteredProfiles.value.length ? filteredProfiles.value.length : end
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Compteur de filtres actifs
const activeFiltersCount = computed(() => {
  let count = 0
  if (searchQuery.value) count++
  if (selectedStatuses.value.length > 0) count++
  if (selectedCompany.value) count++
  if (selectedPost.value) count++
  if (dateFilter.value) count++
  return count
})

// Fonctions
const toggleProfile = (profileId) => {
  expandedProfile.value = expandedProfile.value === profileId ? null : profileId
}

const router = useRouter()
function goToProfile(code) {
  // redirige vers /admin/<code>
  router.push(`/admin/${code}`)
}

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const applyFilters = () => {
  currentPage.value = 1 // Retour à la première page
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedStatuses.value = []
  selectedCompany.value = ''
  selectedPost.value = ''
  dateFilter.value = ''
  currentPage.value = 1
}

const clearSearch = () => {
  searchQuery.value = ''
}

const clearAllFilters = () => {
  resetFilters()
}

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

// Debounced search
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
  }, 300)
}

// Export CSV
const exportToCSV = () => {
  const headers = [
    'ID', 'Code', 'Nom Complet', 'Poste', 'Téléphone', 'Email',
    'Entreprise', 'État', 'Date de Création'
  ]
  
  const rows = filteredProfiles.value.map(profile => [
    profile.id,
    profile.code,
    profile.nom_complet,
    profile.post,
    profile.num_contact,
    profile.mail_contact,
    profile.nom_entreprise,
    formatStatus(profile.etat),
    formatDateShort(profile.createdAt)
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `profils_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

// Watchers
watch([itemsPerPage, currentPage], () => {
  expandedProfile.value = null
})

watch(filteredProfiles, () => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value
  }
})

// Fonctions utilitaires (garder les mêmes que précédemment)
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDateShort = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR')
}

const formatStatus = (status) => {
  const statusMap = {
    'en_attente_de_validation': 'En attente',
    'actif': 'Actif',
    'inactif': 'Inactif'
  }
  return statusMap[status] || status
}

const getStatusClass = (status) => {
  const classes = {
    'en_attente_de_validation': 'bg-yellow-100 text-yellow-800',
    'active': 'bg-green-100 text-green-800',
    'inactif': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getCountByStatus = (status) => {
  return profiles.value.filter(profile => profile.etat === status).length
}

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU1RTUiLz48cGF0aCBkPSJNNzUgODVBNTA1MCAwIDAxMTI1IDg1TTYwIDE0MEgxNDBNNjAgMTEwSDE0MCIgc3Ryb2tlPSIjQ0NDIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4='
}

const fetchProfiles = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(API_URL)
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    
    const data = await response.json()
    profiles.value = Array.isArray(data) ? data : [data]
  } catch (err) {
    error.value = err.message
    console.error('Erreur lors de la récupération des profils:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfiles()
})
</script>