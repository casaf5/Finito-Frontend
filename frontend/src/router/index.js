import Vue from 'vue'
import VueRouter from 'vue-router'
import landingPage from '../views/landing-page.vue'
import trellorApp from '../views/trellor-app.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Landing-Page',
    component: trellorApp
  },
  {
    path: '/cmps-check',
    // name: 'Landing-Page',
    component: landingPage
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
