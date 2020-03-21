<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'peserta.data' }" class="btn btn-light btn-sm">Kembali</router-link>
				</div>
				<div class="card-body">
					<div class="input-group">
					  <div class="custom-file">
					    <input type="file" class="custom-file-input" @change="onFileChange">
					    <label class="custom-file-label">{{ label ? label : 'Pilih File...' }}</label>
					  </div>
					  <div class="input-group-append">
					    <button class="btn btn-outline-primary" type="button" @click="uploadFile">Upload</button>
					  </div>
					</div> <br>
					<b-progress :value="percent" show-progress animated></b-progress>
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
	data() {
		return {
			label: '',
			file: ''
		}
	},
	computed: {
		...mapState('peserta', {
			percent: state => state.uploadPercentage
		})
	},
	methods: {
		...mapActions('peserta', ['uploadPeserta']),
		onFileChange(e) {
			this.label = e.target.files[0].name
			this.file = e.target.files[0]
		},
		uploadFile() {
			let formData = new FormData()
			formData.append('file',this.file)
			this.uploadPeserta(formData)
			.then(() => {
				this.$notify({
		          group: 'foo',
		          title: 'Sukses',
		          type: 'success',
		          text: 'Peserta berhasil diimport.'
		        })
			})
		}
	}
}
</script>