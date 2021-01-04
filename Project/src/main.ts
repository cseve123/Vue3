import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import axios from 'axios'
// 请求成功
axios.get('/api/columns', {
  params: {
    currentPage: 1,
    pageSize: 6
  }
}).then(res => {
  console.log(res)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
