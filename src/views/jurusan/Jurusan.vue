<template>
	<div class="row">
    	<div class="col-md-12">
    		<div class="card">
    			<div class="card-header">
                    <router-link :to="{ name: 'jurusan.add' }" class="btn btn-primary btn-sm">Tambah jurusan</router-link>
    			</div>
    			<div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Jurusan</h4>
                            <div class="small text-muted">Buat edit dan hapus jurusan</div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-5">
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
                                  placeholder="Cari nama jurusan"
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
                    <template v-if="jurusans && typeof jurusans.data != 'undefined'">
                        <div class="table-responsive-md">
                        <b-table 
                        id="table-transition-example"
                        primary-key="kode_mapel" :tbody-transition-props="transProps"
                        striped hover bordered small show-empty
                        :fields="fields" 
                        :items="jurusans.data" 
                        >
                        <template v-slot:cell(actions)="row">
                            <router-link :to="{ name: 'jurusan.edit', params: { id: row.item.id } }" class="btn btn-warning btn-sm mr-1">
                                <i class="cil-pencil"></i> Edit
                            </router-link>
                            <button class="btn btn-danger btn-sm" @click="deleteJurusan(row.item.id)" :disabled="isLoading">
                                <i class="cil-trash"></i> Hapus
                            </button>
                        </template>
                        </b-table>
                        <div class="row">
                            <div class="col-md-6">
                                <p><i class="fa fa-bars"></i> {{ jurusans.data.length }} item dari {{ jurusans.total }} total data</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="jurusans.total"
                                        :per-page="jurusans.per_page"
                                        :disabled="isLoading"
                                        ></b-pagination>
                                </div>
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
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'
    
export default {
    name: 'DataJurusan',
    created() {
        this.getJurusans({ perPage : this.perPage })
    },
    data() {
        return {
            transProps: {
              name: 'flip-list'
            },
            fields: [
               { key: 'id', label: 'ID Jurusan' },
               { key: 'nama', label: 'Nama' },
               { key: 'actions', label: 'Aksi' } 
            ],
            perPage: 30,
            pageOptions: [30, 100, 200],
            search: '',
            isBusy: true
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState(['errors']),
        ...mapState('jurusan', {
            jurusans: state => state.jurusans
        }),
        page: {
            get() {
                return this.$store.state.jurusan.page
            },
            set(val) {
                this.$store.commit('jurusan/SET_PAGE', val)
            }
        }
    },
    methods: {
        ...mapActions('jurusan', ['getJurusans', 'removeJurusan']),
        deleteJurusan(id) {
            this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus secara permanent!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c7c7',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeJurusan(id)
                    .then(() => {
                        this.getJurusans({ perPage : this.perPage });
                        this.$notify({
                            group: 'foo',
                            title: 'Sukses',
                            type: 'success',
                            text: 'Data jurusan berhasil dihapus.'
                        })
                    })
                    .catch((err) => {
                        this.$notify({
                            group: 'foo',
                            title: 'Error',
                            type: 'error',
                            text: 'Terjadi kesalahan.'
                        })
                    })
                }
            })
        }
    },
    watch: {
        page() {
            this.getJurusans({ search: this.search, perPage: this.perPage })
        },
        search:  _.debounce(function (value) {
            this.getJurusans({ search: this.search, perPage: this.perPage })
        }, 500),
        perPage() {
            this.getJurusans({ search: this.search, perPage: this.perPage })
        }
    }
}
</script>