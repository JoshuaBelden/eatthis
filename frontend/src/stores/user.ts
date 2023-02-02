import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { getAuthToken, getUser, setAuthHeader } from '@/lib/request';
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
    setAuthHeader(token)
    localStorage.setItem('token', token);
  }

  const clearToken = () => {
    authToken.value = ''
    setAuthHeader('')
    localStorage.setItem('token', '')
  }

  const setAuthToken = async (value: string) => {
    try {
      persistToken(value)
      user.value = await getUser()
    } catch (error) {
      logout();
      statusStore.setLastError('error.auth.login'.toMessage());
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const token = await getAuthToken(email, password)
      persistToken(token)

      user.value = await getUser()
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
