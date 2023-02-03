<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

import { useStatusStore } from '@/stores/status'
import { useUserStore } from '@/stores/user'
import { useRecipeStore } from '@/stores/recipe'

const statusStore = useStatusStore()
const userStore = useUserStore()
const recipeStore = useRecipeStore()

const title = ref('')
const description = ref('')
const preparation = ref('')

const handleSubmit = async () => {
  if (
    await recipeStore.create({
      title: title.value,
      description: description.value,
      preparation: preparation.value,
    })
  ) {
    router.push('my-recipes')
  }
}
</script>

<template>
  <div class="recipe container">
    <h2>New Recipes</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="title">Title:</label>
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
      <button type="submit" class="btn btn-primary">Create Recipe</button>
      <div v-if="statusStore.lastError" class="alert alert-danger mt-3">
        {{ statusStore.lastError }}
      </div>
    </form>
  </div>
</template>

<style></style>
