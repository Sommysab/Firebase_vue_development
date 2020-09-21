import { createRouter, createWebHistory } from 'vue-router'
import store from 'store-js'
// import Home from '../views/Home.vue'
// import HelloWorld from '@/components/HelloWorld'
import Dashboard from '../components/Dashboard'
import NewEmployee from '../components/NewEmployee'
import ViewEmployee from '../components/ViewEmployee'
import EditEmployee from '../components/EditEmployee'
import Login from '../components/Login'
import Register from '../components/Register'
import firebase from 'firebase'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/new',
    name: 'new-employee',
    component: NewEmployee,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:employee_id',
    name: 'edit-employee',
    component: EditEmployee,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:employee_id',
    name: 'view-employee',
    component: ViewEmployee,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    
    // Check if NOT logged in -
    
    if(!store.get('currentUser')){
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      // Proceed to route
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)) {
        
    // Check if NOT logged in
    
    if(store.get('currentUser')){
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      // Proceed to route
      next();
    }
  }else{
    // Proceed to route
    next()
  } 
})

export default router
