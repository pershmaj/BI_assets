import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AssetsPage from '@/views/AssetsPage/AssetsPage.vue'
import LoginPage from '@/views/LoginPage/LoginPage.vue'
import RegistrationPage from '@/views/RegistrationPage/RegistrationPage.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AssetsPage',
    component: AssetsPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/registration',
    name: 'RegisterPage',
    component: RegistrationPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if(!store.state.token && to.name !== 'LoginPage' && to.name !== 'RegisterPage') {
    next({ name: 'LoginPage' })
  } else {
    next()
  }
})

export default router
