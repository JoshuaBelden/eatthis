<script setup lang="ts">
import { i18n } from '@/lib/i18n'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { locale } = userStore.user
</script>

<template>
  <div class="recipe">
    <h2>{{i18n.translate('site.nav.recipes', locale)}}</h2>
    
  </div>
</template>

<style>
</style>