<template>
  <div></div>
</template>
<script>
export default {
  async created() {
    const loginId = localStorage.getItem('loginId')
    const loginPwd = localStorage.getItem('loginPwd')
    if (!loginId || !loginPwd) {
      this.$router.push('/login')
    } else {
      const res = await this.$get('/Admin/Login', { loginId, loginPwd })
      if (!res.success) {
        sessionStorage.setItem('token', res.token)
        this.$setToken()
        this.$router.push('/layout')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
