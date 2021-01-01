import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import Login from './views/Login.vue'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/column/:id',
      name: 'columnDetail',
      component: ColumnDetail
    },
    {
      path: '/login',
      name: 'loign',
      component: Login
    }
  ]

})
export default router
