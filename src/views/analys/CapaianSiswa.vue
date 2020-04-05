<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                	<router-link :to="{ name: 'analys.siswa' }" class="btn btn-light btn-sm mr-1">Kembali</router-link>
                	<button class="btn float-right btn-primary btn-sm mx-1" @click="print">Print</button>
                </div>
                <div class="card-body" id="printSoal">
                	<div class="table-responsive">
                	<table class="table table-bordered">
                		<tr>
                			<td>Nomor</td>
                			<td v-for="(capaian, index) in capaians.soals" v-text="index+1"></td>
                		</tr>
                		<tr v-for="data in capaians.data">
                			<td>
                				{{ data[0].nama }} <br>
                				{{ data[0].no_ujian }}
                			</td>
                			<td v-for="dat in data[1]" v-text="dat.iscorrect" :class="{ 'bg-danger': dat.iscorrect == 0 }"></td>
                		</tr>
                	</table>
                	<table class="table table-bordered">
                		
                	</table>
                	</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'

	export default {
		name: 'CapaianSiswa',
		created() {
			this.getCapaianSiswa({
				'jadwal_id'		: this.$route.params.jadwal_id,
				'sekolah_id'	: this.$route.params.sekolah_id,
				'banksoal_id' 	: this.$route.params.banksoal_id
			})
		},
		data() {
			return {
				fields: [
	                'index',
	                { key: 'pertanyaan', label: 'Pertanyaan'},
	            ],
			}
		},
		computed: {
			...mapState('ujian', {
	            capaians: state => state.capaians
	        }),
		},
		methods: {
			...mapActions('ujian',['getCapaianSiswa']),
			print() {
	            this.$htmlToPaper('printSoal');
	        }
		}
	}
</script>
<style>
	@media print {
	  @page {
	    size: landscape
	  }
	}
</style>