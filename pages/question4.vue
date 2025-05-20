
<template>
  <div class="text-center p-8">
    <h2 class="text-xl font-semibold mb-2 text-gray-600">Question 4</h2>
    <h1 class="text-2xl font-bold mb-6">Tu veux générer des images d’un produit. Que fais-tu ?</h1>
    <button @click="choose(150, 'Générer via IA')" class="btn-blue">Générer via IA</button>
    <button @click="choose(20, 'Photographier le produit')" class="btn-blue ml-4">Photographier le produit</button>
  </div>

  <div v-if="answered" class="text-center p-8 max-w-2xl mx-auto">
    <p class="mb-4">
      <strong>{{ selectedOption }}</strong> consomme
      <strong>{{ energyDifference }} Wh</strong>
      {{ comparisonWord }} que l’autre option.
    </p>
    <p class="mb-6 text-gray-700">
      Les images IA demandent des cycles GPU lourds. Prendre une photo, même avec un smartphone, est bien moins énergivore.
    </p>
    <p class="mb-6 text-gray-700">
      Voici la difference entre une image reelle et generee par IA. C'est plus propre dans la vraie vie non ? c:
      <img src="/img/4.jpg">
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
  const otherEnergy = energy === 150 ? 20 : 150
  energyStore.addEnergy(energy)
  selectedOption.value = option
  energyDifference.value = Math.abs(energy - otherEnergy)
  comparisonWord.value = energy > otherEnergy ? 'de plus' : 'de moins'
  answered.value = true
  new Audio('/success.mp3').play()
}

function next() {
  router.push('/question5')
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
