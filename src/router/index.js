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
const KartuPeserta = () => import('../views/peserta/Kartu.vue')

import BanksoalIndex from '../views/banksoal/Index.vue'
const DataBanksoal = () => import('../views/banksoal/DataBanksoal.vue')
const SoalBanksoal = () => import('../views/banksoal/SoalBanksoal.vue')
const SoalBanksoalTambah = () => import('../views/banksoal/SoalBanksoalTambah.vue')
const SoalBanksoalEdit = () => import('../views/banksoal/SoalBanksoalEdit.vue')
const SoalBanksoalPrev = () => import('../views/banksoal/SoalBanksoalPrev.vue')

import UjianIndex from '../views/ujian/Index.vue'
const DataUjian = () => import('../views/ujian/Ujian.vue')

import HasilIndex from '../views/hasil/Index.vue'
const DataHasil = () => import('../views/hasil/Hasil.vue')

import KoreksiIndex from '../views/koreksi/Index.vue'
const KoreksiUjian = () => import('../views/koreksi/KoreksiUjian.vue')
const KoreksiEsay = () => import('../views/koreksi/KoreksiEsay.vue')

import FilemediaIndex from '../views/filemedia/Index.vue'
const DataFilemedia = () => import('../views/filemedia/Filemedia.vue')
const DataDirFilemedia = () => import('../views/filemedia/DirFilemedia.vue')

import SettingIndex from '../views/setting/Index.vue'
const SetPermission = () => import('../views/setting/SetPermission')

import HeagerIndex from '../views/heager/Index.vue'
const HeagerDashboard = () => import('../views/heager/Dashboard.vue')

import AnalysIndex from '../views/analys/Index.vue'
const AnalysBanksoal = () => import('../views/analys/Banksoal.vue')
const AnalysBanksoalSoal = () => import('../views/analys/SoalBanksoal.vue')
const AnalysSiswa = () => import('../views/analys/Siswa.vue')
const AnalysCapaian = () => import('../views/analys/CapaianSiswa.vue')

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
      },
      {
        path: 'kartu/:id',
        name: 'peserta.kartu',
        component: KartuPeserta,
        meta: { title: 'Kartu peserta' }
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
    path: '/filemedia',
    component: FilemediaIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'filemedia.data',
        component: DataFilemedia,
        meta: { title: 'Manage filemedia' }
      },
      {
        path: '/filemedia/directory/:directory_id',
        name: 'filemedia.directory',
        component: DataDirFilemedia,
        meta: { title: 'Manage directory filemedia' }
      }
    ]
  },
  {
    path: '/hasil',
    component: HasilIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'ujian',
        name: 'hasil.ujian',
        component: DataHasil,
        meta: { title: 'Hasil ujian' }
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
  {
    path: '/heager',
    component: HeagerIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'heager.dashboard',
        component: HeagerDashboard,
        meta: { title: 'Heager Actions only super administrator' }
      }
    ]
  },
  {
    path: '/analys',
    component: AnalysIndex,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'banksoal',
        name: 'analys.banksoal',
        component: AnalysBanksoal,
        meta: { title: 'Banksoal analys' }
      },
      {
        path: 'banksoal/:banksoal_id',
        name: 'analys.banksoal_soal',
        component: AnalysBanksoalSoal,
        meta: { title: 'Banksoal analys' }
      },
      {
        path: 'siswa',
        name: 'analys.siswa',
        component: AnalysSiswa,
        meta: { title: 'Capaian siswa analys' }
      },
      {
        path: 'siswa/sekolah/:sekolah_id/banksoal/:banksoal_id/jadwal/:jadwal_id',
        name: 'analys.capaian',
        component: AnalysCapaian,
        meta: { title: 'Capaian siswa banksoal' }
      }
    ]
  }
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
  store.commit('SET_LOADING', false)
})

export default router