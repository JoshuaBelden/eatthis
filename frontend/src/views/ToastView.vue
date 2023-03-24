<script setup lang="ts">
import { useStatusStore } from '@/stores/status'

const statusStore = useStatusStore()
</script>

<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div v-for="alert in statusStore.alerts" class="alert alert-danger">
      {{ alert }}
    </div>
    <div v-for="message in statusStore.messages" class="alert alert-success">
      {{ message }}
    </div>
  </div>
</template>