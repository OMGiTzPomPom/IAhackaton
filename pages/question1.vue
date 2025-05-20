<template>
  <div class="text-center p-8">
    <h2 class="text-xl font-semibold mb-2 text-gray-600">Question 1</h2>
    <h1 class="text-2xl font-bold mb-6">Tu veux générer un portrait IA stylisé. Quelle option choisis-tu ?</h1>
    <button @click="choose(120, 'Utiliser une IA')" class="btn-blue">Utiliser une IA</button>
    <button @click="choose(5, 'Dessiner toi-même')" class="btn-blue ml-4">Dessiner toi-même</button>
  </div>

  <div v-if="answered" class="text-center p-8 max-w-2xl mx-auto">
    <p class="mb-4">
      <strong>{{ selectedOption }}</strong> consomme
      <strong>{{ energyDifference }} Wh</strong>
      {{ comparisonWord }} que l’autre option.
    </p>
    <p class="mb-6 text-gray-700">
      Générer une image avec une IA implique le passage par des modèles très coûteux comme Stable Diffusion ou DALL·E,
      nécessitant des GPU puissants pendant plusieurs secondes. En revanche, dessiner soi-même n'utilise qu’un peu d’électricité
      pour l’éclairage ou l’écran.
    </p>
    <p class="mb-6 text-gray-700">
      Puis en plus, c'est moche ce qui est genere non ?
      <img src="/img/1.jpg">
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
  const otherEnergy = energy === 120 ? 5 : 120
  energyStore.addEnergy(energy)
  selectedOption.value = option
  energyDifference.value = Math.abs(energy - otherEnergy)
  comparisonWord.value = energy > otherEnergy ? 'de plus' : 'de moins'
  answered.value = true
  new Audio('/success.mp3').play()
}

function next() {
  router.push('/question2')
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
