
<template>
  <div class="text-center p-8">
    <h2 class="text-xl font-semibold mb-2 text-gray-600">Question 23</h2>
    <h1 class="text-2xl font-bold mb-6">Tu veux un avatar pour un forum. Quelle méthode choisis-tu ?</h1>
    <button @click="choose(130, 'Génération IA')" class="btn-blue">Génération IA</button>
    <button @click="choose(15, 'Utiliser une photo existante')" class="btn-blue ml-4">Utiliser une photo existante</button>
  </div>

  <div v-if="answered" class="text-center p-8 max-w-2xl mx-auto">
    <p class="mb-4">
      <strong>{{ selectedOption }}</strong> consomme
      <strong>{{ energyDifference }} Wh</strong>
      {{ comparisonWord }} que l’autre option.
    </p>
    <p class="mb-6 text-gray-700">
      Les avatars IA prennent du temps de calcul, alors qu’une image existante n’en demande aucun nouveau. De plus, c'est tres peu ethique vis a vis du travail de graphistes professionels quand on sait que pour generer ces images, l'IA s'est entrainee avec leur travail
      <img src="/img/23.png">
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

  const otherEnergy = energy === 130 ? 15 : 130
  energyStore.addEnergy(energy)
  selectedOption.value = option
  energyDifference.value = Math.abs(energy - otherEnergy)
  comparisonWord.value = energy > otherEnergy ? 'de plus' : 'de moins'
  answered.value = true
}

function next() {
  router.push('/question24')
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
