<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
    <!-- <div :ref="divsss">获取DOM元素</div>
    <div ref="div1">获取DOM元素</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, nextTick } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunciton = (file: File) => boolean
export default defineComponent({
  name: 'Uploader',
  props: {
    // upload url
    action: {
      type: String,
      required: true
    },
    beforeUpload: { // 自己的验证函数
      type: Function as PropType<CheckFunciton>
    },
    uploaded: { // 数据
      type: Object
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    // const div1 = ref<null | HTMLDivElement>(null)
    // 这种找方式需要用到两个变量
    // let myRef: any = ''
    // const divsss = (el: any) => {
    //   myRef = el
    // }
    // nextTick(() => {
    //   console.log(fileInput.value)
    //   console.log('>>>>>>>>>>>>>>>', myRef)
    //   console.log('11111111111111', div1.value)
    // })
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const uploadedData = ref(props.uploaded)
    watch(() => props.uploaded, (newVal) => {
      if (newVal) {
        fileStatus.value = 'success'
        uploadedData.value = newVal
      }
    })
    // 代理的点击事件
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        // 验证
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return false
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          fileStatus.value = 'success'
          uploadedData.value = res.data
          context.emit('file-uploaded', res.data)
        }).catch(error => {
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', { error })
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }

    return {
      // divsss,
      // div1,
      fileInput,
      triggerUpload,
      fileStatus,
      uploadedData,
      handleFileChange
    }
  }
})
</script>

<style>

</style>
