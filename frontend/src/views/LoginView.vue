<script setup lang="ts">
import { ref } from 'vue'

import router from '@/router'
import { useStatusStore } from '@/stores/status'
import { useUserStore } from '@/stores/user'

const statusStore = useStatusStore()
const userStore = useUserStore()

const email = ref('')
const password = ref('')

const login = async (email: string, password: string) => {
  const success = await userStore.login(email, password)
  success && router.push('/')
}
</script>

<template>
  <div class="login container">
    <h1>Login</h1>
    <form @submit.prevent="login(email, password)">
      <div class="form-group mb-3">
        <label for="email">Email:</label>
        <input id="email" v-model="email" required class="form-control" placeholder="Your email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Your Password"
          required
          class="form-control mb-3" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <div v-if="statusStore.lastError" class="alert alert-danger mt-3">
        {{ statusStore.lastError }}
      </div>
    </form>
  </div>
</template>

<style>
.login {
  width: 350px;
  margin-top: 100px;
}
</style>
