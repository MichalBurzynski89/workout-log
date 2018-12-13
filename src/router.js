import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import WeightliftingWorkouts from '@/components/WeightliftingWorkouts'
import AddWLWorkout from '@/components/AddWLWorkout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/weightlifting-workouts',
      name: 'WeightliftingWorkouts',
      component: WeightliftingWorkouts
    },
    {
      path: '/weightlifting-workouts/add-workout',
      name: 'AddWLWorkout',
      component: AddWLWorkout
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
