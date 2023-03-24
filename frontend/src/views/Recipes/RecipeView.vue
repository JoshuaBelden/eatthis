<script setup lang="ts">
import { ref } from 'vue'

import { i18n } from '@/lib/i18n'
import router from '@/router'
import { useRecipeStore } from '@/stores/recipe'
import { useUserStore } from '@/stores/user'
import { useStatusStore } from '@/stores/status'

import type { IConfirmationDialog } from '@/lib/interfaces/IConfirmationDialog'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

import '@/styles/vars.css'

const statusStore = useStatusStore()
const userStore = useUserStore()
const recipeStore = useRecipeStore()
recipeStore.loadAll()

const confirmationDialog = ref<IConfirmationDialog>()

const addRecipe = () => {
  router.push('/new-recipe')
}

const editRecipe = (recipeId: string) => {
  router.push(`/edit-recipe/${recipeId}`)
}

const deleteRecipe = async (recipeId: string) => {
  try {
    const ok = await confirmationDialog.value?.show({
      title: i18n.translate('recipe.confirmation.delete.title', userStore.user.locale),
      message: i18n.translate('recipe.confirmation.delete.message', userStore.user.locale),
      confirmButtonText: i18n.translate(
        'recipe.confirmation.delete.confirmButtonText',
        userStore.user.locale
      ),
      cancelButtonText: i18n.translate(
        'recipe.confirmation.delete.cancelButtonText',
        userStore.user.locale
      ),
    })
    if (ok) {
      await recipeStore.deleteOne(recipeId)
      statusStore.queueMessage(
        i18n.translate('generic.message.record.delete.success', userStore.user.locale)
      )
    }
  } catch (error) {
    console.error(error)
    statusStore.queueAlert(
      i18n.translate('generic.message.record.delete.failure', userStore.user.locale)
    )
  }
}
</script>

<template>
  <div class="recipe">
    <div class="toolbar">
      <h2>{{ i18n.translate('recipe.page.title', userStore.user.locale) }}</h2>
      <button type="button" class="btn btn-outline-success btn-sm me-1" @click="(e) => addRecipe()">
        {{ i18n.translate('recipe.form.new.button.label', userStore.user.locale) }}
      </button>
    </div>
    <div class="flex-wrap">
      <div v-for="recipe in recipeStore.recipes" class="recipe-card">
        <div class="title">{{ recipe.title }}</div>
        <div class="body">
          <div class="recipe-description">{{ recipe.description }}</div>
        </div>
        <div class="flex">
          <div v-for="keyword in recipe.keywords" class="keyword">{{ keyword }}</div>
        </div>
        <div class="footer">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm me-1"
            @click="(e) => editRecipe(recipe.id)">
            {{ i18n.translate('recipe.form.edit.button.label', userStore.user.locale) }}
          </button>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm me-1"
            @click="(e) => deleteRecipe(recipe.id)">
            {{ i18n.translate('recipe.form.delete.button.label', userStore.user.locale) }}
          </button>
        </div>
      </div>
    </div>
    <ConfirmationDialog ref="confirmationDialog" />
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recipe-card {
  display: flex;
  flex-direction: column;
  border: solid 1px var(--color-linen);
  border-radius: 4px;
  margin: var(--element-gap);
  width: 200px;
  height: 200px;
}

.body {
  flex: 2;
  padding: var(--element-gap);
}

.title {
  font-size: var(--font-size-title);
  font-weight: 500;
  padding: var(--element-gap);
}

.keyword {
  color: var(--color-text-alt);
  font-weight: 500;
  border: solid 1px var(--color-text-alt);
  border-radius: 8px;
  margin: var(--element-gap);
  padding: var(--element-gap);
}

.footer {
  background-color: var(--color-light-grey);
  padding: var(--element-gap);
}
</style>
