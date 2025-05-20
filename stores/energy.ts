import { defineStore } from 'pinia'

export const useEnergyStore = defineStore('energy', {
    state: () => ({
        totalEnergy: 0
    }),
    actions: {
        addEnergy(amount: number) {
            this.totalEnergy += amount
        }
    }
})
