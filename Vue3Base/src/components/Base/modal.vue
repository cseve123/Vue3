<template>
<teleport to="#modal">
    <div id="center" v-if="isOpen">
        <h2><slot>this is a modal</slot></h2>
        <button @click="btnEmit">close</button>
    </div>
</teleport>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: Boolean
  },
  // 给emit增加验证
  emits: {
    'closeModal': data => {
      console.log('验证', data)
      return true
    }
  },
  setup(props, context) {
    const btnEmit = () => {
      context.emit('closeModal', 1111)
    }
    return {
      btnEmit
    }
  }
});
</script>

<style>
#center {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: fixed;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  background: #fff;
}
</style>