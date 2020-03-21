<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'server.data' }" class="btn btn-light btn-sm">Kembali </router-link>
				</div>
				<div class="card-body">
					<form @submit.prevent="submit">
					<server-form></server-form>
					<div class="form-group">
						<b-button variant="primary" type="submit" size="sm" :disabled="isLoading">
							<b-spinner small type="grow" v-show="isLoading"></b-spinner> Simpan
						</b-button>
					</div>
					</form>
				</div>
				<div class="card-footer">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import FormServer from './Form.vue'
export default {
	name: 'AddServer',
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['isLoading'])
	},
	methods: {
		...mapActions('server',['submitServer']),
		submit() {
			this.submitServer()
			.then(() => {
				this.$notify({
	                group: 'foo',
	                title: 'Success',
	                type: 'success',
	                text: 'Data server berhasil disimpan'
	            })
				this.$router.push({ name: 'server.data'})
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
		'server-form' : FormServer
	}
}
</script>