<template>
  <div>
      <h1>{{result}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";

export default defineComponent({
    setup(){
        return new Promise((resolve) => {
            setTimeout(() => {
                return resolve({
                    result: 666
                })
            }, 3000)
        })
        
    }
})
</script>

<style>

</style>