import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/login.vue')
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: () => import('../views/auth/redirect.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/upload/index.vue')
  },
  {
    path: '/lottie',
    name: 'Lottie',
    component: () => import('../views/lottie/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
