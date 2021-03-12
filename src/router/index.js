import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Cities',
    component: () => import('../views/Cities.vue')
  },
  {
    path: '/weather/:city',
    name: 'Weather',
    component: () => import('../views/Weather.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
