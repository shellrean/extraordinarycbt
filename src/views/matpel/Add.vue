<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<router-link :to="{ name: 'matpel.data' }" class="btn btn-light btn-sm">kembali</router-link>
				</div>
				<div class="card-body">
					<matpel-form></matpel-form>
					<div class="form-group">
						<b-button size="sm" variant="primary" @click="submit" :disabled="isLoading">
                        <b-spinner small type="grow" v-show="isLoading"></b-spinner>Simpan</b-button>
					</div>
				</div>
				<div class="card-footer"></div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import FormMatpel from './Form.vue'
export default {
	name: 'AddMatpel',
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['isLoading'])
	},
	methods: {
		...mapActions('matpel',['submitMatpel']),
		submit() {
			this.submitMatpel()
			.then(() => {
				this.$notify({
					group: 'foo',
					title: 'Sukses',
					type: 'success',
					text: 'Data mapel berhasil disimpan.'
				})
				this.$router.push({ name: 'matpel.data' })
			})
			.catch(() => {
				this.$notify({
					group: 'foo',
					title: 'Error',
					type: 'error',
					text: 'Terjadi kesalahan.'
				})
			})
		}
	},
	components: {
		'matpel-form' : FormMatpel
	}
}
</script>