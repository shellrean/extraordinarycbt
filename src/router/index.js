import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

const Home = () => import('../views/Home')
const Login = () => import('../views/Login')

import SekolahIndex from '../views/sekolah/Index.vue'
const DataSekolah = () => import('../views/sekolah/Sekolah.vue')
const AddSekolah = () => import('../views/sekolah/Add.vue')
const EditSekolah = () => import('../views/sekolah/Edit.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/sekolah',
    component: SekolahIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'sekolah.data',
        component: DataSekolah,
        meta: { title: 'Manage sekolah' }
      },
      {
        path: 'add',
        name: 'sekolah.add',
        component: AddSekolah,
        meta: { title: 'Tambah sekolah' }
      },
      {
        path: 'edit/:id',
        name: 'sekolah.edit',
        component: EditSekolah,
        meta: { title: 'Edit sekolah' }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from , next) => {
  store.commit('CLEAR_ERRORS')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth
    if (!auth) {
      store.commit('LOADING_PAGE', true)
      next({ name: 'login' })
    }
    else {
      store.commit('LOADING_PAGE', true)
      next()
    }
  }
  else {
    store.commit('LOADING_PAGE', true)
    next()
  }
})


router.afterEach(() => {
  store.commit('LOADING_PAGE', false)
})

export default router