import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/geo',
      name: '',
      component: () => import('../views/GeoView.vue')
    }
  ]
})

export default router
