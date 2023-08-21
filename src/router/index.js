import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Employees from '@/views/Employees.vue'
import Areas from '@/views/Areas.vue'
import Types from '@/views/Types.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/areas',
    name: 'Areas',
    component: Areas
  },
  {
    path: '/types',
    name: 'Types',
    component: Types
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
