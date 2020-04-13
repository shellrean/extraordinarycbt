<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					Daftar direktori tersedia
				</div>
				<div class="card-body">
					<b-list-group v-if="directories">
					  <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(directory,index) in directories" :key="index">
					    <router-link :to="{ name: 'filemedia.directory', params: { 'directory_id' : directory.id } }">{{ directory.name }}</router-link> 
					    <div>
							<b-badge class="mr-1">{{ directory.file_count }}</b-badge>
							<b-badge variant="primary">{{ bytesToSize(directory.size) }}</b-badge>
					    </div>
					  </b-list-group-item>
					</b-list-group>
					<template v-else>
                        <div class="text-center my-2">
                            Loading...
                        </div>
                    </template>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'


export default {
	name: 'DataDirectory',
	created() {
		this.getDirectories()
	},
	data() {
		return {
			data: {
				nama_directory: ''
			}
		}
	},
	computed: {
		...mapState('filemedia', {
			directories: state => state.directories.data
		})
	},
	methods: {
		...mapActions('filemedia',['getDirectories','addDirectory']),
		postDirectory() {
			this.addDirectory(this.data)
			.then(() => { this.getDirectories(),this.data.nama_directory = '' })
			this.$bvModal.hide('modal-scoped')
			this.$notify({
	          group: 'foo',
	          title: 'Sukses',
	          type: 'success',
	          text: 'Direktori berhasil ditambahkan.'
	        })
		},
		bytesToSize(bytes) {
		   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		   if (bytes == 0) return '0 Byte';
		   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		}
	}
}
</script>