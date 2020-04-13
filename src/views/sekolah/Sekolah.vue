<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'sekolah.add' }" class="btn btn-primary btn-sm" v-if="$can('create_sekolah')">Tambah sekolah</router-link>
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Sekolah</h4>
                            <div class="small text-muted">Buat edit dan hapus sekolah</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                            <download-excel
                                v-if="sekolah && typeof sekolah.data != 'undefined'"
                                class="btn float-right btn-success btn-sm mx-1"
                                :data = "sekolah.data"
                                :fields="json_fields"
                                :name="'Data sekolah_page_'+$store.state.sekolah.page+'.xls'"
                            >
                                <i class="cil-cloud-download"></i>
                                Download data sekolah
                            </download-excel>
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
                                  placeholder="Cari nama sekolah"
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
                    <template v-if="sekolah && typeof sekolah.data != 'undefined'">
						<b-table sticky-header striped hover bordered small :fields="fields" :items="sekolah.data" v-if="sekolah" show-empty>
							<template v-slot:cell(show_details)="row">
	                            <b-button 
	                            size="sm" 
	                            @click="row.toggleDetails" 
	                            :variant="row.detailsShowing ? 'danger' : 'info'">
	                            	<i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" />
	                            </b-button>
	                        </template>
							<template v-slot:row-details="row">
	                            <b-card>
	                            	<strong>Alamat</strong><br>
	                                {{ row.item.alamat}}
	                            </b-card>
	                        </template>
							<template v-slot:cell(actions)="row">
								<router-link 
								:to="{ name: 'sekolah.edit', params: { id: row.item.id } }" 
								class="btn btn-warning btn-sm mr-1" v-if="$can('edit_sekolah')">
									<i class="cil-pencil"></i> Edit
								</router-link>
								<b-button :disabled="isLoading" variant="danger" size="sm" @click="deleteSekolah(row.item.id)" v-if="$can('delete_sekolah')">
									<i class="cil-trash"></i> Hapus
								</b-button>
							</template>
						</b-table>
						<div class="row" v-if="sekolah">
	                        <div class="col-md-6">
	                            <p><i class="fa fa-bars"></i> {{ sekolah.data.length }} item dari {{ sekolah.total }} total data</p>
	                        </div>
	                        <div class="col-md-6">
	                            <div class="float-right">
	                                <b-pagination
									    size="sm"
									    :disabled="isLoading"
	                                    v-model="page"
	                                    :total-rows="sekolah.total"
	                                    :per-page="sekolah.per_page"
	                                    v-if="sekolah"
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
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import downloadExcel from 'vue-json-excel';
import _ from 'lodash'

export default {
	name: 'DataSekolah',
	components: {
		downloadExcel
	},
	created() {
		this.getSekolah({ perPage: this.perPage, search: this.search })
		.catch(() => {
			this.notifError()
		})
	},
	data() {
		return {
			json_fields: {
                'NO sekolah' : 'nis',
                'Nama sekolah' : 'nama',
                'Alamat' : 'alamat'
            },
			fields: [
				{ key: 'show_details', label: 'Detail' },
				{ key: 'nis',label: 'No Induk sekolah' },
				{ key: 'nama', label: 'Nama sekolah' },
				{ key: 'actions', label: 'Aksi'}
			],
			perPage: 20,
            pageOptions: [20, 50, 100],
			search: '',
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('sekolah', {
			sekolah: state => state.sekolah
		}),
		page: {
			get() {
				return this.$store.state.sekolah.page
			},
			set(val) {
				this.$store.commit('sekolah/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('sekolah', ['getSekolah','removeSekolah']),
		deleteSekolah(id) {
			this.$swal({
				title: 'Informasi',
				text: 'Tindakan ini akan menghapus secara permanent!',
				icon: 'warning',
				showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c7c6c6',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeSekolah(id)
                    .then(() => {
                    	this.getSekolah({ perPage: this.perPage, search: this.search })
                    	this.notifSuccess('Berhasil menghapus data sekolah');
                    })
                    .catch(() => {
                    	this.notifError()
                    })
                }
            })
		},
		notifError(msg) {
			this.$notify({
                  group: 'foo',
                  title: 'Error',
                  type: 'error',
                  text: 'Terjadi kesalahan'
            })
		},
		notifSuccess(msg) {
			this.$notify({
                 group: 'foo',
                 title: 'Success',
                 type: 'success',
                 text: msg
            })
		}
	},
	watch: {
		page() {
			this.getSekolah({ perPage: this.perPage, search: this.search })
			.catch(() => {
				this.notifError()
			})
		},
		search: _.debounce(function (value) {
			this.getSekolah({ perPage: this.perPage, search: this.search })
			.catch(() => {
				this.notifError()
			})
		}, 500),
		perPage() {
			this.getSekolah({ perPage: this.perPage, search: this.search })
			.catch(() => {
				this.notifError()
			})	
		}
	}
}
</script>