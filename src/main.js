import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入工具类
import ElementUI from 'element-ui'
import utils from '@/utils/utils'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
//import "./axios"
//import "./permission"

//css导入
import "element-ui/lib/theme-chalk/index.css"
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';

// use
Vue.use(mavonEditor)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.utils = utils
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
