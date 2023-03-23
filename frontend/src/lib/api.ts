import axios from 'axios'

import type Recipe from '@/models/recipe'

const setBaseUrl = (url: string) => {
  axios.defaults.baseURL = url
  axios.defaults.headers.post['Content-Type'] = 'application/json'
}

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common['x-auth-token'] = token
}

const getAuthToken = async (email: string, password: string) => {
  const response = await axios.post('auth', {
    email,
    password,
  })
  return response.data.token
}

const getUser = async () => {
  const response = await axios.get('auth')
  return response.data
}

const getRecipes = async () => {
  const response = await axios.get('recipe')
  return response.data
}

const postRecipe = async (recipe: Recipe) => {
  const response = await axios.post('recipe', recipe)
  return response.data
}

const putRecipe = async (recipe: Recipe) => {
  const response = await axios.put('recipe', recipe)
  return response.data
}

const deleteRecipe = async (recipeId: string) => {
  const response = await axios.delete(`recipe/${recipeId}`)
  return response.data
}

export default {
  defaults: {
    setBaseUrl,
    setAuthHeader,
  },
  auth: {
    get: {
      authToken: getAuthToken,
    },
  },
  user: {
    get: getUser,
  },
  recipe: {
    get: getRecipes,
    put: putRecipe,
    post: postRecipe,
    delete: deleteRecipe,
  },
}
