<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar.url" alt="avatar" class="rounded-circle border border-light w-25 my-3" />
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <!-- <router-link :to="{name: 'colunm', params: {id: column.id}}" class="btn btn-outline-primary">进入专栏</router-link> -->
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// PropType 解决props类型的泛型化，得到ts的提示加持
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../store'
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props, context) {
    // 因为定义了PropType指定类型
    // console.log(props.list[0]._id, context)

    // FIXME: 做默认图片
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          // column.avatar = require('@/assets/column.jpg')
          column.avatar = {
            url: require('@/assets/column.jpg')
          }
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style scoped>

</style>
