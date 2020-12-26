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
  </div>
</template>

<script lang="ts">
import com1 from './suspense-1.vue'
import com2 from './suspense-2.vue'
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        com1,
        com2
    }
})
</script>

<style>

</style>