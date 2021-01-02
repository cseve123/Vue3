<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <ValidateInput
        :rules="emailRules"
        v-model="emailval"
        type="text"
        placeholder="请输入邮箱"
        id="exampleInputEmail1"
      />
      {{ emailval }}
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <ValidateInput
        :rules="emailRules"
        v-model="emailval"
        type="password"
        placeholder="请输入密码"
        id="exampleInputPassword1"
      />
    </div>
    <!-- v-slot:name 可以写成#name -->
    <template v-slot:submit>
      <span class="btn btn-danger">Submit</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const emailval = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ig
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid email'
      } else {
        emailRef.error = false
        emailRef.message = ''
      }
    }
    const onFormSubmit = (result: boolean) => {
      console.log('form', result)
      if (result) {
        router.push({
          path: '/'
        })
        store.commit('login')
      }
    }
    return {
      emailRef,
      validateEmail,
      emailRules,
      emailval,
      onFormSubmit
    }
  }
})
</script>

<style>
</style>
