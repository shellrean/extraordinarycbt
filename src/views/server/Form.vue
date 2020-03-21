<template>
	<div>
		<div class="form-group">
			<label>Server name</label>
			<input type="text" class="form-control" :class="{'is-invalid' : errors.server_name }" placeholder="Kode server" v-model="server.server_name">
			<p class="text-danger" v-if="errors.server_name">{{ errors.server_name[0] }}
			</p>
		</div>
		<div class="form-group">
			<label>Sekolah</label>
			<select class="form-control" v-model="server.sekolah_id" :class="{ 'is-invalid' : errors.sekolah_id }">
				<option v-for="sekolah in sekolahs.data" :value="sekolah.id" v-text="sekolah.nama"></option>
			</select>
		</div>
		<div class="form-group">
			<label>Desripsi</label>
			<input type="text" class="form-control" :class="{ 'is-invalid' : errors.description }" placeholder="Deskripsi" v-model="server.description">
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	name: 'FormServer',
	created() {
		this.getAllSekolah()
	},
	computed: {
		...mapState(['errors']),
		...mapState('server', {
			server: state => state.server
		}),
		...mapState('sekolah', {
			sekolahs: state => state.sekolah
		}),
	},
	methods: {
		...mapMutations('server',['CLEAR_FORM']),
		...mapActions('sekolah', ['getAllSekolah', ]),
	},
	destroyed() {
		this.CLEAR_FORM()
	}
}
</script>