<template>
  <div>
      <h1>suspense异步组件</h1>
      <Suspense>
          <template #default>
              <div>
                <com-1 />
                <com-2 />
              </div>              
          </template>
          <template #fallback>loading....</template>
      </Suspense>
      <p>报错{{error}}</p>
  </div>
</template>

<script lang="ts">
import com1 from './suspense-1.vue'
import com2 from './suspense-2.vue'
import { defineComponent, onErrorCaptured,ref } from "vue";

export default defineComponent({
    components: {
        com1,
        com2
    },
    setup() {
        const error = ref(null)
        onErrorCaptured((e: any) => {
            error.value = e
            return true
        })
        return {
            error
        }
    }
})
</script>

<style>

</style>