import { ref } from 'vue'
import { defineStore } from 'pinia'

import api from '@/lib/api'
import type Recipe from '@/models/recipe'

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref([] as any[])

  const loadAll = async () => {
    const result = await api.recipe.get()
    recipes.value = result
  }

  const find = (id: string): Recipe => {
    return recipes.value.find((recipe: Recipe) => recipe.id === id)
  }

  const update = async (recipe: Recipe): Promise<void> => {
    const updatedRecipe = recipe.id ? await api.recipe.put(recipe) : await api.recipe.post(recipe)

    recipes.value = [
      ...recipes.value.filter((r: Recipe) => r.id !== updatedRecipe.id),
      updatedRecipe,
    ]
  }

  const deleteOne = async (id: string): Promise<void> => {
    await api.recipe.delete(id)
    recipes.value = recipes.value.filter((recipe: Recipe) => recipe.id !== id)
  }

  return { recipes, loadAll, find, update, deleteOne }
})
