import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/lib/api'
import { defaultLocale } from '@/lib/i18n'
import { useStatusStore } from './status'

const emptyUser = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
  locale: defaultLocale,
}

export const useUserStore = defineStore('user', () => {
  const statusStore = useStatusStore()
  const authToken = ref('')
  const user = ref(emptyUser)

  const isAuthenticated = computed(() => {
    return !!authToken.value
  })

  const persistToken = (token: string) => {
    authToken.value = token
    api.defaults.setAuthHeader(token)
    localStorage.setItem('token', token)
  }

  const clearToken = () => {
    authToken.value = ''
    api.defaults.setAuthHeader('')
    localStorage.setItem('token', '')
  }

  const setAuthToken = async (value: string) => {
    try {
      persistToken(value)
      user.value = await api.user.get()
    } catch (error) {
      logout()
      statusStore.queueAlert('error.auth.login'.translate())
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const token = await api.auth.get.authToken(email, password)
      persistToken(token)

      user.value = await api.user.get()
      return true
    } catch (error) {
      statusStore.queueValidation('error.auth.login'.translate())
      return false
    }
  }

  const logout = () => {
    clearToken()
    user.value = emptyUser
  }

  return { user, isAuthenticated, setAuthToken, login, logout }
})
