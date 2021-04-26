import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { BASE_URL } from '../config/index'
// 初始化一个axios对象
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    NProgress.start()
    return config
  },
  function(error) {
    // 对请求错误做些什么
    NProgress.done()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    NProgress.done()

    return response
  },
  function(error) {
    // 对响应错误做点什么
    NProgress.done()
    return Promise.reject(error)
  }
)
// 创建一个get请求方法
const get = async function(url, params) {
  const { data } = await instance.get(url, { params })
  return data
}
// 创建一个post方法
const post = async function(url, params) {
  const { data } = await instance.post(url, params)
  return data
}
// 创建一个token信息保存到请求头的方法
const setToken = function() {
  /* eslint-disable */
  instance.defaults.headers.common['token'] = sessionStorage.getItem('token')
}

export { get, post, setToken }
