<template>
  <div>
    <!-- project -->
    <div class="container">
      <global-header :user="user"></global-header>
      <loader text="拼命加载中..." background="rgba(0,0,0,.8)" v-if="isLoading"></loader>
      <router-view></router-view>
      <global-footer></global-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
// const userData: UserProps = {
//   isLogin: true,
//   id: 1,
//   name: 'kk'
// }

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter,
    Loader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      user,
      isLoading
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
