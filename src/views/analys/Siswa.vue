<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					Capaian siswa
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Capaian siswa</h4>
                            <div class="small text-muted">Filter dengan jadwal</div>
                        </div>
                        <div class="d-none d-md-block col-sm-7">
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
                    <b-table striped hover bordered small :fields="fields" :items="banksoals.data" show-empty v-if="banksoals">
                        <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'analys.capaian', params: { banksoal_id: row.item.id , sekolah_id: sekolah, jadwal_id: jadwal } }" class="btn btn-primary btn-sm mr-1" v-if="$can('edit_matpel')">
                                    <i class="cil-badge"></i> Capaian siswa
                                </router-link>
                            </template>
                    </b-table>
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
                fields: [
                    { key: 'kode_banksoal', label: 'Kode banksoal' },
                    { key: 'actions', label: 'Aksi' }
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
                banksoals: state => state.banksoals
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
            ...mapActions('ujian', ['getUjians','getSekolahByJadwal','getHasilByJadwalAndSekolah','getBanksoalByJadwalAndSekolah']),
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
                    .then(() => {
                        this.sekolah = 0
                    })
                    .catch(() => {

                    })
                }
            },
            sekolah(val) {
                if(val != 0 && val != '') {
                    this.getBanksoalByJadwalAndSekolah({
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