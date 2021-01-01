<template>
  <div>
    <!-- project -->
    <div class="container">
      <global-header :user="user"></global-header>
      <router-view></router-view>
      <global-footer></global-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'

const userData: UserProps = {
  isLogin: true,
  id: 1,
  name: 'kk'
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter
  },
  setup () {
    return {
      user: userData
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
