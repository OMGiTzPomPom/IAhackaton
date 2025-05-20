
<template>
  <div class="text-center p-8">
    <h2 class="text-xl font-semibold mb-2 text-gray-600">Question 6</h2>
    <h1 class="text-2xl font-bold mb-6">Tu veux traduire un texte simple. Quelle méthode choisis-tu ?</h1>
    <button @click="choose(60, 'Traduction par IA')" class="btn-blue">Traduction par IA</button>
    <button @click="choose(8, 'Utiliser un dictionnaire')" class="btn-blue ml-4">Utiliser un dictionnaire</button>
  </div>

  <div v-if="answered" class="text-center p-8 max-w-2xl mx-auto">
    <p class="mb-4">
      <strong>{{ selectedOption }}</strong> consomme
      <strong>{{ energyDifference }} Wh</strong>
      {{ comparisonWord }} que l’autre option.
    </p>
    <p class="mb-6 text-gray-700">
      Utiliser un dictionnaire ou un traducteur existant en ligne est moins énergivore qu’un modèle IA génératif. Bien que certains traducteurs fassent appel a l'IA, la majortie des fonctionalites sont bien moins energivores.
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

  const otherEnergy = energy === 60 ? 8 : 60
  energyStore.addEnergy(energy)
  selectedOption.value = option
  energyDifference.value = Math.abs(energy - otherEnergy)
  comparisonWord.value = energy > otherEnergy ? 'de plus' : 'de moins'
  answered.value = true
}

function next() {
  router.push('/question7')
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
