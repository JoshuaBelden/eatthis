<script setup lang="ts">
import { i18n } from '@/lib/i18n';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div class="about">
    <h1>{{ i18n.translate('about.page.title', userStore.user.locale) }}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
