<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'banksoal.data' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                    <router-link :to="{ name: 'banksoal.soal.tambah', params: { 'banksoal_id' : $route.params.banksoal_id } }" class="btn btn-primary btn-sm  ">Tambah pertanyaan</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Manage Soal</h4>
                            <div class="small text-muted">Tambah lihat edit dan hapus soal pada banksoal dipilih </div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                            <router-link :to="{ name: 'banksoal.prev', params: { 'banksoal_id' : $route.params.banksoal_id }}" class="btn float-right btn-primary btn-sm mx-1">
                                <i class="cil-print"></i>
                                Preview banksoal
                            </router-link>
                        </div>
                    </div>
                    <br>
                    <template v-if="soals && typeof soals.data != 'undefined'">
                        <b-table striped hover bordered small :fields="fields" :items="soals.data" show-empty>
                        	<template v-slot:cell(index)="data">
    				        	{{ from+data.index }}
    				      	</template>

                        	<template v-slot:cell(dibuat)="row">
                                {{ row.item.created_at }}
                            </template>
                            <template v-slot:cell(show_details)="row">
                                <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                            </template>
            				<template v-slot:row-details="row">
    					        <b-card>
                                  <div v-if="row.item.direction != null" class="mb-3">
                                    <strong>Direction</strong><br>
                                    <audio-player :file="'/storage/audio/'+row.item.direction"></audio-player>
                                  </div>
    					          <div v-html="row.item.pertanyaan"></div>
    					          <div v-if="row.item.audio != null" class="mb-2"><audio-player :file="'/storage/audio/'+row.item.audio"></audio-player></div>
    					          <table class="table" v-if="row.item.jawabans != ''">
    					          	<tr v-for="(jawab, index) in row.item.jawabans" :key="index">
                                        <td width="20px">
                                            <i class="cil-bookmark text-warning" v-show="jawab.correct == '1'"></i>
                                        </td>
    					          		<td>
    					          			<div v-html="jawab.text_jawaban"></div>
    					          		</td> 
    					          	</tr>
    					          </table>
                                  <table v-show="row.item.tipe_soal == 2 && row.item.rujukan != '<p></p>'">
                                      <tr>
                                          <td v-html="row.item.rujukan"></td>
                                      </tr>
                                  </table>
    					        </b-card>
    					    </template>

                           <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'banksoal.soal.edit', params: {soal_id: row.item.id, banksoal_id: row.item.banksoal_id} }" class="btn btn-sm btn-warning mr-1" >
                                	<i class="cil-pencil"></i> Edit
                                </router-link>
                                <button class="btn btn-danger btn-sm  " @click="deleteBanksoal(row.item.id)" :disabled="isLoading"><i class="cil-trash"></i> Hapus</button>
                            </template>
                        </b-table>
                        <div class="row">
                            <div class="col-md-6">
                                <p v-if="soals.data"><i class="fa fa-bars"></i> {{ soals.data.length }} item dari {{ soals.total }} total data</p>
                            </div>
                            <div class="col-md-6">
                                <div class="float-right">
                                    <b-pagination
                                        size="sm"
                                        v-model="page"
                                        :total-rows="soals.total"
                                        :per-page="soals.per_page"
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
   </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AudioPlayer from '../../components/AudioPlayer.vue'
export default {
	name: 'SoalBanksoal',
    components: {
        AudioPlayer
    },
	created() {
		this.getAllSoal()
	},
	data() {
		return {
			fields: [
				'index',
                { key: 'show_details', label: 'Detail'},
				{ key: 'dibuat', label: 'Dibuat pada'},
				{ key: 'actions', label: 'Aksi'}
			],
			search: '',
            isBusy: true
		}
	},
	computed: {
        ...mapGetters(['isLoading']),
		...mapState('soal', {
            soals: state => state.soals,
            from: state => state.from
		}),
		page: {
			get() {
				return this.$store.state.soal.page
			},
			set(val) {
				this.$store.commit('soal/SET_PAGE',val)
			}
		}
	},
	methods: {
		...mapActions('soal',['getSoals','removeSoal']),
		getAllSoal() {
			this.getSoals({ banksoal_id: this.$route.params.banksoal_id })
            .then(() => {
                this.isBusy = false
            })
		},
		deleteBanksoal(id) {
			this.$swal({
                title: 'Informasi',
                text: "Tindakan ini akan menghapus secara permanent!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c9c9ca',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeSoal(id)
                    .then(() => {
                        this.getAllSoal()
                        this.$notify({
                            group: 'foo',
                            title: 'Sukses',
                            type: 'success',
                            text: 'Data soal berhasil dihapus.'
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
            this.getAllSoal()
        },
        search() {
            this.getAllSoal(this.search)
        }
    },
}
</script>