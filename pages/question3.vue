
<template>
  <div class="text-center p-8">
    <h2 class="text-xl font-semibold mb-2 text-gray-600">Question 3</h2>
    <h1 class="text-2xl font-bold mb-6">Tu écris un mail simple. Quelle méthode choisis-tu ?</h1>
    <button @click="choose(50, 'Demander à une IA')" class="btn-blue">Demander à une IA</button>
    <button @click="choose(2, 'L’écrire toi-même')" class="btn-blue ml-4">L’écrire toi-même</button>
  </div>

  <div v-if="answered" class="text-center p-8 max-w-2xl mx-auto">
    <p class="mb-4">
      <strong>{{ selectedOption }}</strong> consomme
      <strong>{{ energyDifference }} Wh</strong>
      {{ comparisonWord }} que l’autre option.
    </p>
    <p class="mb-6 text-gray-700">
      Pour de petites tâches, l'usage d'une IA peut sembler pratique, mais cela consomme bien plus d'énergie que de taper quelques phrases soi-même.
      Il faut faire marcher un peu le cerveau aussi c:

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
  const otherEnergy = energy === 50 ? 2 : 50
  energyStore.addEnergy(energy)
  selectedOption.value = option
  energyDifference.value = Math.abs(energy - otherEnergy)
  comparisonWord.value = energy > otherEnergy ? 'de plus' : 'de moins'
  answered.value = true
  new Audio('/success.mp3').play()
}

function next() {
  router.push('/question4')
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
