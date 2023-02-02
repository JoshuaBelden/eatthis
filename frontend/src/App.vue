<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

import './styles/vars.css'

const userStore = useUserStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logo"><h1>EatThis!</h1></div>
      <nav class="menu">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <nav class="account-info">
        <RouterLink to="/login" v-if="!userStore.isAuthenticated">Login</RouterLink>
        <RouterLink to="/logout" v-if="userStore.isAuthenticated">Logout</RouterLink>
        {{ userStore.user.name }}
      </nav>
    </div>
  </header>
  <main class="container-fluid">
    <RouterView />
  </main>
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
  padding: 16px 8px 4px 16px;
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
