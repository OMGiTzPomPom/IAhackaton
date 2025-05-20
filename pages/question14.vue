
<template>
  <div class="text-center p-8">
    <h2 class="text-xl font-semibold mb-2 text-gray-600">Question 14</h2>
    <h1 class="text-2xl font-bold mb-6">Tu veux écrire un poème. Quelle option préfères-tu ?</h1>
    <button @click="choose(110, 'Poème généré par IA')" class="btn-blue">Poème généré par IA</button>
    <button @click="choose(7, 'Écrire toi-même')" class="btn-blue ml-4">Écrire toi-même</button>
  </div>

  <div v-if="answered" class="text-center p-8 max-w-2xl mx-auto">
    <p class="mb-4">
      <strong>{{ selectedOption }}</strong> consomme
      <strong>{{ energyDifference }} Wh</strong>
      {{ comparisonWord }} que l’autre option.
    </p>
    <p class="mb-6 text-gray-700">
      Créer du texte créatif avec une IA utilise beaucoup d’énergie car le modèle est très lourd. De plus, on ne pourra pas realiser de caligraphie comme Guillaume Appolinaire.
      <img src="/img/14.png">
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
  new Audio('/success.mp3').play()

  const otherEnergy = energy === 110 ? 7 : 110
  energyStore.addEnergy(energy)
  selectedOption.value = option
  energyDifference.value = Math.abs(energy - otherEnergy)
  comparisonWord.value = energy > otherEnergy ? 'de plus' : 'de moins'
  answered.value = true
}

function next() {
  router.push('/question15')
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
