<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const open = () => {
  isVisible.value = true
}

const close = () => {
  isVisible.value = false
}
const isVisible = ref(false)

defineExpose({
  open,
  close,
})
</script>

<template>
  <transition name="fade">
    <div class="modal" tabindex="-1" v-if="isVisible">
      <div class="modal-dialog">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  z-index: 1;
}
</style>
