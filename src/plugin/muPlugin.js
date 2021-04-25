import { generateCodeFrame } from 'vue-template-compiler'
import { get, post } from '../utils/request'
export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        $get(url, params) {
          return get(url, params)
        },
        $post(url, params) {
          return post(url, params)
        }
      }
    })
  }
}
