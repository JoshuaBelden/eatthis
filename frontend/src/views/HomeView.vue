<script setup lang="ts">
import { i18n } from '@/lib/i18n'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { name, locale } = userStore.user
</script>
<template>{{ i18n.translate('home.page.title', locale) }}</template>
