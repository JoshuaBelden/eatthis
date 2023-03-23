import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
  const validations = ref([] as string[])
  const alerts = ref([] as string[])
  const messages = ref([] as string[])

  const queueValidation = (message: string) => {
    validations.value.push(message)
    setTimeout(
      () => (validations.value = [...validations.value.filter((v) => v !== message)]),
      3000
    )
  }

  const queueAlert = (alert: string) => {
    alerts.value.push(alert)
    setTimeout(() => (alerts.value = [...alerts.value.filter((v) => v !== alert)]), 3000)
  }

  const queueMessage = (message: string) => {
    messages.value.push(message)
    setTimeout(() => (messages.value = [...messages.value.filter((v) => v !== message)]), 3000)
  }

  return { validations, alerts, messages, queueValidation, queueAlert, queueMessage }
})
