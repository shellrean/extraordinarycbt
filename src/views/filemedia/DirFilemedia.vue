<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<router-link to="/filemedia" class="btn btn-light btn-sm">Kembali</router-link>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-3">
							<div class="input-group">
							<div class="custom-file">
								<input type="file" class="custom-file-input" @change="onFileChange">
								<label class="custom-file-label">{{ label ? label : 'Pilih File...' }}</label>
							</div>
							<div class="input-group-append">
								<button class="btn btn-outline-primary" type="button" @click="uploadFile">Upload</button>
							</div>
							</div>
						</div>
					</div>
					<div class="row mt-2">
						<template v-if="contentDirectory && typeof contentDirectory.data != 'undefined'">
	  						<div class="col-md-12">
	  							<table class="table table-stipped table-hovered table-bordered">
	  								<tr>
	  									<td>link</td>
	  									<td>view</td>
	  									<td>Hapus</td>
	  								</tr>
	  								<tr v-for="content in contentDirectory.data">
	  									<td>
	  										<a :href="baseURL+'/storage/'+content.dirname+'/'+content.filename" target="_blank">Link gambar</a>
	  									</td>
	  									<td>
	  										<img :src="baseURL+'/storage/'+content.dirname+'/'+content.filename" class="img-thumbnail" style="max-width: 50px">
	  									</td>
	  									<td>
	  										<b-button @click="removeFilemediaa(content.id)" variant="danger" size="sm" :disabled="isLoading" ><i class="cil-trash"></i> Hapus</b-button>
	  									</td>
	  								</tr>
	  							</table>
	  						</div>
	  						<div class="col-md-12">
	  							<div class="float-right">
	  								<b-pagination
	                                    v-model="page"
	                                    size="sm"
	                                    :total-rows="contentDirectory.total"
	                                    :per-page="contentDirectory.per_page"
	                                    ></b-pagination>
	  							</div>
	  						</div>
	  					</template>
  					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
	created() {
		this.getContentFilemedia(this.$route.params.directory_id)
	},
	data() {
		return {
			label: '',
			image: '',
			isBusy: true,
			baseURL: process.env.VUE_APP_API_SERVER
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('filemedia', {
			contentDirectory: state => state.contentFilemedia
		}),
		page: {
            get() {
                return this.$store.state.filemedia.page
            },
            set(val) {
                this.$store.commit('filemedia/SET_PAGE', val)
            }
        }
	},
	methods: {
		...mapActions('filemedia',['getContentFilemedia','addFilemedia','removeFilemedia']),
		removeFilemediaa(id) {
			this.removeFilemedia(id)
			.then(() => {
				this.getContentFilemedia(this.$route.params.directory_id)
				this.$notify({
                    group: 'foo',
                    title: 'Sukses',
                    type: 'success',
                    text: 'Data filemedia berhasil dihapus.'
                })
			})
		},
		onFileChange(e) {
			this.label = e.target.files[0].name
            this.image = e.target.files[0]
		},
		uploadFile() {
			let formData = new FormData()
			formData.append('directory_id', this.$route.params.directory_id)
            formData.append('image',this.image)
            this.addFilemedia(formData)
            .then(() => {
            	this.getContentFilemedia(this.$route.params.directory_id)
            	this.label = ''
            	this.image = ''
	            this.$notify({
		          group: 'foo',
		          title: 'Sukses',
		          type: 'success',
		          text: 'Filemedia berhasil ditambahkan.'
		        })
           	})
		}
	},
	watch: {
        page() {
            this.getContentFilemedia(this.$route.params.directory_id)
        },
        matpels() {
            this.isBusy = false
        }
    },
}
</script>