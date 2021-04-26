<template>
  <div class="main">
    <!-- 背景画布 -->
    <canvas id="particle-canvas" width="864" height="937"></canvas>
    <div class="login">
      <div class="title">Bing酒店管理系统</div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginFormRules"
        size="mini"
        ref="loginFormRef"
        label-width="40px"
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
        <el-form-item prop="checkMe">
          <el-checkbox v-model="loginForm.checkMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { strToMd5 } from '../utils/md5'
import { start } from '../assets/js/login'
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
        loginPwd: '',
        checkMe: false
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
          if (!res.success) {
            sessionStorage.setItem('token', res.token)
            // 在浏览器中保存登录名
            localStorage.setItem('loginId', this.loginForm.loginId)
            if (this.loginForm.checkMe) {
              localStorage.setItem('loginPwd', this.loginForm.loginPwd)
            }
            // 将token信息放到请求头中
            this.$setToken()
            this.$router.push('/layout')
          } else {
            this.$msg_e('登录名不存在', 1000)
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    }
  },
  mounted() {
    start()
  }
}
</script>
<style lang="less" scoped>
#particle-canvas {
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgb(10, 10, 50) 0%,
    rgb(60, 10, 60) 100%
  );
  vertical-align: middle;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  font-family: 'gjm';
  .login {
    width: 440px;
    border: 1px solid #ccc;
    position: absolute;
    z-index: 999;
    padding: 20px;
    border-radius: 5px;
    .title {
      font-size: 18px;
      color: white;
      text-align: center;
      margin-bottom: 10px;
    }
  }
}
</style>
