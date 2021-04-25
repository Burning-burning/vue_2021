import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 注册MyPlugin插件
import myPlugin from './muPlugin'
Vue.use(ElementUI)
Vue.use(myPlugin)
