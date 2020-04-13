<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <b-button @click="$bvModal.show('modal-scoped')" v-if="$can('create_banksoal')" size="sm" variant="primary">Tambah banksoal</b-button>
                </div>
                <div class="card-body">
                     <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Banksoal</h4>
                            <div class="small text-muted">Buat hapus dan edit banksoal</div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-3">
                            <b-form-group
                              label="Filter"
                              label-cols-sm="3"
                              label-align-sm="right"
                              label-size="sm"
                              label-for="filterInput"
                            >
                              <b-input-group size="sm">
                                <b-form-input
                                  v-model="search"
                                  type="search"
                                  id="filterInput"
                                  placeholder="Cari kode banksoal"
                                ></b-form-input>
                                <b-input-group-append>
                                  <b-button :disabled="!search" @click="search = ''">Clear</b-button>
                                </b-input-group-append>
                              </b-input-group>
                            </b-form-group>
                            <b-form-group
                              label="Per page"
                              label-cols-sm="6"
                              label-cols-md="4"
                              label-cols-lg="3"
                              label-align-sm="right"
                              label-size="sm"
                              label-for="perPageSelect"
                            >
                              <b-form-select
                                v-model="perPage"
                                id="perPageSelect"
                                size="sm"
                                :options="pageOptions"
                              ></b-form-select>
                            </b-form-group>
                        </div>
                    </div>
                    <template v-if="banksoals && typeof banksoals.data != 'undefined'">
                        <b-table striped id="table-transition-example" primary-key="kode_banksoal" :tbody-transition-props="transProps" hover bordered small :fields="fields" :items="banksoals.data" show-empty>
                             <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                            </template>

                            <template v-slot:row-details="row">
                                <b-card>
                                    <table class="table table-borderless">
                                        <tr>
                                            <td width="150px">Pembuat</td><td v-text="row.item.user.name"></td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah PG</td><td v-text="row.item.jumlah_soal+' ('+row.item.jumlah_pilihan+' opsi )'"></td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah esay</td><td v-text="row.item.jumlah_soal_esay"></td>
                                        </tr>
                                        <tr>
                                            <td>Soal terinput</td><td v-text="row.item.inputed"></td>
                                        </tr>
                                    </table>
                                </b-card>
                            </template>
                           <template v-slot:cell(actions)="row">
                                <router-link v-if="$can('soal')" :to="{ name: 'banksoal.soal', params: {banksoal_id: row.item.id} }" class="btn btn-success btn-sm mr-1"><i class="cil-notes"></i> Soal</router-link>
                                <b-button class="mr-1" v-if="$can('edit_banksoal')" @click="getDataId(row.item.id)" size="sm" variant="warning" :disabled="isLoading"><i class="cil-pencil"></i> Edit</b-button>
                                <button :disabled="isLoading" v-if="$can('edit_banksoal')" class="btn btn-danger btn-sm" @click="deleteBanksoal(row.item.id)"><i class="cil-trash"></i> Hapus</button>
                            </template>
                        </b-table>
                        <div class="row">
                            <div class="col-md-6">
                                <p v-if="banksoals.data"><i class="fa fa-bars"></i> {{ banksoals.data.length }} item dari {{ banksoals.total }} total data</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="banksoals.total"
                                        :per-page="banksoals.per_page"
                                        :disabled="isLoading"
                                        ></b-pagination>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="text-center my-2">
                            Loading...
                        </div>
                    </template>
                </div> 
                <div class="card-footer"></div>
            </div>
        </div>
        <b-modal id="modal-scoped" size="md">
            <template v-slot:modal-header="{ close }">
              <h5>Tambah banksoal</h5>
            </template>
            <div class="form-group">
                <label>Mata pelajaran</label>
                <v-select label="nama" :options="matpels.data" v-model="data.matpel_id"></v-select>
                <p class="text-danger" v-if="errors.matpel_id">{{ errors.matpel_id[0] }}</p>
            </div>
            <div class="form-group">
                <label>Kode banksoal</label>
                <input type="text" class="form-control" :class="{ 'is-invalid' : errors.kode_banksoal }"  placeholder="Kode banksoal" v-model="data.kode_banksoal">
                <p class="text-danger" v-if="errors.kode_banksoal">{{ errors.kode_banksoal[0] }}</p>
            </div>
            <div class="form-group">
                <label>Jumlah soal pilihan ganda</label>
                <input type="number" class="form-control" :class="{ 'is-invalid' : errors.jumlah_soal }" v-model="data.jumlah_soal" placeholder="Jumlah soal pilihan ganda">
                <p class="text-danger" v-if="errors.jumlah_soal">{{ errors.jumlah_soal[0] }}</p>
            </div>
            <div class="form-group">
                <label>Jumlah soal esay</label>
                <input type="number" class="form-control" :class="{ 'is-invalid' : errors.jumlah_soal_esay }" v-model="data.jumlah_soal_esay" placeholder="Jumlah soal esay">
                <p class="text-danger" v-if="errors.jumlah_soal_esay">{{ errors.jumlah_soal_esay[0] }}</p>
            </div>
            <div class="form-group">
                <label>Jumlah opsi</label>
                <input type="number" class="form-control" :class="{ 'is-invalid' : errors.jumlah_pilihan }" v-model="data.jumlah_pilihan" placeholder="Jumlah opsi">
                <p class="text-danger" v-if="errors.jumlah_pilihan">{{ errors.jumlah_pilihan[0] }}</p>
            </div>
            <template v-slot:modal-footer="{ ok, cancel}">

              <b-button variant="primary" size="sm" :disabled="isLoading" @click="!update ? postBanksoal() : updateBanksoal()">
                    <b-spinner small type="grow" v-show="isLoading"></b-spinner> Simpan
                </b-button>
              <b-button variant="secondary" size="sm" @click="cancel()" :disabled="isLoading" >
                Cancel
              </b-button>
            </template>
        </b-modal>

    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import _ from 'lodash'

export default {
    name: 'DataBanksoal',
    components: {
        'v-select': vSelect
    },
    created() {
        this.getBanksoals({ perPage: this.perPage }).then(() => { this.isBusy = false })
        this.getAllMatpels()
    },
    data() {
        return {
            transProps: {
              name: 'flip-list'
            },
            fields: [
                { key: 'show_details', label: 'Detail' },
                { key: 'kode_banksoal', label: 'Kode banksoal', sortable: true},
                { key: 'matpel.nama', label: 'Mata pelajaran', sortable: true},
                { key: 'actions', label: 'Aksi' }
            ],
            perPage: 20,
            pageOptions: [20, 50, 100],
            search: '',
            data: {
                kode_banksoal: '',
                matpel_id: '',
                jumlah_soal : 0,
                jumlah_pilihan: 5,
                jumlah_soal_esay: 0
            },
            selected: '',
            isBusy: true,
            update: 0
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState(['errors']),
        ...mapState('banksoal', {
            banksoals: state => state.banksoals
        }),
        ...mapState('matpel', {
            matpels: state => state.allMatpels
        }),
        ...mapState('server', {
            servers: state => state.servers
        }),
        page: {
            get() {
                return this.$store.state.banksoal.page
            },
            set(val) {
                this.$store.commit('banksoal/SET_PAGE', val)
            }
        }
    },
    methods: {
        ...mapActions('banksoal', ['getBanksoals','addBanksoal','removeBanksoal','getDataById','updateDataBanksoal']),
        ...mapActions('matpel',['getAllMatpels']),
        postBanksoal() {
            this.addBanksoal({
                kode_banksoal : this.data.kode_banksoal,
                matpel_id : this.data.matpel_id.id,
                jumlah_soal: this.data.jumlah_soal,
                jumlah_pilihan: this.data.jumlah_pilihan,
                jumlah_soal_esay: this.data.jumlah_soal_esay
            }).then( (data) => {
                this.success('Banksoal berhasil ditambah.')
                this.getBanksoals({ perPage: this.perPage })  
                this.clearForm()
                this.$bvModal.hide('modal-scoped')
            })
        },
        updateBanksoal() {
            this.updateDataBanksoal({
                id: this.update,
                data: this.data
            })
            .then(() => {
                this.success('Banksoal berhasil diubah.')
                this.getBanksoals({ perPage: this.perPage })  
                this.clearForm()
                this.$bvModal.hide('modal-scoped')
                this.update = 0
            })
            .catch(() => {
                this.error('Terjadi kesalahan.')
            })
        },
        deleteBanksoal(id) {
            this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus banksoal & directory secara permanent!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeBanksoal(id)
                    .then(() => {
                        this.getBanksoals({ perPage: this.perPage })
                        this.success('Banksoal berhasil dihapus.')
                    })
                    .catch(() => {
                        this.error('Terjadi kesalahan saat menghapus banksoal')
                    })
                }
            })
        },
        clearForm() {
            this.data = {
                kode_banksoal: '',
                matpel_id: '',
                jumlah_soal : 0,
                jumlah_pilihan: 5,
                jumlah_soal_esay: 0
            }
        },
        getDataId(id) {
            this.getDataById(id)
            .then((response) => {
                this.data = {
                    kode_banksoal: response.data.kode_banksoal,
                    matpel_id: response.data.matpel.nama,
                    jumlah_soal : response.data.jumlah_soal,
                    jumlah_pilihan: response.data.jumlah_pilihan,
                    server_name: response.data.server_name,
                    jumlah_soal_esay: response.data.jumlah_soal_esay
                }
                this.update = response.data.id
                this.$bvModal.show('modal-scoped')
            })
            .catch(() => {
                this.error('Terjadi kesalahan.')
            })
        },
        success(msg) {
            this.$notify({
              group: 'foo',
              title: 'Sukses',
              type: 'success',
              text: msg
            })
        },
        error(msg) {
            this.$notify({
                group: 'foo',
                title: 'Error',
                type: 'error',
                text: msg
            })
        }
    },
    watch: {
        page() {
            this.getBanksoals({ perPage: this.perPage })
        },
        search: _.debounce(function (value) {
            this.getBanksoals({ search: this.search, perPage: this.perPage })
        }, 500),
        perPage() {
            this.getBanksoals({ search: this.search, perPage: this.perPage })
        }
    },
}
</script>
<style type="text/css">
    table#table-transition-example .flip-list-move {
      transition: transform 1s;
    }
</style>