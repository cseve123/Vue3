<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// defineComponent就是对ts的支持增强
export default defineComponent({
    name: 'ts',
    props: {
        msg: String
    },
    setup(props, context) {
        console.log(props.msg)
        
    }
})
</script>

<style>

</style>