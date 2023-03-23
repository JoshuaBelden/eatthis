<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { i18n } from '@/lib/i18n'
import { useUserStore } from '@/stores/user'
import ToastView from './views/ToastView.vue'

import './styles/vars.css'

const userStore = useUserStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logo"><h1>EatThis!</h1></div>
      <nav class="menu">
        <RouterLink to="/">{{ i18n.translate('site.nav.home', userStore.user.locale) }}</RouterLink>
        <RouterLink to="/my-recipes" v-if="userStore.isAuthenticated">{{
          i18n.translate('site.nav.recipes', userStore.user.locale)
        }}</RouterLink>
        <RouterLink to="/about">{{ i18n.translate('site.nav.about', userStore.user.locale) }}</RouterLink>
      </nav>
      <nav class="account-info">
        <span v-if="userStore.isAuthenticated">{{ userStore.user.name }}</span>
        <RouterLink to="/login" v-if="!userStore.isAuthenticated">{{
          i18n.translate('site.nav.login', userStore.user.locale)
        }}</RouterLink>
        <RouterLink to="/logout" v-if="userStore.isAuthenticated">{{
          i18n.translate('site.nav.logout', userStore.user.locale)
        }}</RouterLink>
      </nav>
    </div>
  </header>
  <main class="container-fluid">
    <RouterView />
  </main>
  <footer>
    <ToastView />
  </footer>
</template>

<style scoped>
header {
  color: var(--vt-c-white-mute);
  background-color: var(--color-background-dark);
  margin-bottom: 16px;
}

.wrapper {
  display: flex;
  align-items: flex-end;
  padding: 16px 8px 8px 16px;
}

.logo {
  color: var(--color-white-mute);
  width: 150px;
}

.logo h1 {
  margin: 0px;
  padding: 0px;
}

nav {
  color: var(--color-white-mute);
  font-size: 13px;
}

nav.menu {
  flex-grow: 2;
}

nav a.router-link-exact-active {
  color: var(--color-brass);
  background-color: transparent;
}

@media (hover: hover) {
  a:hover {
    font-size: 14px;
    color: var(--color-white);
  }
}

nav a {
  color: var(--color-white-mute);
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
}

nav a:first-of-type {
  border: 0;
}
</style>
