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

// 路由拦截重定向处理
let routerWhiteList = ['/', '/login', '/signup', '/signup/emailConfirm', '/about', '/index']
router.beforeEach((to, from, next) => {
    console.log(from.path)
    console.log(to.path)
    // 判断用户是否登录, 此处暂时用浏览器Cookie的ExpireAt
    let token = utils.getCookieByName("token")
    let expireAt = utils.getCookieByName("expireAt")

    // 如果在路由白名单中则放行, 并且可能还要传一些用户变量
    // 这里的判断可能还需要正则表达式来确定, 暂时先用列表判断
    if (routerWhiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        // 没在白名单中
        // 用户是登录状态
        if (!utils.isNullOrNil(expireAt) && !utils.isNullOrNil(token)) {
            // 如果登录状态过期
            if (new Date() >= expireAt) {
                next('/login')
                // 如果没过期, 则正常放行
            } else {
                next()
            }
        } else {
            // 用户不是登录状态,跳转到login
            next('/login')
        }
    }
    next()
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

