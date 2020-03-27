<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<button @click="$bvModal.show('modal-scoped')" class="btn btn-sm btn-primary">Tambah jadwal</button>
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Jadwal ujian</h4>
                            <div class="small text-muted">Buat dan aktifkan jadwal ujian</div>
                        </div>
                    </div>
                    <br>
                    <template v-if="ujians && typeof ujians.data != 'undefined'">
						<b-table striped hover bordered small :fields="fields" :items="ujians.data" show-empty>
							<template v-slot:cell(lama)="row">
								{{ parseInt(row.item.lama)/60+ " Menit" }}
							</template>
							<template v-slot:cell(banksoals)="row">
								<b-badge variant="success" class="mr-1" v-for="(kode,index) in row.item.kode_banksoal" v-text="kode" :key="index"></b-badge>
							</template>
							<template v-slot:cell(status)="row">
								<b-form-checkbox size="lg" v-model="row.item.status_ujian" @change="seterStatus(row.item.id,row.item.status_ujian)" value="1" switch>{{ row.item.status_ujian == 1 ? 'Aktif' : 'Non aktif' }}</b-form-checkbox>
								<b-badge v-if="row.item.server_id != 0" v-for="(server, index) in row.item.server_id" v-text="server" :key="index"></b-badge>
							</template>
	                    </b-table>
	                    <div class="row">
	                        <div class="col-md-6">
	                            <p><i class="fa fa-bars"></i> {{ ujians.data.length }} item dari {{ ujians.total }} total data</p>
	                        </div>
	                        <div class="col-md-6">
	                            <div class="float-right">
	                                <b-pagination 
	                                    size="sm"
	                                    v-model="page"
	                                    :total-rows="ujians.total"
	                                    :per-page="ujians.per_page"
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
				<div class="card-footer">

				</div>
			</div>
		</div>
		 <b-modal id="modal-scoped" size="lg" hide-backdrop>
		    <template v-slot:modal-header="{ close }">
		      <h5>Setting ujian</h5>
		    </template>
		    <b-form-checkbox class="mb-2" size="lg" v-model="spesifik_server" value="1" switch>Spesifik server</b-form-checkbox>
		    <div class="form-group" v-if="spesifik_server">
		    	<label>Servers</label>
		    	<div class="text-center text-light my-2" v-show="!servers">
				  <b-spinner small type="grow"></b-spinner> Loading...
                </div>
		    	<multiselect 
				v-model="data.server_id" 
				tag-placeholder="Cari untuk menambah server" 
				placeholder="Tambah server" 
				label="server_name" track-by="id" 
				:options="servers.data" 
				:multiple="true" 
				:taggable="true"
				v-if="servers"></multiselect>
		    </div>
		    <div class="form-group">
		    	<label>Banksoal</label>
		    	<div class="text-center text-light my-2" v-show="!banksoals">
				  <b-spinner small type="grow"></b-spinner> Loading...
                </div>
		    	<multiselect 
				v-model="data.banksoal_id" 
				tag-placeholder="Cari untuk menambah banksoal" 
				placeholder="Tambah banksoal" 
				label="kode_banksoal" track-by="id" 
				:options="banksoals" 
				:multiple="true" 
				:taggable="true"
				v-if="banksoals"></multiselect>
		    	<div class="invalid-feedback" v-if="errors.banksoal_id">{{ errors.banksoal_id[0] }}</div>
		    </div>
		    <div class="form-group">
                <label>Alias(optional)</label>
                <input type="text" class="form-control" v-model="data.alias">
            </div>
		    <div class="form-group">
		    	<label>Tanggal ujian</label>
		    	<datetime inputId="ujian" v-model="data.tanggal" input-class="form-control" :class="{ 'is-invalid' : errors.tanggal }"></datetime>
		    	<div class="invalid-feedback" v-if="errors.tanggal">{{ errors.tanggal[0] }}</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<div class="form-group">
				    	<label>Jam mulai</label>
				    	<datetime inputId="mulai" v-model="data.mulai" input-class="form-control" :class="{ 'is-invalid' : errors.mulai }" type="time"></datetime>
				    	<div class="invalid-feedback" v-if="errors.mulai">{{ errors.mulai[0] }}</div>
				    </div>
		    	</div>
		    	<div class="col-md-4">
					<div class="form-group">
				    	<label>Jam ditutup</label>
				    	<datetime inputId="tutup" v-model="data.berakhir" input-class="form-control" :class="{ 'is-invalid' : errors.berakhir }" type="time"></datetime>
				    	<div class="invalid-feedback" v-if="errors.berakhir">{{ errors.berakhir[0] }}</div>
				    </div>
		    	</div>
		    	<div class="col-md-4">
					<div class="form-gorup">
				    	<label>Durasi</label>
				    	<input inputId="durasi" type="number" class="form-control" :class="{ 'is-invalid' : errors.lama }" name="" placeholder="Menit" v-model="data.lama">
				    	<div class="invalid-feedback" v-if="errors.lama">{{ errors.lama[0] }}</div>
				    </div>
		    	</div>
		    </div>
		    <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="postUjian" :disabled="isLoading">
		        Simpan
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
	</div>
</template>
<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Multiselect from 'vue-multiselect'

export default {
	name: 'DataUjian',
	components: {
	    datetime: Datetime,
	    Multiselect
	},
	created() {
		this.getUjians()
		this.getAllServers()
		this.getAllBanksoals()
	},
	data() {
		return {
			fields: [
				{ key: 'banksoals', label: 'Kode banksoal' },
				{ key: 'alias', label: 'Alias' },
				{ key: 'tanggal', label: 'Tanggal' },
				{ key: 'mulai', label: 'Waktu mulai' },
				{ key: 'lama', label: 'Durasi' },
				{ key: 'status', label: 'Status ujian' }
			],
			search: '',
			data: {
				mulai: '',
				berakhir: '',
				lama: '',
				tanggal: '',
				banksoal_id: '',
				server_id: '',
				alias: ''
			},
			spesifik_server: false,
			isActive: '',
			isBusy: true,
			timeout: 0
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('ujian', {
			ujians: state => state.ujians
		}),
		...mapState('server', {
			servers: state => state.allServers
		}),
		...mapState('banksoal', {
			banksoals: state => state.allBanksoals.data
		}),
		page: {
			get() {
				return this.$store.state.ujian.page
			},
			set(val) {
				this.$store.commit('ujian/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('ujian', ['getUjians','addUjian','setStatus','changeToken']),
		...mapActions('server', ['getAllServers']),
		...mapActions('banksoal', ['getAllBanksoals']),
		...mapMutations(['CLEAR_ERROR', 'SET_LOADING']),
		postUjian() {
			this.addUjian({
				banksoal_id: this.data.banksoal_id,
				server_id: this.data.server_id,
				alias: this.data.alias,
				mulai: this.data.mulai,
				berakhir: this.data.berakhir,
				lama: this.data.lama,
				tanggal: this.data.tanggal,
			})
			.then((response) => {
				this.$notify({
		          group: 'foo',
		          title: 'Sukses',
		          type: 'success',
		          text: 'Jadwal berhasil ditambahkan.'
		        }),
				this.getUjians()
				this.clearForm()
				this.$bvModal.hide('modal-scoped')
			})
			.catch((err) => {
				this.$notify({
		          group: 'foo',
		          title: 'Error',
		          type: 'error',
		          text: 'Terjadi kesalahan.'
		        })
			})
		},
		clearForm() {
			this.data.banksoal_id = '',
			this.data.mulai = '',
			this.data.berakhir = '',
			this.data.lama = '',
			this.data.tanggal = '',
			this.data.server_id = ''
		},
		seterStatus(id,status) {
			this.setStatus({
				id: id,
				status: (status == 0 ? 1 : 0)
			})
			.then((resp) => {
				this.$notify({
		          group: 'foo',
		          title: 'Sukses',
		          type: 'success',
		          text: 'Status ujian diubah'
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
	},
	watch: {
		page() {
			this.getUjians()
		},
		search() {
			this.getUjians(this.search)
		},
		ujians() {
			this.isBusy = false
		}
	}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>