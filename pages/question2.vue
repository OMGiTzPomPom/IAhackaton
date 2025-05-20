
<template>
  <div class="text-center p-8">
    <h2 class="text-xl font-semibold mb-2 text-gray-600">Question 2</h2>
    <h1 class="text-2xl font-bold mb-6">Tu veux un résumé de livre. Quelle méthode préfères-tu ?</h1>
    <button @click="choose(80, 'Utiliser ChatGPT')" class="btn-blue">Utiliser ChatGPT</button>
    <button @click="choose(10, 'Lire un résumé en ligne')" class="btn-blue ml-4">Lire un résumé en ligne</button>
  </div>

  <div v-if="answered" class="text-center p-8 max-w-2xl mx-auto">
    <p class="mb-4">
      <strong>{{ selectedOption }}</strong> consomme
      <strong>{{ energyDifference }} Wh</strong>
      {{ comparisonWord }} que l’autre option.
    </p>
    <p class="mb-6 text-gray-700">
      ChatGPT nécessite des serveurs énergivores, alors qu'un résumé existant en ligne est déjà hébergé et consulté sans nouvelle génération.
      De plus c'est bien plus ethique de soutenir des contributeurs independants !<br/>
      <b><a href="https://resumes-livres.com/" target="_blank">Resume Livres</a></b> et
      <b><a href="http://koober.com/fr/resumes" target="_blank">Koober</a></b> sont de bons exemples !
    </p>
    <button @click="next()" class="btn-green">Question suivante</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEnergyStore } from '@/stores/energy'

const router = useRouter()
const energyStore = useEnergyStore()

const answered = ref(false)
const selectedOption = ref('')
const energyDifference = ref(0)
const comparisonWord = ref('')

function choose(energy, option) {
  const otherEnergy = energy === 80 ? 10 : 80
  energyStore.addEnergy(energy)
  selectedOption.value = option
  energyDifference.value = Math.abs(energy - otherEnergy)
  comparisonWord.value = energy > otherEnergy ? 'de plus' : 'de moins'
  answered.value = true
  new Audio('/success.mp3').play()
}

function next() {
  router.push('/question3')
}
</script>

<style scoped>
.btn-blue {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
}

.btn-green {
  background-color: #10b981;
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
}
</style>
