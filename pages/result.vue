<script setup lang="ts">
import { useEnergyStore } from '@/stores/energy'
import { useRouter } from 'vue-router'
import EnergyChart from '@/components/EnergyChart.vue'

const energyStore = useEnergyStore()
const router = useRouter()

function convertToCO2(wh: number) {
  // 1 kWh ≈ 400g CO2 -> 1Wh ≈ 0.4g CO2
  return Math.round(wh * 0.4)
}

function interpretEnergy(wh: number) {
  if (wh < 200) {
    return {
      message: "Excellent ! 🌱 Tu es très sobre dans ton usage des IA.",
      suggestion: "Continue à privilégier les alternatives locales, les outils simples, et réfléchis avant chaque usage d’une IA."
    }
  } else if (wh < 600) {
    return {
      message: "Pas mal ! 🌍 Tu as un usage modéré des IA.",
      suggestion: "Tu peux encore réduire ton impact en limitant les outils trop gourmands comme les IA génératives."
    }
  } else {
    return {
      message: "Oups ! 😬 Ton usage est assez énergivore.",
      suggestion: "Essaie de repérer les IA les plus coûteuses (vidéos, images, gros modèles) et de les utiliser avec parcimonie."
    }
  }
}

const result = interpretEnergy(energyStore.totalEnergy)
</script>

<template>
  <div class="text-center p-8">
    <h1 class="text-3xl font-bold mb-6">Résultat 🌿</h1>
    <p class="text-xl mb-2">
      Tu as consommé <strong>{{ energyStore.totalEnergy }} Wh</strong> d’énergie.
    </p>
    <p class="text-md mb-4">
      Soit environ <strong>{{ convertToCO2(energyStore.totalEnergy) }} g de CO₂</strong> émis.
    </p>

    <p class="text-lg font-semibold text-green-700 mt-6 mb-2">{{ result.message }}</p>
    <p class="text-gray-700 mb-8">{{ result.suggestion }}</p>

    <div class="w-full sm:w-1/2 h-[40vh] mx-auto px-4 mb-20">
      <EnergyChart :energy="energyStore.totalEnergy" />
    </div>

    <a href="/" class="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">
      🔁 Rejouer
    </a>
  </div>
</template>
