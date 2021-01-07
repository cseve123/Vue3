import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import Login from './views/Login.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
import store from './store'
import axios from 'axios'
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
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/login',
      name: 'loign',
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: {
        requiredLogin: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        redirectAlreadyLogin: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 1 是否登录 isLogin
  // 是 redirectAlreadyLogin 是 next() 否 next('/')
  // 否
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch((e: any) => {
        console.error(e)
        store.commit('logout')
        next('/login')
      })
    } else {
      if (requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  } else {
    // 有登录进到登录和注册跳到/ 其他正常登录
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router
