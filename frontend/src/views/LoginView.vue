<script setup lang="ts">
import { ref } from 'vue'

import router from '@/router'
import { i18n } from '@/lib/i18n'
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
    <h1>{{ i18n.translate('login.page.title', userStore.user.locale) }}</h1>
    <form @submit.prevent="login(email, password)">
      <div class="form-group mb-3">
        <label for="email">{{ i18n.translate('login.form.label.email', userStore.user.locale) }}:</label>
        <input
          id="email"
          v-model="email"
          required
          class="form-control"
          :placeholder="i18n.translate('login.form.placeholder.email', userStore.user.locale)" />
      </div>
      <div class="form-group">
        <label for="password"
          >{{ i18n.translate('login.form.label.password', userStore.user.locale) }}:</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          :placeholder="i18n.translate('login.form.placeholder.password', userStore.user.locale)"
          required
          class="form-control mb-3" />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ i18n.translate('login.form.button.submit.label', userStore.user.locale) }}
      </button>
      <div v-for="validation in statusStore.validations" class="alert alert-danger mt-3">
        {{ validation }}
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
