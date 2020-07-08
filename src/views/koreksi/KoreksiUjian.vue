<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					Koreksi jawaban peserta
				</div>
				<div class="card-body">
					<div class="row">
                        <div class="col-sm-5">
                            <h4 id="traffic" class="card-title mb-0">Koreksi</h4>
                            <div class="small text-muted">List banksoal yang belum terkoreksi</div>
                        </div>
                    </div>
                    <br>
                    <div class="table-responsive-md" v-if="banksoals && typeof banksoals.data != 'undefined'">
					<b-table striped hover bordered :busy="isBusy" small :fields="fields" :items="banksoals.data" show-empty >
						<template v-slot:cell(aksi)="row">
							<router-link :to="{ name: 'koreksi.esay', params: { banksoal: row.item.id } }" class="btn btn-sm btn-primary"><i class="cil-task"></i> Koreksi banksoal ini</router-link>
						</template>
					</b-table>
					</div>
					<template v-else>
                        <div class="text-center my-2">
                            Loading...
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
import { mapActions, mapState } from 'vuex'

export default {
	name: 'UjianKoreksi',
	created() {
		this.getExistsEsay()
	},
	data() {
		return {
			fields: [
				{ key: 'kode_banksoal', label: 'Banksoal' },
				{ key: 'koreksi', label: 'Jawaban belum terkoreksi' },
				{ key: 'aksi', label: 'Aksi' }
			],
			nilai: '',
			isBusy: true
		}
	},
	computed: {
		...mapState('ujian', {
			banksoals: state => state.ujiansExists
		})
	},
	methods: {
		...mapActions('ujian', ['getJawabanEsay','submitNilaiEsay','getExistsEsay']),
		submitNilai(index) {
			this.submitNilaiEsay(this.essies.data[index])
			.then(() => {
				this.$notify({
		          group: 'foo',
		          title: 'Sukses',
		          type: 'success',
		          text: 'Nilai berhasil dikirim.'
		        })
			})
		} 
	},
	watch: {
		banksoals() {
			this.isBusy = false
		}
	}
}
</script>