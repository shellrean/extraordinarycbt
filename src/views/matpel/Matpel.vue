<template>
	<div class="row">
    	<div class="col-md-12">
    		<div class="card">
    			<div class="card-header">
                    <router-link :to="{ name: 'matpel.add' }" v-if="$can('create_matpel')" class="btn btn-primary btn-sm">Tambah matpel</router-link>
    			</div>
    			<div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Matpel</h4>
                            <div class="small text-muted">Buat edit dan hapus matpel</div>
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
                                  placeholder="Cari dengan nama matpel"
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
                    <div class="table-responsive-md" v-if="matpels && typeof matpels.data != 'undefined'">
                        <b-table 
                        id="table-transition-example"
                        primary-key="kode_mapel" :tbody-transition-props="transProps"
                        striped hover bordered small show-empty
                        :fields="fields" 
                        :items="matpels.data" 
                        >
                            <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                            </template>
                            <template v-slot:row-details="row">
                                <b-card>
                                    <b-badge variant="success" class="mr-1" v-show="row.item.jurusans == 0 && row.item.agama == 0">umum</b-badge>
                                    <b-badge variant="success" class="mr-1" v-show="row.item.jurusans != 0">khusus</b-badge>
                                    <b-badge variant="success" class="mr-1" v-show="row.item.agama != 0">agama</b-badge>
                                    <b-badge variant="info" class="mr-1" v-if="row.item.agama != 0" v-text="row.item.agama">agama</b-badge>
                                    <b-badge variant="info" class="mr-1" v-if="row.item.jurusans != 0" v-for="(jur, index) in row.item.jurusans" v-text="jur.nama" :key="index"></b-badge>
                                    <hr>
                                    <b-badge variant="info" class="mr-1">Pengoreksi</b-badge>
                                    <b-badge variant="success" class="mr-1" v-if="row.item.correctors_name != 0" v-for="(corector, index) in row.item.correctors_name" v-text="corector.name" :key="index"></b-badge>
                                </b-card>
                            </template>
                            <template v-slot:cell(nama)="row">
                                {{ row.item.nama }} 
                            </template>
                            <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'matpel.edit', params: { id: row.item.id } }" class="btn btn-warning btn-sm mr-1" v-if="$can('edit_matpel')">
                                    <i class="cil-pencil"></i> Edit
                                </router-link>
                                <button v-if="$can('delete_matpel')" class="btn btn-danger btn-sm" @click="deleteMatpel(row.item.id)" :disabled="isLoading">
                                    <i class="cil-trash"></i> Hapus
                                </button>
                            </template>
                        </b-table>
                        <div class="row">
                            <div class="col-md-6">
                                <p><i class="fa fa-bars"></i> {{ matpels.data.length }} item dari {{ matpels.total }} total data</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="matpels.total"
                                        :per-page="matpels.per_page"
                                        :disabled="isLoading"
                                        ></b-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-else>
                        <div class="text-center my-2">
                            Loading...
                        </div>
                    </template>
    			</div> 
                <div class="card-footer">
                    <strong>Sematic kode matpel : </strong> <u>kode-nomor-kategori</u> <strong>Contoh :</strong> BC-012-U (U: Umum, A: Agama, K: khusus)
                </div>
    		</div>
    	</div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
    name: 'DataMatpel',
    created() {
        this.getMatpels({ perPage : this.perPage })
    },
    data() {
        return {
            transProps: {
              name: 'flip-list'
            },
            fields: [
                { key: 'show_details', label: 'Detail' },
                { key: 'kode_mapel', label: 'Kode matpel', sortable: true},
                { key: 'nama', label: 'Nama mata pelajaran', sortable: true},
                { key: 'actions', label: 'Aksi' }
            ],
            perPage: 20,
            pageOptions: [20, 50, 100],
            search: '',
            data: {
                nama: '',
                kode_mapel: ''
            },
            isBusy: true
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState(['errors']),
        ...mapState('matpel', {
            matpels: state => state.matpels,
            from: state => state.from
        }),
        page: {
            get() {
                return this.$store.state.matpel.page
            },
            set(val) {
                this.$store.commit('matpel/SET_PAGE', val)
            }
        }
    },
    methods: {
        ...mapActions('matpel', ['getMatpels','removeMatpel']),
        deleteMatpel(id) {
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
                    this.removeMatpel(id)
                    .then(() => {
                        this.getMatpels({ perPage : this.perPage });
                        this.$notify({
                            group: 'foo',
                            title: 'Sukses',
                            type: 'success',
                            text: 'Data matpel berhasil dihapus.'
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
            this.getMatpels({ search: this.search, perPage: this.perPage })
        },
        search:  _.debounce(function (value) {
            this.getMatpels({ search: this.search, perPage: this.perPage })
        }, 500),
        perPage() {
            this.getMatpels({ search: this.search, perPage: this.perPage })
        }
    },
}
</script>