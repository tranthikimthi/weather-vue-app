import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    // path: '/',
    // name: 'AddCity',
    // component: () => import('../views/AddCity.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
