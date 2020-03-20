<template>
	   <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
      <div class="c-sidebar-brand"><img class="c-sidebar-brand-full" src="/img/brand/dki.png" height="46" alt="CoreUI Logo"><img class="c-sidebar-brand-minimized" src="/img/brand/dki.png" height="46" alt="Logo"></div>
      <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
          <router-link class="c-sidebar-nav-link" to="/">
            <i class="c-sidebar-nav-icon cil-speedometer"></i>
            Dashboard
          </router-link>
        </li>
        <li class="c-sidebar-nav-title">Menu utama</li>
        <li class="c-sidebar-nav-item" v-if="!$role('school')" >
          <router-link class="c-sidebar-nav-link" :to="{ name: 'sekolah.data' }">
            <i class="c-sidebar-nav-icon cil-building"></i> Sekolah
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" v-if="$can('server')">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'server.data' }">
            <i class="c-sidebar-nav-icon cil-storage"></i>  Server lokal
          </router-link>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown">
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#"  v-if="$can('akademik')">
            <i class="c-sidebar-nav-icon cil-layers"></i> Data master
          </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item" v-if="$can('peserta')">
              <router-link class="c-sidebar-nav-link" to="/peserta">
                <span class="c-sidebar-nav-icon"></span> Peserta
              </router-link>
            </li>

            <li class="c-sidebar-nav-item" v-if="$can('matpel')">
              <router-link class="c-sidebar-nav-link" to="/matpel"> <span class="c-sidebar-nav-icon"></span> Matpel</router-link>
            </li>
          </ul>
        </li>
        <li class="c-sidebar-nav-item" v-if="$can('soal')">
          <router-link class="c-sidebar-nav-link" to="/banksoal">
            <i class="c-sidebar-nav-icon cil-briefcase"></i>Banksoal
          </router-link>
        </li>
        <li class="c-sidebar-nav-item c-sidebar-nav-dropdown" v-if="$can('jadwal')" >
          <a class="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle" href="#">
            <i class="c-sidebar-nav-icon cil-notes"></i>Ujian
          </a>
          <ul class="c-sidebar-nav-dropdown-items">
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.data' }">
                <span class="c-sidebar-nav-icon"></span> Jadwal
              </router-link>
            </li>
            <li class="c-sidebar-nav-item">
              <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.hasil' }">
                <span class="c-sidebar-nav-icon"></span> Hasil ujian
              </router-link>
            </li>
          </ul>
        </li>
        <li class="c-sidebar-nav-item" v-if="$can('koreksi_esay')">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'ujian.koreksi' }">
            <i class="c-sidebar-nav-icon cil-task"></i> Koreksi esay
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" v-if="$can('filemedia')">
          <router-link class="c-sidebar-nav-link" to="/filemedia">
            <i class="c-sidebar-nav-icon cil-folder"></i>File media
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" v-if="$can('setting')">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'role.permissions' }">
            <i class="c-sidebar-nav-icon cil-snowflake"></i>Setting role
          </router-link>
        </li>
        <li class="c-sidebar-nav-item" v-if="$role('school')">
          <router-link class="c-sidebar-nav-link" :to="{ name: 'hasil-ujian' }">
            <i class="c-sidebar-nav-icon cil-chart"></i>Hasil Ujian
          </router-link>
        </li>
      </ul>
      <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('user', {
      authenticated: state => state.authenticated
    })
  },
  methods: {
      logout() { 
        return new Promise((resolve, reject) => {
            this.loggedOut()
            localStorage.removeItem('token')
            resolve()
        }).then(() => {
            this.$store.state.token = localStorage.getItem('token')
            this.$router.push('/login')
        })
      }
    },
}
</script>