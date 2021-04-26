import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import('@v/Login.vue')
const Layout = () => import('@v/Layout.vue')
const Index = () => import('@v/Index.vue')
const Role = () => import('@v/role/Role.vue')
const Error = () => import('@v/Error.vue')
const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: '/',
        redirect: 'role'
      },
      {
        path: 'role',
        component: Role
      }
    ]
  },
  {
    path: '*',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
