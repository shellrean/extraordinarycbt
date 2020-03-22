<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'ujian.koreksi' }" class="btn btn-light btn-sm  ">Kembali</router-link>
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Koreksi</h4>
                            <div class="small text-muted">Cocokan data akurasi</div>
                        </div>
                    </div>
                    <br>
                    <template v-if="esies && typeof esies.data != 'undefined'">
					<b-table striped hover bordered small :fields="fields" :items="esies.data" show-empty>
			            <template v-slot:cell(show_details)="row">
			        	     <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
			            </template>
			           	<template v-slot:cell(akurasi)="row">
			           		<b-progress :max="100" height="2rem" show-progress variant="info">
		                        <b-progress-bar :value="row.item.similiar">
		                        	Akurasi: <strong v-text="row.item.similiar"></strong>
		                        </b-progress-bar>
		                    </b-progress>
			           	</template>
			            <template v-slot:row-details="row">
			            	<div class="row">
			            		<div class="col-md-8">
			            			<div class="row">
			            				<div class="col-md-12">
				                            <b-card>
				                            	<strong>Jawaban rujukan</strong><br><br>
												<div v-html="row.item.pertanyaan.rujukan"></div>
				                            </b-card>
				                        </div>
				                        <div class="col-md-12">
				             				<b-card>
				             					<strong>Jawaban peserta</strong><br><br>
				             					<div v-html="row.item.esay"></div>
				             				</b-card>
				             			</div>
				                    </div>
		                        </div>
		                        <div class="col-md-4">
		                            <b-card>
		                                <div class="input-group mb-3">
											<input type="number" v-model="val" class="form-control" placeholder="Point" step="0.1" max="1" min="0">
											<div class="input-group-append">
												<button class="btn btn-outline-primary" type="button" @click="submitNilai(row.item.id)">Submit</button>
											</div>
										</div>
										<div class="mt-2">
											<strong>Pertanyaan</strong><br><br>
											<div v-html="row.item.pertanyaan.pertanyaan"></div>
											<br><br>
										</div>
		                            </b-card>
		                        </div>
		             		</div>
                        </template>
			        </b-table>
			        <div class="row">
                        <div class="col-md-6">
                            <p v-if="esies.data"><i class="fa fa-bars"></i> {{ esies.data.length }} item dari {{ esies.total }} total data</p>
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <b-pagination
                                    size="sm"
                                    v-model="page"
                                    :total-rows="esies.total"
                                    :per-page="esies.per_page"
                                    aria-controls="products"
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
	import { mapActions, mapState } from 'vuex'
	export default {
		name: 'KoreksiUjian',
		created() {
			this.getExistsByBanksoal(this.$route.params.banksoal)
		},
	    data() {
	        return {
	            fields: [
	                { key: 'show_details', label: 'Detail' },
	                { key: 'akurasi', label: 'Akurasi jawaban' }
	            ],
	            val: 0
	        }
	    },
	    computed: {
	    	...mapState('ujian', {
	            esies: state => state.essies
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
			...mapActions('ujian', ['getExistsByBanksoal','submitNilaiEsay']),
			submitNilai(id) {
				this.submitNilaiEsay({
					id: id,
					val: this.val
				})
				.then(() => {
					this.getExistsByBanksoal(this.$route.params.banksoal)
				})
			}
		}
	}
</script>