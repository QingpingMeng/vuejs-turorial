import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from './theme/Category.vue'
import Login from './theme/Login.vue'
import NotFound from './theme/NotFound.vue'

// const Category = () => import('./theme/Category.vue')
// const Login = () => import('./theme/Login.vue')
// const NotFound = () => import('./theme/NotFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/category/front-end'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/category/:id',
      component: Category,
      name: 'category'
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 })
})

export default router
