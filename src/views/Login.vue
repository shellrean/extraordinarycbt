<template>
  <div class="container-fluid">
    <div class="row" style="height: 100vh">
      <div class="col-md-6">
        <img src="/img/bg.svg" style="width: 100%;">
      </div> 
      <div class="col-md-6 bg-white" style="height: 100vh;">
        <div style="position: absolute;top: 30%; transform: translateY(-30%)">
          <div >
            <h4>Extraordinary-CBT Login</h4>
          </div>
          <div>
            <div class="alert alert-danger" v-if="errors.invalid">{{ errors.invalid }}</div>
            <p class="text-muted">Selamat datang di aplikasi Extraordinary-CBT. Masukkan username dan password</p>
            <form @submit.prevent="postLogin">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="cil-mood-good"></i>
                </span>
              </div>
              <input class="form-control" :class="{ 'is-invalid' : errors.username }" type="username" placeholder="Username" v-model="data.username">
              <div class="invalid-feedback" v-if="errors.username">{{ errors.username[0] }}</div>
            </div>
            <div class="input-group mb-4">
              <div class="input-group-prepend ">
                <span class="input-group-text ">
                  <i class="cil-lock-locked"></i>
                </span>
              </div>
              <input class="form-control" :class="{ 'is-invalid' : errors.password }" type="password" placeholder="Password" v-model="data.password">
              <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }} </div>
            </div>
            <b-button variant="dark" :disabled="isLoading" type="submit">
              <b-spinner small type="grow" v-show="isLoading"></b-spinner>
              Login
            </b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom text-center text-muted bg-secondary"><a>Extraordinary-CBT</a> {{ version ? version : '' }} &copy; 2020 shellrean.</div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      data: {
        username: '',
        password: ''
      },
      version: process.env.VUE_APP_VERSION
    }
  },
  created() {
    if (this.isAuth) {
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    ...mapGetters(['isAuth','isLoading']),
    ...mapState(['errors'])
  },
  methods: {
    ...mapActions('auth', ['submit']),
    ...mapActions('user',['getUserLogin']),
    postLogin() {
      this.submit(this.data)
      .then( () => {
        if (this.isAuth) {
          this.$router.push({ name: 'home' })
        }
      })
      .catch(() => {
        this.$notify({
          group: 'foo',
          title: 'Error',
          type: 'error',
          text: 'Terjadi kesalahan.'
        })
      })
    }
  },
  destroyed() {
    this.getUserLogin()
  }
}
</script>