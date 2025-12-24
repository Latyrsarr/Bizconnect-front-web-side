<template>
  <div>
    <!-- ... (le même template que vous avez) ... -->
    <!-- J'ai conservé votre template original, en ajoutant gestion d'état/messages -->
    <!-- Hero Contact -->
    <section class="bg-gradient-to-b from-blue-50 to-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Contactez-<span class="text-blue-600">nous</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Prêt à transformer votre entreprise ? Notre équipe est à votre écoute.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Grid -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Formulaire -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-xl p-8">
              <h2 class="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

              <div v-if="successMessage" role="status" class="mb-4 p-4 rounded text-green-800 bg-green-100">
                {{ successMessage }}
              </div>
              <div v-if="errorMessage" role="alert" class="mb-4 p-4 rounded text-red-800 bg-red-100">
                {{ errorMessage }}
              </div>

              <form @submit.prevent="submitForm" class="space-y-6" novalidate>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-gray-700 mb-2">Nom complet *</label>
                    <input id="name" type="text" v-model="form.name" required
                      class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                  </div>
                  <div>
                    <label for="company" class="block text-gray-700 mb-2">Entreprise</label>
                    <input id="company" type="text" v-model="form.company"
                      class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="email" class="block text-gray-700 mb-2">Email *</label>
                    <input id="email" type="email" v-model="form.email" required
                      class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                  </div>
                  <div>
                    <label for="phone" class="block text-gray-700 mb-2">Téléphone</label>
                    <input id="phone" type="tel" v-model="form.phone"
                      class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                  </div>
                </div>
                <div>
                  <label for="subject" class="block text-gray-700 mb-2">Sujet *</label>
                  <select id="subject" v-model="form.subject" required
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="cartes">Cartes de visite NFC</option>
                    <option value="menus">Tags Menu NFC</option>
                    <option value="evenements">Organisation d'événements</option>
                    <option value="devis">Demande de devis</option>
                    <option value="support">Support technique</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label for="message" class="block text-gray-700 mb-2">Message *</label>
                  <textarea id="message" v-model="form.message" required rows="6"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Décrivez votre projet ou votre demande..."></textarea>
                </div>
                <button type="submit"
                  :disabled="loading"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition disabled:opacity-60">
                  <span v-if="loading">Envoi...</span>
                  <span v-else>Envoyer le message</span>
                </button>
              </form>
            </div>
          </div>

          <!-- Informations de contact -->
          <div class="space-y-8">
            <!-- Contact direct -->
            <div class="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl p-8">
              <h3 class="text-2xl font-bold mb-6">Contact direct</h3>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mr-4">
                    <span class="text-2xl">📧</span>
                  </div>
                  <div>
                    <p class="font-bold">Email</p>
                    <p class="opacity-90">bizconnectnfc@gmail.com</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mr-4">
                    <span class="text-2xl">📞</span>
                  </div>
                  <div>
                    <p class="font-bold">Téléphone</p>
                    <p class="opacity-90">+221 77 032 62 86</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mr-4">
                    <span class="text-2xl">📍</span>
                  </div>
                  <div>
                    <p class="font-bold">Adresse</p>
                    <p class="opacity-90">Amitié 3, VDN, Dakar, Senegal</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Heures d'ouverture -->
            <div class="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 class="text-2xl font-bold mb-6">Horaires</h3>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-600">Lundi - Vendredi</span>
                  <span class="font-bold">9h - 20h</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Samedi</span>
                  <span class="font-bold">10h - 20h</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Dimanche</span>
                  <span class="font-bold">10h - 20h</span>
                </div>
              </div>
            </div>

            <!-- CTA Rapide -->
            <div class="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 text-center">
              <h3 class="text-2xl font-bold mb-4">Urgent ?</h3>
              <p class="mb-6">Besoin d'une réponse rapide ?</p>
              <a href="tel:+221770326286"
                class="inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-green-50">
                Appelez-nous maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Carte Google Maps -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Retrouvez-nous</h2>
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
          <div class="h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div class="text-center">
              <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span class="text-3xl">📍</span>
              </div>
              <p class="text-xl font-bold">Amitié 3, VDN</p>
              <p class="text-gray-600">Dakar, Senegal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useSeoMeta({
  title: 'Contact - BizConnect',
  description: 'Contactez-nous pour toute demande d\'information ou de support.'
})

const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const resetForm = () => {
  form.value = { name: '', company: '', email: '', phone: '', subject: '', message: '' }
}

const submitForm = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Validation simple côté client
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires.'
    return
  }

  loading.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    successMessage.value = 'Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.'
    resetForm()
  } catch (err) {
    console.error('Erreur API contact:', err)
    // H3 errors parfois renvoient err.statusMessage ou err.data.message
    errorMessage.value = err?.data?.message || err?.statusMessage || 'Une erreur est survenue, réessayez plus tard.'
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Contact BizConnect - Demandez un devis gratuit',
  description: 'Contactez notre équipe pour une démonstration ou un devis personnalisé'
})
</script>