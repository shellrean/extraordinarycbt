import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

const Home = () => import('../views/Home')
const Login = () => import('../views/Login')

import SekolahIndex from '../views/sekolah/Index.vue'
const DataSekolah = () => import('../views/sekolah/Sekolah.vue')
const AddSekolah = () => import('../views/sekolah/Add.vue')
const EditSekolah = () => import('../views/sekolah/Edit.vue')

import ServerIndex from '../views/server/Index.vue'
const DataServer = () => import('../views/server/Server.vue')
const AddServer = () => import('../views/server/Add.vue')

import MatpelIndex from '../views/matpel/Index.vue'
const DataMatpel = () => import('../views/matpel/Matpel.vue')
const AddMatpel = () => import('../views/matpel/Add.vue')
const EditMatpel = () => import('../views/matpel/Edit.vue')

import PesertaIndex from '../views/peserta/Index.vue'
const DataPeserta = () => import('../views/peserta/Peserta.vue')
const AddPeserta = () => import('../views/peserta/Add.vue')
const UploadPeserta = () => import('../views/peserta/Upload.vue')

import BanksoalIndex from '../views/banksoal/Index.vue'
const DataBanksoal = () => import('../views/banksoal/DataBanksoal.vue')
const SoalBanksoal = () => import('../views/banksoal/SoalBanksoal.vue')
const SoalBanksoalTambah = () => import('../views/banksoal/SoalBanksoalTambah.vue')
const SoalBanksoalEdit = () => import('../views/banksoal/SoalBanksoalEdit.vue')
const SoalBanksoalPrev = () => import('../views/banksoal/SoalBanksoalPrev.vue')

import UjianIndex from '../views/ujian/Index.vue'
const DataUjian = () => import('../views/ujian/Ujian.vue')

import KoreksiIndex from '../views/koreksi/Index.vue'
const KoreksiUjian = () => import('../views/koreksi/KoreksiUjian.vue')
const KoreksiEsay = () => import('../views/koreksi/KoreksiEsay.vue')

import SettingIndex from '../views/setting/Index.vue'
const SetPermission = () => import('../views/setting/SetPermission')

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
  {
    path: '/server',
    component: ServerIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'server.data',
        component: DataServer,
        meta: { title: 'Manage server' }
      },
      {
        path: 'add',
        name: 'server.add',
        component: AddServer,
        meta: { title: 'Tambah server' }
      }
    ]
  },
  {
    path: '/matpel',
    component: MatpelIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'matpel.data',
        component: DataMatpel,
        meta: { title: 'Manage mata pelajaran' }
      },
      {
        path: 'add',
        name: 'matpel.add',
        component: AddMatpel,
        meta: { title: 'Tambah mata pelajara' }
      },
      {
        path: 'edit/:id',
        name: 'matpel.edit',
        component: EditMatpel,
        meta: { title: 'Edit mata pelajaran' }
      }
    ]
  },
  {
    path: '/peserta',
    component: PesertaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'peserta.data',
        component: DataPeserta,
        meta: { title: 'Manage peserta' }
      },
      {
        path: 'add',
        name: 'peserta.add',
        component: AddPeserta,
        meta: { title: 'Tambah peserta' }
      },
      {
        path: 'upload',
        name: 'peserta.upload',
        component: UploadPeserta,
        meta: { title: 'Upload peserta' }
      }
    ]
  },
  {
    path: '/banksoal',
    component: BanksoalIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'banksoal.data',
        component: DataBanksoal,
        meta: { title: 'Manage banksoal' }
      },
      {
        path: 'soal/:banksoal_id',
        name: 'banksoal.soal',
        component: SoalBanksoal,
        meta: { title: 'Manage soal' }
      },
      {
        path: 'soal/:banksoal_id/tambah',
        name: 'banksoal.soal.tambah',
        component: SoalBanksoalTambah,
        meta: { title: 'Tambah soal' }
      },
      {
        path: 'soal/:banksoal_id/:soal_id',
        name: 'banksoal.soal.edit',
        component : SoalBanksoalEdit,
        meta: { title: 'Edit soal' }
      },
      {
        path: 'prev/:banksoal_id',
        name: 'banksoal.prev',
        component: SoalBanksoalPrev,
        meta: { title: 'Preview soal banksoal' }
      }
    ]
  },
  {
    path: '/ujian',
    component: UjianIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'ujian.data',
        component: DataUjian,
        meta: { title: 'Manage ujian' }
      }
    ]
  },
  {
    path: '/koreksi',
    component: KoreksiIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'ujian.koreksi',
        component: KoreksiUjian,
        meta: { title: 'Koreksi jawaban peserta' }
      },
      {
        path: 'esay/:banksoal',
        name: 'koreksi.esay',
        component: KoreksiEsay,
        meta: { title: 'Koreksi esay' }
      }
    ]
  },
  {
    path: '/setting',
    component: SettingIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'role-permission',
        name: 'role.permissions',
        component: SetPermission,
        meta: { title: 'Set Permissions' }
      },
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