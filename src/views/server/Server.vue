<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card" v-if="!$role('school')">
				<div class="card-header">
					<router-link :to="{ name: 'server.add' }" class="btn btn-primary btn-sm" v-if="$can('create_server')">Tambah server</router-link>
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Server</h4>
                            <div class="small text-muted">Manage servers</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                        	<download-excel
                                v-if="servers && typeof servers.data != 'undefined'"
                                class="btn float-right btn-success btn-sm mx-1"
                                :data = "servers.data"
                                :fields="json_fields"
                                :name="'Data server sekolah '+sekolah+'.xls'"
                            >
                                <i class="cil-cloud-download"></i>
                                Download data servers
                        	</download-excel>
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
					<div class="table-responsive-md">
					<b-table striped hover bordered small :fields="fields" :items="servers.data" show-empty v-show="servers.data" v-if="servers">
						<template v-slot:cell(show_details)="row">
                           <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                        </template>
                        <template v-slot:row-details="row">
                            <b-card>
                                <table class="table table-borderless">
                                    <tr>
                                        <td width="220px">Status server</td><td v-text="(row.item.status == '1' ? 'Aktif' : 'Offline')"></td>
                                    </tr>
                                    <tr>
                                        <td>UUID</td><td v-text="row.item.serial_number"></td>
                                    </tr>
                                </table>
                            </b-card>
                        </template>
						<template v-slot:cell(actions)="row">
							<b-button :disabled="isLoading" variant="success" v-if="$can('active_server')" title="Aktif/Matikan server" class="mr-1" size="sm" @click="reserveServer(row.item.id)">
								<i class="cil-toggle-off"></i> Aktif/Matikan
							</b-button>
							<b-button :disabled="isLoading" variant="warning" v-if="$can('reset_server')" title="Hapus UUID" class="mr-1" size="sm" @click="resetSerial(row.item.id)">
								<i class="cil-reload"></i> Reset UUID
							</b-button>
							<b-button :disabled="isLoading" variant="danger" v-if="$can('delete_server')" title="Hapus server" class="mr-1" size="sm" @click="deleteServer(row.item.id)">
								<i class="cil-trash"></i> Hapus
							</b-button>
						</template>
					</b-table>
					</div>
					<div class="row" v-if="servers && typeof servers.data != 'undefined'"">
                        <div class="col-md-6">
                            <p><i class="fa fa-bars"></i> {{ servers.data.length }} item dari {{ servers.total }} total data</p>
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <b-pagination
								   size="sm"
                                    v-model="page"
                                    :disabled="isLoading"
                                    :total-rows="servers.total"
                                    :per-page="servers.per_page"
                                    v-if="servers"
                                    ></b-pagination>
                            </div>
                        </div>
                    </div>
				</div>
				<div class="card-footer">
					<strong>Sematic kode server : </strong> <u>kodeSekolah-kodeAcak</u> <strong>Contoh : </strong> K0104002S-QRT
				</div>
			</div>
			<div class="card" v-if="$role('school')">
				<div class="card-header">
					Daftar server sekolah yang tersedia
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Server</h4>
                            <div class="small text-muted">Manage servers</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                            <button type="button" class="btn float-right btn-primary btn-sm mx-1" @click="printServer">
                                <i class="cil-print"></i>&nbsp; Cetak data servers
                            </button>
                        </div>
                    </div>
                    <br>
                    <div class="table-responsive-md">
					<b-table striped hover bordered small :fields="fields_school" :items="servers.data" :busy="isBusy" show-empty v-show="servers.data">
					</b-table>
					</div>
					<div class="row" v-show="servers.data">
                        <div class="col-md-6">
                            <p v-if="servers.data"><i class="fa fa-bars"></i> {{ servers.data.length }} server dari {{ servers.meta.total }} total server</p>
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <b-pagination
								   size="sm"
                                    v-model="page"
                                    :total-rows="servers.meta.total"
                                    :per-page="servers.meta.per_page"
                                    aria-controls="products"
                                    v-if="servers.data && servers.data.length > 0"
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
import downloadExcel from 'vue-json-excel';

export default {
	name: 'DataServer',
	components: {
        vSelect,
        downloadExcel
    },
	created() {
		if(!this.$role('school')) {
			this.getAllSekolah()
		}
		if(this.$role('school')) {
			this.sekolah = this.$store.state.user.authenticated.sekolah_id
			this.getDataServers()
		}
	},
	data() {
		return {
			json_fields: {
       	        'Server name' : 'server_name',
       	        'Keterangan' : 'description',
       	        'Password'	: 'password'
            },
			fields: [
				{ key: 'show_details', label: 'Detail' },
				{ key: 'server_name', label: 'Server name' },
				{ key: 'description', label: 'Keterangan' },
				{ key: 'password', label: 'Password'},
				{ key: 'actions', label: 'Aksi' }
			],
			fields_school: [
				{ key: 'server_name', label: 'Server name' },
				{ key: 'description', label: 'Keterangan' },
				{ key: 'password.password', label: 'Password'}
			],
			search: '',
			isBusy: true,
			sekolah: 0
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('server', {
			servers: state => state.servers
		}),
		...mapState('sekolah', {
			sekolahs: state => state.sekolah
		}),
		page: {
			get() {
				return this.$store.state.server.page
			},
			set(val) {
				this.$store.commit('server/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('server', ['getServers','removeServer','revertServer','resetSerial']),
		...mapActions('sekolah', ['getAllSekolah', ]),
		deleteServer(id) {
			this.$swal({
				title: 'Informasi',
				text: 'Tindakan ini akan menghapus secara permanent!',
				icon: 'warning',
				showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c5c5c5',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeServer(id)
                    .then(() => {
						this.$notify({
		                  group: 'foo',
		                  title: 'Sukses',
		                  type: 'success',
		                  text: 'Server berhasil dihapus.'
		                })
		                this.getDataServers()
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
            })
		},
		reserveServer(id) {
			this.revertServer(id)
			.then(() => {
				this.$notify({
                  group: 'foo',
                  title: 'Sukses',
                  type: 'success',
                  text: 'Status server changed.'
                })
                this.getDataServers()
			})
			.catch(() => {
				this.$notify({
                  group: 'foo',
                  title: 'Error',
                  type: 'error',
                  text: 'Terjadi kesalahan.'
                })
			})
		},
		getDataServers() {
			this.getServers({
				sekolah: this.sekolah
			})
		},
		printServer() {
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
			this.getServers({
				search: this.search,
				sekolah: this.sekolah
			})
		},
		search() {
			this.getServers({
				search: this.search
			})
		},
		pesertas() {
			this.isBusy = false
		},
		sekolah(val) {
			if(val != 0 || val != null) {
				this.getDataServers();
			}
		}
	}
}
</script>