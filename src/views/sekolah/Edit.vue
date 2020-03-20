<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'sekolah.data' }" class="btn btn-light btn-sm">Kembali</router-link>
				</div>
				<div class="card-body">
					<sekolah-form></sekolah-form>
					<div class="form-group">
						<b-button variant="primary" @click.prevent="submit" size="sm" :disabled="isLoading">
							<b-spinner small type="grow" v-show="isLoading"></b-spinner>
							Simpan
						</b-button>
					</div>
				</div>
				<div class="card-footer">

				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import FormSekolah from './Form.vue'
export default {
	name: 'EditSekolah',
	created() {
		this.editSekolah(this.$route.params.id)
	},
	computed: {
		...mapGetters(['isLoading'])
	},
	methods: {
		...mapActions('sekolah',['editSekolah','updateSekolah']),
		submit() {
			this.updateSekolah(this.$route.params.id)
			.then(() => {
				this.$notify({
	                group: 'foo',
	                title: 'Success',
	                type: 'success',
	                text: 'Data sekolah berhasil disimpan'
	            })
				this.$router.push({ name: 'sekolah.data' })
			})
			.catch(() => {
				this.$notify({
	                group: 'foo',
	                title: 'Error',
	                type: 'error',
	                text: 'Terjadi kesalahan'
	            })
			})
		}
	},
	components: {
		'sekolah-form' : FormSekolah
	}
}
</script>