<script setup lang="ts">
const router = useRouter()

function startGame() {
  router.push('/question1')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8 text-center">
    <h1 class="text-3xl font-bold mb-6">Bienvenue dans le jeu sur la pollution des IA 🌍</h1>
    <p class="mb-8 text-lg">Fais des choix et découvre leur impact énergétique !</p>
    <button @click="startGame" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl">
      Commencer
    </button>
  </div>
</template>