import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
  const lastError = ref('')

  const queueErrorMessage = (message: string) => {
    lastError.value = message
    setTimeout(() => lastError.value = '', 3000)
  }

  const clearLastError = () => lastError.value = ''

  return { lastError, setLastError: queueErrorMessage, clearLastError }
})
