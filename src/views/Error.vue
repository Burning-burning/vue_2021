<template>
  <div class="error">
    <img src="../../public/img/404/error.jpg" @click="goToHome" />
  </div>
</template>
<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/layout')
    }
  }
}
</script>
<style>
.error {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
