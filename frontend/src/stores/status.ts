import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
  const lastError = ref('')

  const setLastError = (message: string) => {
    lastError.value = message
  }

  const clearLastError = () => lastError.value = ''

  return { lastError, setLastError, clearLastError }
})
