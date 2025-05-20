<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  energy: Number
})

const chartData = {
  labels: [
    'Ton score',
    'Rouler 20 km en voiture electrique', // 3000
    'Aspirateur 1h',                      // 1800
    'Lave-vaisselle',                     // 1200
    'Lessive',                            // 800
    'Streaming 4K 1h',                    // 400
    'Sèche-cheveux 10min',               // 250
    'Charge ordi portable',              // 150
    'Ordi portable 2h',                  // 120
    'Jeu vidéo 1h',                      // 100
    '1h de Netflix en HD',               // 180
    'Micro-ondes 3min',                  // 60
    'Bouillir 1L d’eau',                 // 70
    'Ampoule LED 2h',                    // 20
    'Recharger un smartphone',           // 5
    'Recherche Google (1x)'              // 0.3
  ],
  datasets: [{
    label: 'Énergie (Wh)',
    backgroundColor: [
      '#34d399', '#fa3454', '#f43f5e', '#60a5fa', '#0ea5e9',
      '#f97316', '#e879f9', '#10b981', '#38bdf8', '#8b5cf6',
      '#6366f1', '#facc15', '#fbbf24', '#a3e635', '#fde68a', '#c084fc'
    ],
    data: [
      props.energy,
      3000,
      1800,
      1200,
      800,
      400,
      250,
      150,
      120,
      100,
      180,
      60,
      70,
      20,
      5,
      0.3
    ]
  }]

}


const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false
  },
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Comparaison d\'énergie consommée' },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          return `${context.parsed.y} Wh`;
        }
      }
    }
  }
}
</script>

<template>
  <div class="w-full mx-auto">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
