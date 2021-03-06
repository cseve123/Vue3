<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册者也账户</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          :rules="nameRules"
          v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="formData.password"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input
          type="password"
          placeholder="请再次密码"
          :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          注册新用户
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import axios from 'axios'
import createMessage from '../components/createMessage'
import { useRouter } from 'vue-router'
interface FormProps {
  email: string;
  nickName: string;
  password: string;
  repeatPassword: string;
}
export default defineComponent({
  name: 'Signup',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const router = useRouter()
    const formData = reactive<FormProps>({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '请输入邮箱'
      },
      {
        type: 'email',
        message: '请输入正确的邮箱格式'
      }
    ]
    const nameRules: RulesProp = [
      {
        type: 'required',
        message: '请输入昵称'
      }
    ]
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '请输入密码'
      }
    ]
    const repeatPasswordRules: RulesProp = [
      {
        type: 'required',
        message: '请再输入密码'
      },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不一致'
      }
    ]
    const onFormSubmit = (validate: boolean) => {
      if (validate) {
        const payload = {
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password
        }
        axios.post('/users/', payload).then(() => {
          createMessage('注册成功！2秒跳转', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      formData,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit
    }
  }
})
</script>

<style>
</style>
