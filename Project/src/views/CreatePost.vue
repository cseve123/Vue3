<template>
  <div class="create-post-page">
    <h2>新建文章</h2>
    <uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      :uploaded="uploadedData"
      @file-uploaded="handleFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头像</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data.url">
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">
          发表文章
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { GlobalDataProps, PostProps } from '../store'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import Uploader from '../components/Uploader.vue'
export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    // const route = useRoute()
    const router = useRouter()
    const titleVal = ref('')
    const contentVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const onFormSubmit = (isValidate: boolean) => {
      if (isValidate) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: String(new Date().getTime()),
            title: titleVal.value,
            content: contentVal.value,
            column: `${column}`,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({
            name: 'column',
            params: {
              id: column
            }
          })
        }
      }
    }
    const uploadCheck = (file: File) => {
      // TODO 做验证
      console.log(file)
      return true
    }
    const handleFileUploade = () => {
      // TODO 上传

      return true
    }

    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      uploadCheck
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
