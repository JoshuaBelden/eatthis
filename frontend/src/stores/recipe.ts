import { ref } from 'vue'
import { defineStore } from 'pinia'

import api from '@/lib/api'
import type Recipe from '@/models/recipe'

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref([] as any[])

  const create = async (recipe: Recipe): Promise<boolean> => {
    await api.recipe.post(recipe)
    recipes.value.push(recipe)
    return true
  }

  return { recipes, create }
})
