<template>
	<div>
		<div class="form-group">
			<label>No Induk sekolah</label>
			<input type="text" class="form-control rounded-0" :class="{'is-invalid' : errors.nis }" placeholder="No Induk sekolah" v-model="sekola.nis">
			<p class="text-danger" v-if="errors.nis">{{ errors.nis[0] }}</p>
		</div>
		<div class="form-group">
			<label>Nama sekolah</label>
			<input type="text" class="form-control rounded-0" :class="{ 'is-invalid' : errors.nama }" placeholder="Nama sekolah" v-model="sekola.nama">
			<p class="text-danger" v-if="errors.nama">{{ errors.nama[0] }}
			</p>
		</div>
		<div class="form-group">
			<label>Alamat lengkap</label>
			<textarea class="form-control rounded-0" :class="{ 'is-invalid' : errors.alamat }" placeholder="Alamat lengkap" v-model="sekola.alamat"></textarea>
			<p class="text-danger" v-if="errors.alamat">{{ errors.alamat[0] }}
			</p>
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name: 'FormSekolah',
	computed: {
		...mapState(['errors']),
		...mapState('sekolah', {
			sekola: state => state.sekola
		})
	},
	methods: {
		...mapMutations('sekolah', ['CLEAR_FORM'])
	},
	destroyed() {
		this.CLEAR_FORM()
	}
}
</script>