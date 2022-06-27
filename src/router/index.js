import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogEdit from "@/views/blog/BlogEdit";
import BlogDetail from "@/views/blog/BlogDetail";
import Blogs from "@/views/blog/Blogs";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('@/views/login/LoginView')
  },
  {
    path: '/signup',
    name: '/signup',
    component: () => import('@/views/login/SignUpView')
  },
  {
    path: '/signup/emailConfirm',
    name: '/signup/emailConfirm',
    component: () => import('@/views/login/EmailConfirmVue')
  },
  {
    path: '/index',
    name: '/index',
    component: () => import('@/views/page/IndexView')

  },
  {
    path: '/blogs',
    name: 'Blogs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/blog/Blogs.vue')
  },
  {
    path: '/blog/add',// 注意放在 path: '/blog/:blogId'之前，否则会匹配重复
    name: 'BlogAdd',
    // meta: {
    //   requireAuth: true//带有meta：requireAuth: true说明是需要登录字后才能访问的受限资源
    // },
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    // meta: {
    //   requireAuth: true//带有meta：requireAuth: true说明是需要登录字后才能访问的受限资源
    // },
    component: BlogEdit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
