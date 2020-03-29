<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          This application using <b-badge variant="primary">api/v1</b-badge> of centra-cbt
        </div>
        <div class="card-body">
          <table class="table">
            <tr>
              <td>Generate nilai ujian</td>
              <td></td>
              <td>
                <b-button variant="primary" size="sm" :disabled="isLoading" @click="generateUjian">Generate</b-button>
              </td>
            </tr>
            <tr>
              <td>Anlys soal</td>
              <td></td>
              <td>
                <b-button variant="info" size="sm" :disabled="isLoading">Release analys</b-button>
              </td>
            </tr>
          </table>
        </div>
        <div class="card-footer">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Heager',
    computed: {
      ...mapGetters(['isLoading'])
    },
    methods: {
      ...mapActions('heager', ['generateHasilUjian']),
      generateUjian() {
        this.$swal({
          title: 'Informasi',
          text: "Tindakan ini membutuhkan resource besar, pastikan server sedang kosong",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#c3c3c3',
          confirmButtonText: 'Iya, Lanjutkan!'
        }).then((result) => {
          if (result.value) {
            this.generateHasilUjian()
            .then(() => {
              this.notifSuccess('Generate hasil ujian berhasil')
            })
            .catch(() => {
              this.notifError()
            })
          }
        })
      },
      notifSuccess(msg) {
        this.$notify({
          group: 'foo',
          title: 'Sukses',
          type: 'success',
          text: msg
        })
      },
      notifError() {
        this.$notify({
          group: 'foo',
          title: 'Error',
          type: 'error',
          text: 'Terjadi kesalahan'
        })
      }
    }
  }
</script>