import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Results.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/match',
    name: 'Match',
    component: Home,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/:platform/:user',
    name: 'Profile',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
