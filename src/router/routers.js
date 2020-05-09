import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/home"
import Detail from "@/views/detail"

Vue.use(VueRouter)

export const ConstantRouters = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },
  {
    path: '/404',
    component: () => import('@/views/features/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/features/401'),
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: ConstantRouters
})

export default router
