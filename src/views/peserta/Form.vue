<template>
	<div>
		<div class="form-group">
			<label>Server</label>
			<v-select label="server_name" :options="servers.data" v-model="peserta.server_name" :reduce="server_name => server_name.server_name"></v-select>
			<p class="text-danger" v-if="errors.server_name">{{ errors.server_name[0] }}
			</p>
		</div>
		<div class="form-group">
			<label>Sesi</label>
			<input type="number" min="1" class="form-control" :class="{'is-invalid' : errors.sesi }" placeholder="Sesi ujian" v-model="peserta.sesi">
			<p class="text-danger" v-if="errors.sesi">{{ errors.sesi[0] }}
			</p>
		</div>
		<div class="form-group">
			<label>No ujian</label>
			<input type="text" class="form-control" :class="{'is-invalid' : errors.no_ujian }" placeholder="No ujian" v-model="peserta.no_ujian">
			<p class="text-danger" v-if="errors.no_ujian">{{ errors.no_ujian[0] }}
			</p>
		</div>
		<div class="form-group">
			<label>Nama peserta</label>
			<input type="text" class="form-control" :class="{ 'is-invalid' : errors.nama }" placeholder="Nama peserta" v-model="peserta.nama">
		</div>
		<div class="form-group">
			<label>Password</label>
			<input type="text" class="form-control" :class="{ 'is-invalid' : errors.password }" placeholder="Password" v-model="peserta.password">
		</div>
		<div class="form-group">
			<label>Jurusan</label>
			<v-select label="nama" :options="jurusans.data" v-model="peserta.jurusan_id" :reduce="nama => nama.id"></v-select>
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
	name: 'FormPeserta',
	components: {
        'v-select': vSelect
    },
    created() {
    	this.getAllServers()
    	this.getJurusans()
    },
	computed: {
		...mapState(['errors']),
		...mapState('peserta', {
			peserta: state => state.peserta
		}),
		...mapState('server', {
			servers: state => state.allServers
		}),
		...mapState('sekolah', {
			jurusans: state => state.jurusan
		})
	},
	methods: {
		...mapActions('server', ['getAllServers']),
		...mapActions('sekolah',['getJurusans']),
		...mapMutations('peserta',['CLEAR_FORM'])
	},
	destroyed() {
		this.CLEAR_FORM()
	}
}
</script>