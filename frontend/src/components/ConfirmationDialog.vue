<script setup lang="ts">
import { ref, defineExpose } from 'vue'

import type { IModal } from '@/lib/interfaces/IModal'
import type { IConfirmationDialogOptions } from '@/lib/interfaces/IConfirmationDialog'

import Modal from './Modal.vue'

const popup = ref<IModal>()

const title = ref('')
const message = ref('')
const confirmButtonText = ref('')
const cancelButtonText = ref('')

const resolvePromise = ref<any>()
const rejectPromise = ref<any>()

const show = (options: IConfirmationDialogOptions) => {
  title.value = options.title
  message.value = options.message
  confirmButtonText.value = options.confirmButtonText
  if (options.cancelButtonText) {
    cancelButtonText.value = options.cancelButtonText
  }

  if (popup.value) {
    popup.value.open()
  }

  return new Promise((resolve, reject) => {
    resolvePromise.value = resolve
    rejectPromise.value = reject
  })
}

const confirm = () => {
  if (popup.value) {
    popup.value.close()
  }

  if (resolvePromise.value) {
    resolvePromise.value(true)
  }
}

const cancel = () => {
  if (popup.value) {
    popup.value.close()
  }
  resolvePromise.value(false)
}

defineExpose({
  show,
})
</script>

<template>
  <Modal ref="popup" class="modal">
    <div class="modal-header">
      <h2 class="modal-title fs-5">{{ title }}</h2>
      <button type="button" class="btn-close" aria-label="Close" @click="cancel"></button>
    </div>
    <div class="modal-body">{{ message }}</div>
    <div class="modal-footer">
      <button @click="cancel" class="btn btn-outline-secondary">{{ cancelButtonText }}</button>
      <button @click="confirm" class="btn btn-danger">{{ confirmButtonText }}</button>
    </div>
  </Modal>
</template>

<style>
.modal-body {
  min-height: 100px;
}

.modal-footer {
  background-color: var(--color-white-mute);
}
</style>
