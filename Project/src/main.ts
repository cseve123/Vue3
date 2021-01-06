import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import axios from 'axios'

// 请求成功
// 请求baseUrl
axios.defaults.baseURL = 'http://localhost:8080/api'
// 请求拦截
axios.interceptors.request.use((config) => {
  config.params = { ...config.params, code: 1 }
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use((config) => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

// axios.get('/columns').then(res => {
//   console.log(res)
// })

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
