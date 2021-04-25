<template>
  <div class="main">
    <div class="login">
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginFormRules"
        size="mini"
        ref="loginFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="loginId">
          <el-input v-model="loginForm.loginId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="loginPwd">
          <el-input
            type="password"
            v-model="loginForm.loginPwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { strToMd5 } from '../utils/md5'
export default {
  data() {
    var validateloginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateloginId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        loginId: '',
        loginPwd: ''
      },
      loginFormRules: {
        loginPwd: [{ validator: validateloginPwd, trigger: 'blur' }],
        loginId: [{ validator: validateloginId, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          this.loginForm.loginPwd = strToMd5(this.loginForm.loginPwd)
          const res = await this.$get('/Admin/Login', this.loginForm)
          console.log(res)
          if (res.success) {
            console.log(res)
            sessionStorage.setItem('token', res.token)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .login {
    width: 460px;
    height: 220px;
    border: 1px solid #ccc;
  }
}
</style>
