<template>
  <column-list :list="list"></column-list>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import ColumnList, { ColumnProps } from '../components/ColumnList.vue'
import { useRoute } from 'vue-router'
// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: 'test1的专栏',
//     description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: ''
//   },
//   {
//     id: 2,
//     title: 'test2的专栏',
//     description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   }
// ]
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    return {
      list
    }
  }
})
</script>

<style>

</style>
