<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card" v-if="!$role('school')">
				<div class="card-header">
					<router-link :to="{ name: 'peserta.add' }" class="btn btn-primary btn-sm mr-1" v-if="$can('create_peserta')">Tambah peserta</router-link>
					<div class="float-right">
                        <input type="text" class="form-control form-control-sm" placeholder="Cari nama..." v-model="search">
                    </div>
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Peserta</h4>
                            <div class="small text-muted">Manage data peserta</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                            <router-link :to="{ name: 'peserta.kartu', params: { 'id': sekolah } }" class="btn float-right btn-primary btn-sm mx-1">
                                <i class="cil-print"></i>
                                Cetak kartu peserta
                            </router-link>
                            <router-link :to="{ name: 'peserta.upload' }" class="btn float-right btn-success btn-sm" v-if="$can('upload_peserta')">
                            	<i class="cil-cloud-upload"></i>
                            	Upload peserta
                            </router-link>
                        </div>
                    </div>
                    <br>
					<div class="row" v-if="sekolahs">
						<div class="col-md-3">
							<div class="form-group mb-3">
								<v-select label="nama" :options="sekolahs.data" v-model="sekolah" :reduce="nama => nama.id"></v-select>
							</div>
						</div>
					</div>
					<b-table 
					striped hover bordered small show-empty 
					:fields="fields" 
					:items="pesertas.data" 
					v-if="pesertas && typeof pesertas.data != 'undefined'"
					>
						<template v-slot:cell(actions)="row">
							<b-button variant="danger" size="sm" @click="deletePeserta(row.item.id)" :disabled="isLoading">
								<i class="cil-trash"></i> Hapus
							</b-button>
						</template>
					</b-table>
					<div class="row" v-if="pesertas && typeof pesertas.data != 'undefined'">
	                       <div class="col-md-6">
	                           <p><i class="fa fa-bars"></i> {{ pesertas.data.length }} item dari {{ pesertas.total }} total data</p>
	                       </div>
	                       <div class="col-md-6">
	                           <div class="float-right">
	                               <b-pagination
								   size="sm"
	                                   v-model="page"
	                                   :total-rows="pesertas.total"
	                                   :per-page="pesertas.per_page"
	                                   :disabled="isLoading"
	                                   ></b-pagination>
	                           </div>
	                       </div>
	                   </div>
				</div>
				<div class="card-footer">
					
				</div>
			</div>
			<div class="card" v-if="$role('school')">
				<div class="card-header">
					Daftar peserta yang terdaftar
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Peserta</h4>
                            <div class="small text-muted">Manage data peserta</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                            <a :href="'/prev/peserta'" target="_blank" class="btn float-right btn-primary btn-sm mx-1">
                                <i class="cil-print"></i>
                                Cetak data peserta
                            </a>
                        </div>
                    </div>
                    <br>
					<b-table striped hover bordered small :fields="fields_school" :items="pesertas.data" :busy="isBusy" show-empty v-show="pesertas.data">
						<template v-slot:cell(actions)="row">
							<b-button variant="danger" size="sm" @click="deletePeserta(row.item.id)">
								<font-awesome-icon icon="trash" /> Hapus
							</b-button>
						</template>
					</b-table>
					<div class="row" v-show="pesertas.data">
                        <div class="col-md-6">
                            <p v-if="pesertas.data"><i class="fa fa-bars"></i> {{ pesertas.data.length }} item dari {{ pesertas.meta.total }} total data</p>
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <b-pagination
								   size="sm"
                                    v-model="page"
                                    :total-rows="pesertas.meta.total"
                                    :per-page="pesertas.meta.per_page"
                                    aria-controls="pesertas"
                                    v-if="pesertas.data && pesertas.data.length > 0"
                                    ></b-pagination>
                            </div>
                        </div>
                    </div>
				</div>
				<div class="card-footer">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
	name: 'DataPeserat',
	components: {
        vSelect
    },
	created() {
		if(!this.$role('school')) {
			this.getAllSekolah()
		}
		if(this.$role('school')) {
			this.sekolah = this.$store.state.user.authenticated.sekolah_id
			this.getDataPesertas()
		}
	},
	data() {
		return {
			fields: [
				{ key: 'name_server', label: 'Kode server ' },
				{ key: 'no_ujian', label: 'No ujian' },
				{ key: 'nama', label: 'Nama peserta' },
				{ key: 'actions', label: 'Aksi' }
			],
			fields_school: [
				{ key: 'name_server', label: 'Kode server ' },
				{ key: 'no_ujian', label: 'No ujian' },
				{ key: 'nama', label: 'Nama peserta' }
			],
			search: '',
			isBusy: true,
			sekolah: 0
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('peserta', {
			pesertas: state => state.pesertas
		}),
		...mapState('sekolah', {
			sekolahs: state => state.sekolah
		}),
		page: {
			get() {
				return this.$store.state.peserta.page
			},
			set(val) {
				this.$store.commit('peserta/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('peserta', ['getPesertas','removePeserta']),
		...mapActions('sekolah', ['getAllSekolah', ]),
		deletePeserta(id) {
			this.$swal({
				title: 'Informasi',
				text: 'Tindakan ini akan menghapus secara permanent!',
				icon: 'warning',
				showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c7c7',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removePeserta(id)
                    .then(() => {
                        this.getDataPesertas();
                        this.$notify({
                            group: 'foo',
                            title: 'Sukses',
                            type: 'success',
                            text: 'Data peserta berhasil dihapus.'
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
		},
		getDataPesertas() {
			this.getPesertas({
				sekolah: this.sekolah
			})
		},
		cetakKartu() {
			this.$notify({
                  group: 'foo',
                  title: 'Information',
                  type: 'info',
                  text: 'This is future.'
            })
		}
	},
	watch: {
		page() {
			this.getPesertas()
		},
		search() {
			this.getPesertas({
				search: this.search
			})
		},
		pesertas() {
			this.isBusy = false
		},
		sekolah(val) {
			if(val != 0 || val != null) {
				this.getPesertas({
					sekolah: this.sekolah
				})
			}
		}
	}
}
</script>