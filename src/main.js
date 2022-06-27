import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// 引入工具类
import utils from '@/utils/utils'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.utils = utils

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
