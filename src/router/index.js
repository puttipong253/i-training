import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Admin from '../views/Admin'
import Page from '../views/FormInput'
import Track from '../views/FormTrack'
import Login from '../views/Login'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin-industry',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/page',
    name: 'Page',
    component: Page
  },
  {
    path: '/track',
    name: 'Track',
    component: Track
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
