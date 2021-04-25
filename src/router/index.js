import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import('@v/Login.vue')
const routes = [
  {
    path: '/',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
