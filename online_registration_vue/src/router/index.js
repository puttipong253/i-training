import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Admin from '../views/Admin'
import Page from '../components/Page'
import Hotel from '../components/Page/FormHotel'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/page',
    name: 'Page',
    component: Page
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
