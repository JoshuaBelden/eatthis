<script setup lang="ts">
import { i18n } from '@/lib/i18n'
import router from '@/router'
import { useRecipeStore } from '@/stores/recipe'
import { useUserStore } from '@/stores/user'
import { useStatusStore } from '@/stores/status'

import '@/styles/vars.css'

const statusStore = useStatusStore()

const addRecipe = () => {
  router.push('/new-recipe')
}

const editRecipe = (recipeId: string) => {
  router.push(`/edit-recipe/${recipeId}`)
}

const deleteRecipe = async (recipeId: string) => {
  try {
    await recipeStore.deleteOne(recipeId)
  } catch {
    statusStore.queueAlert(i18n.translate('error.record.delete'))
  }
}

const userStore = useUserStore()
const recipeStore = useRecipeStore()
recipeStore.loadAll()
</script>

<template>
  <div class="recipe">
    <div class="toolbar">
      <h2>{{ i18n.translate('site.nav.recipes', userStore.user.locale) }}</h2>
      <button type="button" class="btn btn-outline-success btn-sm me-1" @click="(e) => addRecipe()">
        {{ i18n.translate('site.recipe.record.new', userStore.user.locale) }}
      </button>
    </div>
    <div class="flex">
      <div v-for="recipe in recipeStore.recipes" class="recipe-card">
        <div class="title">{{ recipe.title }}</div>
        <div class="body">
          <div class="recipe-description">{{ recipe.description }}</div>
          <div class="flex">
            <div v-for="keyword in recipe.keywords" class="keyword">{{ keyword }}</div>
          </div>
        </div>
        <div class="footer">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm me-1"
            @click="(e) => editRecipe(recipe.id)">
            {{ i18n.translate('site.recipe.record.edit', userStore.user.locale) }}
          </button>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm me-1"
            @click="(e) => deleteRecipe(recipe.id)">
            {{ i18n.translate('site.recipe.record.delete', userStore.user.locale) }}
          </button>
        </div>
      </div>
    </div>
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
  border: solid 1px var(--color-brass);
  border-radius: 8px;
  margin: var(--element-gap);
  padding: var(--element-gap);
  width: 300px;
}

.body {
  flex: 2;
}

.title {
  font-size: var(--font-size-title);
  font-weight: 500;
}

.keyword {
  color: var(--color-text-alt);
  font-weight: 500;
  border: solid 1px var(--color-text-alt);
  border-radius: 8px;
  margin: var(--element-gap);
  padding: var(--element-gap);
}
</style>
