<template>
	<div class="c-body">
        <main class="c-main">
          <div class="container-fluid">
            <div class="fade-in">
   <!--          	<div class="card">
            		<div class="card-header">Dashboard</div>
            		<div class="card-body"> -->
            			<div class="row">
            				<div class="col-md-3">
            					<div class="card">
									<div class="card-body p-3 d-flex align-items-center">
										<div class="bg-gradient-primary p-3 mfe-3">
											<i class="c-icon c-icon-xl cil-storage"></i>
										</div>
										<div>
											<div class="text-value text-primary"><i class="c-icon cil-infinity"></i></div>
											<div class="text-muted text-uppercase font-weight-bold small">Server sekolah</div>
										</div>
									</div>
									<div class="card-footer px-3 py-2">
										<router-link :to="{ name: 'server.data' }" class="btn-block text-muted d-flex justify-content-between align-items-center" href="#"><span class="small font-weight-bold">View More</span>
												<i class="c-icon cil-chevron-right"></i>
										</router-link>
									</div>
								</div>
            				</div>
            				<div class="col-md-3">
            					<div class="card">
									<div class="card-body p-3 d-flex align-items-center">
										<div class="bg-gradient-primary p-3 mfe-3">
											<i class="c-icon c-icon-xl cil-storage"></i>
										</div>
										<div>
											<div class="text-value text-primary"><i class="c-icon cil-infinity"></i></div>
											<div class="text-muted text-uppercase font-weight-bold small">Server sekolah</div>
										</div>
									</div>
									<div class="card-footer px-3 py-2">
										<router-link :to="{ name: 'server.data' }" class="btn-block text-muted d-flex justify-content-between align-items-center" href="#"><span class="small font-weight-bold">View More</span>
												<i class="c-icon cil-chevron-right"></i>
										</router-link>
									</div>
								</div>
            				</div>
            				<div class="col-md-3">
            					<div class="card">
									<div class="card-body p-3 d-flex align-items-center">
										<div class="bg-gradient-primary p-3 mfe-3">
											<i class="c-icon c-icon-xl cil-storage"></i>
										</div>
										<div>
											<div class="text-value text-primary"><i class="c-icon cil-infinity"></i></div>
											<div class="text-muted text-uppercase font-weight-bold small">Server sekolah</div>
										</div>
									</div>
									<div class="card-footer px-3 py-2">
										<router-link :to="{ name: 'server.data' }" class="btn-block text-muted d-flex justify-content-between align-items-center" href="#"><span class="small font-weight-bold">View More</span>
												<i class="c-icon cil-chevron-right"></i>
										</router-link>
									</div>
								</div>
            				</div>
            				<div class="col-md-3">
            					<div class="card">
									<div class="card-body p-3 d-flex align-items-center">
										<div class="bg-gradient-primary p-3 mfe-3">
											<i class="c-icon c-icon-xl cil-storage"></i>
										</div>
										<div>
											<div class="text-value text-primary"><i class="c-icon cil-infinity"></i></div>
											<div class="text-muted text-uppercase font-weight-bold small">Server sekolah</div>
										</div>
									</div>
									<div class="card-footer px-3 py-2">
										<router-link :to="{ name: 'server.data' }" class="btn-block text-muted d-flex justify-content-between align-items-center" href="#"><span class="small font-weight-bold">View More</span>
												<i class="c-icon cil-chevron-right"></i>
										</router-link>
									</div>
								</div>
            				</div>
            			</div>
						<div class="row">
							<div class="col-lg-3">
								<div class="card">
									<div class="card-header">Reporting</div>
									<div class="card-body"></div>
								</div>
							</div>
							<div class="col-lg-9">
								<div class="card">
									<div class="card-header">Ujian mendatang</div>
									<div class="card-body">
										<template v-if="ujians && typeof ujians.data != 'undefined'">
											<b-table striped hover bordered small :fields="fields" :items="ujians.data" show-empty>
												<template v-slot:cell(lama)="row">
													{{ parseInt(row.item.lama)/60+ " Menit" }}
												</template>
												<template v-slot:cell(banksoals)="row">
													<b-badge variant="success" class="mr-1" v-for="(kode,index) in row.item.kode_banksoal" v-text="kode" :key="index"></b-badge>
												</template>
												<template v-slot:cell(status)="row">
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
								</div>
							</div>
						</div>
<!-- 					</div>
				    <div class="card-footer">
				    	
				    </div>
				</div> -->
            </div>
          </div>
        </main>
      </div>
</template>
<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'

export default {
	name: 'Dashboard',
	components: {

	},
	created() {
		this.getUjians()
	},
	data() {
		return {
			fields: [
				{ key: 'banksoals', label: 'Kode banksoal' },
				{ key: 'alias', label: 'Alias' },
				{ key: 'tanggal', label: 'Tanggal' },
				{ key: 'mulai', label: 'Waktu mulai' },
				{ key: 'lama', label: 'Durasi' },
				{ key: 'status', label: 'Server khusus' }
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
		...mapActions('ujian', ['getUjians']),
	},
	watch: {
		page() {
			this.getUjians()
		},
		search() {
			this.getUjians(this.search)
		}
	}
}
</script>