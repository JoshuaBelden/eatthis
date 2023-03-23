<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import { i18n } from '@/lib/i18n'
import type Recipe from '@/models/recipe'
import { useStatusStore } from '@/stores/status'
import { useUserStore } from '@/stores/user'
import { useRecipeStore } from '@/stores/recipe'

const statusStore = useStatusStore()
const userStore = useUserStore()
const recipeStore = useRecipeStore()
const route = useRoute()

const recipeId = route.params.id as string
const isNew = !recipeId

const template = isNew
    ? ({
        id: '',
        title: '',
        description: '',
        preparation: '',
      } as Recipe)
    : recipeStore.find(recipeId)

const title = ref(template.title)
const description = ref(template.description)
const preparation = ref(template.preparation)

const cancel = () => {
  router.push(`/my-recipes`)
}

const deleteRecipe = async () => {
  try {
    await recipeStore.deleteOne(recipeId)
    router.push(`/my-recipes`)
  } catch {
    statusStore.queueAlert(i18n.translate('error.record.delete'))
  }
}

const handleSubmit = async () => {
  const recipe = {
    id: isNew ? undefined : recipeId,
    title: title.value,
    description: description.value,
    preparation: preparation.value,
  } as Recipe
  await recipeStore.update(recipe)
  statusStore.queueMessage(i18n.translate('site.recipe.record.update.successful', userStore.user.locale))
  router.push('/my-recipes')
}
</script>

<template>
  <div class="recipe container">
    <h2>
      {{
        i18n.translate(isNew ? 'site.recipe.title.new' : 'site.recipe.title.edit', userStore.user.locale)
      }}
    </h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="title">{{ i18n.translate('site.recipe.label.title', userStore.user.locale) }}:</label>
        <input id="title" v-model="title" required class="form-control" />
      </div>
      <div class="form-group mb-3">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required class="form-control" />
      </div>
      <div class="form-group mb-3">
        <label for="preparation">Preparation:</label>
        <textarea id="preparation" v-model="preparation" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-outline-primary me-1">
        {{ i18n.translate(isNew ? 'site.recipe.record.create' : 'site.recipe.record.save', userStore.user.locale) }}
      </button>
      <button v-if="!isNew" type="button" class="btn btn-outline-danger me-1" @click="deleteRecipe">
        {{ i18n.translate('site.recipe.record.delete', userStore.user.locale) }}
      </button>
      <button type="button" class="btn btn-outline-secondary me-1" @click="cancel">
        {{ i18n.translate('site.recipe.record.cancel', userStore.user.locale) }}
      </button>
      <div v-for="validation in statusStore.validations" class="alert alert-danger mt-3">
        {{ validation }}
      </div>
    </form>
  </div>
</template>

<style></style>
