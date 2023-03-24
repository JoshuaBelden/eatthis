<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import { i18n } from '@/lib/i18n'
import type Recipe from '@/models/recipe'
import { useStatusStore } from '@/stores/status'
import { useUserStore } from '@/stores/user'
import { useRecipeStore } from '@/stores/recipe'

import type { IConfirmationDialog } from '@/lib/interfaces/IConfirmationDialog'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

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
      keywords: []
    } as Recipe)
  : recipeStore.find(recipeId)

const title = ref(template.title)
const description = ref(template.description)
const preparation = ref(template.preparation)
const keywords = ref(template.keywords.join(','))
const confirmationDialog = ref<IConfirmationDialog>()

const cancel = () => {
  router.push(`/my-recipes`)
}

const handleSubmit = async () => {
  const recipe = {
    id: isNew ? undefined : recipeId,
    title: title.value,
    description: description.value,
    preparation: preparation.value,
    keywords: keywords.value.split(',').map(k => k.trim())
  } as Recipe
  await recipeStore.update(recipe)
  isNew
    ? statusStore.queueMessage(
        i18n.translate('generic.message.record.create.success', userStore.user.locale)
      )
    : statusStore.queueMessage(
        i18n.translate('generic.message.record.update.success', userStore.user.locale)
      )
  router.push('/my-recipes')
}

const deleteRecipe = async () => {
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
      statusStore.queueMessage(i18n.translate('generic.message.record.delete.success'))
      router.push(`/my-recipes`)
    }
  } catch {
    statusStore.queueAlert(i18n.translate('generic.message.record.delete.failure'))
  }
}
</script>

<template>
  <div class="recipe container">
    <h2>
      {{ i18n.translate(isNew ? 'recipe.form.header.new' : 'recipe.form.header.edit', userStore.user.locale) }}
    </h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="title"
          >{{ i18n.translate('recipe.form.label.title', userStore.user.locale) }}:</label
        >
        <input id="title" v-model="title" required class="form-control" />
      </div>
      <div class="form-group mb-3">
        <label for="description"
          >{{ i18n.translate('recipe.form.label.description', userStore.user.locale) }}:</label
        >
        <textarea id="description" v-model="description" required class="form-control" />
      </div>
      <div class="form-group mb-3">
        <label for="preparation"
          >{{ i18n.translate('recipe.form.label.preparation', userStore.user.locale) }}:</label
        >
        <textarea id="preparation" v-model="preparation" required class="form-control" />
      </div>
      <div class="form-group mb-3">
        <label for="keywords"
          >{{ i18n.translate('recipe.form.label.keywords', userStore.user.locale) }}:</label
        >
        <input id="keywords" v-model="keywords" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary me-1">
        {{
          i18n.translate(
            isNew ? 'recipe.form.create.button.label' : 'recipe.form.save.button.label',
            userStore.user.locale
          )
        }}
      </button>
      <button v-if="!isNew" type="button" class="btn btn-outline-danger me-1" @click="deleteRecipe">
        {{ i18n.translate('recipe.form.delete.button.label', userStore.user.locale) }}
      </button>
      <button type="button" class="btn btn-outline-secondary me-1" @click="cancel">
        {{ i18n.translate('recipe.form.cancel.button.label', userStore.user.locale) }}
      </button>
      <div v-for="validation in statusStore.validations" class="alert alert-danger mt-3">
        {{ validation }}
      </div>
    </form>
    <ConfirmationDialog ref="confirmationDialog" />
  </div>
</template>

<style></style>
