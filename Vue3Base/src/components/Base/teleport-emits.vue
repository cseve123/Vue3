<template>
  <div>
      <h1>teleport 和 emits功能</h1>
      <modal :isOpen="isOpen" @close-modal="closeModal">自定义内容</modal>
      <button @click="openModal">打开modal</button>
  </div>
</template>

<script lang="ts">
import {
    ref, 
    defineComponent, 
    isProxy} from "vue"
import modal from "./modal.vue"
export default defineComponent({
    components: { modal },
    setup(){
        const isOpen = ref(false)
        const openModal = () => {
            console.log('openModal')
            isOpen.value = true
        }
        const closeModal = (data) => {
            console.log('closeModal', data)
            isOpen.value = false
        }
        return {
            isOpen,
            openModal,
            closeModal
        }
    }
})
</script>

<style>

</style>