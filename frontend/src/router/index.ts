import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/Recipes/RecipeView.vue'
import EditRecipeViewVue from '../views/Recipes/EditRecipeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/my-recipes',
      name: 'my-recipes',
      component: RecipeView,
    },
    {
      path: '/edit-recipe',
      name: 'edit-recipe',
      component: EditRecipeViewVue,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue'),
    },
  ],
})

export default router
