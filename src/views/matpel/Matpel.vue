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
                        <div class="d-none d-md-block col-sm-7">
                            <button type="button" class="btn float-right btn-primary btn-sm mx-1">
                                <i class="cil-print"></i> Cetak data matpel
                            </button>
                        </div>
                    </div>
                    <br>
                    <template v-if="matpels && typeof matpels.data != 'undefined'">
                        <b-table 
                        striped hover bordered small show-empty
                        :fields="fields" 
                        :items="matpels.data" 
                        >
                            <template v-slot:cell(index)="data">
                                {{ from ? from+data.index : 1+data.index }}
                            </template>
                            <template v-slot:cell(nama)="row">
                                {{ row.item.nama }} <b-badge variant="success" class="mr-1" v-show="row.item.jurusan_id != 0">khusus</b-badge>
                                <b-badge variant="info" class="mr-1" v-if="row.item.jurusan_id != 0" v-for="(jur, index) in row.item.jurusan_id" v-text="jur" :key="index"></b-badge>
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
                    </template>
                    <template v-else>
                        <div class="text-center text-light my-2">
                            <b-spinner small type="grow"></b-spinner>
                        </div>
                    </template>
    			</div> 
                <div class="card-footer"></div>
    		</div>
    	</div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'DataMatpel',
    created() {
        this.getMatpels()
    },
    data() {
        return {
            fields: [
                'index',
                { key: 'kode_mapel', label: 'Kode matpel'},
                { key: 'nama', label: 'Nama mata pelajaran'},
                { key: 'actions', label: 'Aksi' }
            ],
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
                        this.getMatpels();
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
                            type: 'errir',
                            text: 'Terjadi kesalahan.'
                        })
                    })
                }
            })
        }
    },
    watch: {
        page() {
            this.getMatpels()
        },
        search() {
            this.getMatpels(this.search)
        },
        matpels() {
            this.isBusy = false
        }
    },
}
</script>