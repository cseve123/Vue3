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
  return config
})
axios.interceptors.response.use((config) => {
  store.commit('setLoading', false)
  return config
})

// axios.get('/columns').then(res => {
//   console.log(res)
// })

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
