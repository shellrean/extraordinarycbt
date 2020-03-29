import $axios from '../api.js'

const state = () => ({
	pesertas: [],
	peserta: {
		server_name: '',
		no_ujian: '',
		nama: '',
		password: '',
		jurusan_id: '',
		sesi: '',
		agama_id: ''
	},
	page: 1,
	uploadPercentage: 0
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.pesertas = payload
	},
	SET_PAGE(state, payload) {
		state.page = payload
	},
	ASSIGN_FORM(state, payload) {
		state.peserta = {
			server_name: payload.server_name,
			no_ujian: payload.no_ujian,
			nama: payload.nama,
			password: payload.password,
			jurusan_id: payload.jurusan_id,
			sesi: payload.sesi,
			agama_id: payload.agama_id
		}
	},
	CLEAR_FORM(state) {
		state.peserta = {
			server_name: '',
			no_ujian : '',
			nama: '',
			password: '',
			jurusan_id: '',
			sesi: '',
			agama_id: ''
		}
	},
	UPLOAD_PROGRESS_BAR(state, payload) {
		state.uploadPercentage = payload
	}
}

const actions = {
	getPesertas({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? (typeof payload.search != 'undefined' ? payload.search : '') : ''
		let sekolah = typeof payload != 'undefined' ? (typeof payload.sekolah != 'undefined' ? payload.sekolah : '') : ''
		
		return new Promise(( resolve, reject ) => {
			commit('SET_LOADING', true, { root: true })
			$axios.get(`/peserta?page=${state.page}&q=${search}&s=${sekolah}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	submitPeserta({ commit, state }) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/peserta`, state.peserta)
			.then((response) => {
				commit('SET_LOADING',false, { root: true })
                resolve()
			})
			.catch((error) => {
				if (error.response.status == 422) {
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
				commit('SET_LOADING', false, { root: true })
			})
		})
	},
	removePeserta({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.delete(`/peserta/${payload}`)
			.then((response) => {
				commit('SET_LOADING',false, { root: true })
                resolve()
			})
			.catch((err) => {
				commit('SET_LOADING',false, { root: true })
                reject()
			})
		})
	},
	uploadPeserta({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING',true, { root: true })
			$axios.post(`/peserta/upload`, payload, 
				{
			      headers: {
			          'Content-Type': 'multipart/form-data'
			      },
			      onUploadProgress: function( progressEvent ) {
			        commit('UPLOAD_PROGRESS_BAR',parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 )))
			      }.bind(this)
			    }
			)
			.then((response) => {
				commit('SET_LOADING',false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING',false, { root: true })
				reject()
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}