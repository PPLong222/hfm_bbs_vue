import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostEdit from "@/views/post/PostEdit";
import PostDetail from "@/views/post/PostDetail";
import SearchResultView from "@/views/page/SearchResultView";
import PersonalCenter from "@/views/user/PersonalEditor";
import PersonalEditor from "@/views/user/PersonalEditor";
import PersonalInfo from "@/views/user/PersonalInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // redirect: "/index"
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
    path: '/posts',
    name: 'Posts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/post/Posts.vue')
  },
  {
    path: '/post/add',// 注意放在 path: '/post/:postId'之前，否则会匹配重复
    name: 'PostAdd',
    // meta: {
    //   requireAuth: true//带有meta：requireAuth: true说明是需要登录字后才能访问的受限资源
    // },
    component: PostEdit
  },
  {
    path: '/post/:postId/edit',
    name: 'PostEdit',
    // meta: {
    //   requireAuth: true//带有meta：requireAuth: true说明是需要登录字后才能访问的受限资源
    // },
    component: PostEdit
  },
  {
    path: '/search/:words',
    name: 'Search',
    // meta: {
    //   requireAuth: true//带有meta：requireAuth: true说明是需要登录字后才能访问的受限资源
    // },
    component: SearchResultView
  },
  {
    path: '/post/view/:id',
    component: PostDetail
  },
  {
    path: '/person/info',
    component: PersonalInfo
  },
  {
    path: '/person/editor',
    component: PersonalEditor
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
