import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import WeightliftingWorkouts from '@/components/WeightliftingWorkouts'
import AddWLWorkout from '@/components/AddWLWorkout'
import SwimmingWorkouts from '@/components/SwimmingWorkouts'
import AddSwimmingWorkout from '@/components/AddSwimmingWorkout'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/weightlifting-workouts',
      name: 'WeightliftingWorkouts',
      component: WeightliftingWorkouts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/weightlifting-workouts/add-workout',
      name: 'AddWLWorkout',
      component: AddWLWorkout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/swimming-workouts',
      name: 'SwimmingWorkouts',
      component: SwimmingWorkouts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/swimming-workouts/add-workout',
      name: 'AddSwimmingWorkout',
      component: AddSwimmingWorkout,
      meta: {
        requiresAuth: true
      }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (to.matched.some(rec => rec.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;