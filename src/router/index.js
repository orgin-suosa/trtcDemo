import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/login.vue'
import TRTCRoom from '../components/trtc.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login

  },
  {
    path: '/trtc',
    name: 'TRTCRoom',
    component: TRTCRoom

  },
  
]

const router = new VueRouter({
  routes
})

export default router
