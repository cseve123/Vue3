<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean

export const emitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      // every执行一个会停止，需要用map来运行一遍
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callBack = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    // TODO: mitt编译不过去，导致获取不到全局
    // emitter.on('form-item-created', callBack)
    onUnmounted(() => {
      // emitter.off('form-item-created', callBack)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>

<style>

</style>
