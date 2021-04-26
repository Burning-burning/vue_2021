<template>
  <div class="main">
    <div class="left" :style="{ background: themeColor }">
      <div class="logo">Bing</div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :background-color="themeColor"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapsed"
        :style="{ width: isCollapsed ? 'auto' : '200px' }"
        :collapse-transition="false"
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/layout/role">角色管理</el-menu-item>
          <el-menu-item index="1-2">账号管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-office-building"></i>
            <span>客房管理</span>
          </template>
          <el-menu-item index="2-1">类型管理</el-menu-item>
          <el-menu-item index="2-2">客房管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>客户管理</span>
          </template>
          <el-menu-item index="3-1">客户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="4-1">权限管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <div class="nav" :style="{ background: themeColor }">
        <div class="icon" @click="handleCollpase">
          <i v-if="!isCollapsed" class="el-icon-s-fold"></i>
          <i v-else class="el-icon-s-unfold"></i>
        </div>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          :background-color="themeColor"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1"
            ><i class="el-icon-s-home"></i>Home</el-menu-item
          >
          <el-menu-item index="2"
            ><i class="el-icon-s-comment"></i>Message</el-menu-item
          >
          <el-menu-item index="3"
            ><i class="el-icon-message"></i>Email</el-menu-item
          >
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-help"></i>Theme</template>
            <el-menu-item
              @click="changeTheme(item.value)"
              v-for="(item, index) in theme"
              :key="index"
              >{{ item.name }}</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-user-solid"></i>{{ admin.name }}</template
            >
            <el-menu-item index="5-1">个人中心</el-menu-item>
            <el-menu-item index="5-2">修改密码</el-menu-item>
            <el-menu-item index="5-3" @click="exit">退出系统</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content"><router-view></router-view></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      themeColor: localStorage.getItem('themeColor') || '#101f30',
      isCollapsed: false
    }
  },
  created() {
    const loginId = localStorage.getItem('loginId')
    if (!loginId) {
      this.$router.push('/login')
    } else {
      const res = this.$get('/Admin/GetOne', { loginId }).then(res =>
        this.setAdmin(res)
      )
    }
  },
  computed: {
    ...mapState('theme', ['theme']),
    ...mapState('admin', ['admin'])
  },
  methods: {
    ...mapMutations('admin', ['setAdmin']),
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    changeTheme(color) {
      this.themeColor = color
      localStorage.setItem('themeColor', color)
    },
    handleCollpase() {
      this.isCollapsed = !this.isCollapsed
    },
    exit() {
      sessionStorage.clear()
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  .left {
    height: 100%;
    // background: #101f30;
    .logo {
      border: 1px solid white;
      width: 90%;
      text-align: center;
      margin: 10px auto;
      color: white;
      font-size: 18px;
      padding: 10px 0;
    }
  }
  .right {
    width: 100%;
    .nav {
      height: 60px;
      // background: #101f30;
      display: flex;
      justify-content: space-between;
      align-items: center;
      display: flex;
      .icon {
        color: white;
        font-size: 18px;
        margin-left: 5px;
      }
    }
    .content {
      padding: 20px;
    }
  }
}
</style>
