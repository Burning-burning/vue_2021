import { generateCodeFrame } from 'vue-template-compiler'
import { get, post, setToken } from '../utils/request'
export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        $get(url, params) {
          return get(url, params)
        },
        $post(url, params) {
          return post(url, params)
        },
        $setToken() {
          return setToken()
        },
        $msg_s(message, duration = 3000) {
          this.$message({
            showClose: true,
            message,
            duration,
            type: 'success'
          })
        },
        $msg_w(message, duration = 3000) {
          this.$message({
            showClose: true,
            message,
            duration,
            type: 'warning'
          })
        },
        $msg_e(message, duration = 3000) {
          this.$message({
            showClose: true,
            message,
            duration,
            type: 'error'
          })
        }
      }
    })
  }
}
