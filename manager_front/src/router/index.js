import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/accueil'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },

    {
      path: '/home',
      name: 'home',
      component: Home
    },

    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
