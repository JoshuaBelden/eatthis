import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import api from '@/lib/api';
import { useStatusStore } from './status';

const emptyUser = {
  id: 0,
  name: '',
  email: '',
  avatar: ''
}

export const useUserStore = defineStore('user', () => {
  const statusStore = useStatusStore();
  const authToken = ref('');
  const user = ref(emptyUser);

  const isAuthenticated = computed(() =>{
    return !!authToken.value
  })

  const persistToken = (token: string) => {
    authToken.value = token;
    api.defaults.setAuthHeader(token)
    localStorage.setItem('token', token);
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
      logout();
      statusStore.setLastError('error.auth.login'.toMessage());
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const token = await api.auth.get.authToken(email, password)
      persistToken(token)

      user.value = await api.user.get()
      return true;
    } catch (error) {
      statusStore.setLastError('error.auth.login'.toMessage())
      return false
    }
  };

  const logout = () => {
    clearToken()
    user.value = emptyUser
  }

  return { user, isAuthenticated, setAuthToken, login, logout }
});