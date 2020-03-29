<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					Hasil ujian
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Hasil ujian sekolah</h4>
                            <div class="small text-muted">Filter dengan jadwal</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
                            <download-excel
                                v-if="hasils && typeof hasils.data != 'undefined'"
                                class="btn float-right btn-success btn-sm mx-1"
                                :data = "hasils.data"
                                :fields="json_fields"
                                :name="'Hasil ujian_page_'+$store.state.ujian.page+'.xls'"
                            >
                                <i class="cil-cloud-download"></i>
                                Download hasil ujian
                            </download-excel>
                        </div>
                    </div>
                    <br>
                    <div class="row" v-if="jadwals">
                        <div class="col-md-3">
                            <div class="form-group mb-3">
                                <v-select label="alias" :options="jadwals.data" v-model="jadwal" :reduce="nama => nama.id"></v-select>
                            </div>
                        </div>
                        <div class="col-md-3" v-if="sekolahs">
                            <div class="form-group mb-3">
                                <v-select label="nama" :options="sekolahs.data" v-model="sekolah" :reduce="nama => nama.id"></v-select>
                            </div>
                        </div>
                    </div>
                    <b-table striped hover bordered small :fields="fields" :items="hasils.data" show-empty v-if="hasils">
                        <template v-slot:cell(show_details)="row">
                           <b-button size="sm" @click="row.toggleDetails" :variant="row.detailsShowing ? 'danger' : 'info'"><i :class="row.detailsShowing ? 'cil-chevron-top' : 'cil-chevron-bottom'" /></b-button>
                        </template>
                        <template v-slot:row-details="row">
                            <b-card>
                                <table class="table table-borderless">
                                    <tr>
                                        <td width="200px">Salah</td>
                                        <td v-text="row.item.jumlah_salah"></td>
                                    </tr>
                                    <tr>
                                        <td>Benar</td>
                                        <td v-text="row.item.jumlah_benar"></td>
                                    </tr>
                                    <tr>
                                        <td>Kosong</td>
                                        <td v-text="row.item.tidak_diisi"></td>
                                    </tr>
                                    <tr>
                                        <td>Point esay</td>
                                        <td v-text="row.item.point_esay"></td>
                                    </tr>
                                    <tr>
                                        <td>Hasil akhir</td>
                                        <td v-text="row.item.hasil"></td>
                                    </tr>
                                </table>
                            </b-card>
                        </template>
                    </b-table>
                    <div class="row" v-show="hasils.data">
                        <div class="col-md-6">
                            <p v-if="hasils.data"><i class="fa fa-bars"></i> {{ hasils.data.length }} server dari {{ hasils.total }} total server</p>
                        </div>
                        <div class="col-md-6">
                            <div class="float-right">
                                <b-pagination
                                   size="sm"
                                    v-model="page"
                                    :total-rows="hasils.total"
                                    :per-page="hasils.per_page"
                                    aria-controls="products"
                                    v-if="hasils.data && hasils.data.length > 0"
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
		name: 'DataHasil',
        components: {
            vSelect,
            downloadExcel
        },
        created() {
            this.getUjians()
        },
        data() {
            return {
                json_fields: {
                    'Server' : 'peserta.name_server',
                    'No ujian' : 'peserta.no_ujian',
                    'Nama peserta' : 'peserta.nama',
                    'Salah' : 'jumlah_salah',
                    'Benar' : 'jumlah_benar',
                    'Kosong' : 'tidak_diisi',
                    'Point esay' : 'point_esay',
                    'Hasil akhir' : 'hasil'
                },
                fields: [
                    { key: 'show_details', label: 'Detail' },
                    { key: 'peserta.name_server', label: 'Server' },
                    { key: 'peserta.no_ujian', label: 'No ujian' },
                    { key: 'peserta.nama', label: 'Nama peserta' }
                ],
                jadwal: 0,
                sekolah: 0
            }
        },
        computed: {
            ...mapGetters(['isLoading']),
            ...mapState('ujian', {
                jadwals: state => state.ujians,
                sekolahs: state => state.sekolahs,
                hasils: state => state.hasilUjian
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
            ...mapActions('ujian', ['getUjians','getSekolahByJadwal','getHasilByJadwalAndSekolah']),
        },
        watch: {
            page() {
                this.getHasilByJadwalAndSekolah({
                    sekolah_id: this.sekolah,
                    jadwal_id: this.jadwal
                })
            },
            jadwal(val) {
                if(val != 0 && val != '') {
                    this.getSekolahByJadwal(val)
                    .catch(() => {

                    })
                }
            },
            sekolah(val) {
                if(val != 0 && val != '') {
                    this.getHasilByJadwalAndSekolah({
                        sekolah_id: this.sekolah,
                        jadwal_id: this.jadwal
                    })
                    .catch(() => {

                    })
                }
            }
        }
	}
</script>