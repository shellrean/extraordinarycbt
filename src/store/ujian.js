import $axios from '../api.js'

const state = () => ({
	ujians: [],
	ujianAll: [],
	pesertas: [],
	page: 1,
	hasilUjian: [],
	essies: [],
	sekolahs: [],
	banksoals: []
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.ujians = payload
	},
	ASSIGN_DATA_ALL(state, payload) {
		state.ujianAll = payload
	},
	SET_PAGE(state, payload) {
		state.ujians = payload
	},
	ASSIGN_PESERTA_UJIAN(state, payload) {
		state.pesertas = payload
	},
	ASSIGN_HASIL_UJIAN(state, payload) {
		state.hasilUjian = payload
	},
	ASSIGN_DATA_SEKOLAH(state, payload) {
		state.sekolahs = payload
	},
	ASSIGN_JAWABAN_ESAY(state, payload) {
		state.essies = payload
	},
	ASSIGN_DATA_BANKSOAL(state, payload) {
		state.banksoals = payload
	}
}

const actions = {
	getUjians({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? payload: ''
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian?page=${state.page}&q=${search}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject()
			})
		})
	},
	getAllUjians({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? payload: ''
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/`)
			.then((response) => {
				commit('ASSIGN_DATA_ALL', response.data.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject()
			})
		})
	},
	getSekolahByJadwal({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/result/sekolah/jadwal/${payload}`)
			.then((response) => {
				commit('ASSIGN_DATA_SEKOLAH', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	getHasilByJadwalAndSekolah({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/ujian/result/sekolah/hasil?page=${state.page}`,payload)
			.then((response) => {
				commit('ASSIGN_HASIL_UJIAN', response.data.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	getUjianByBanksoal({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/banksoal/${payload}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data)
				resolve(response.data)
			})
		})
	},
	getHasilUjianByFilter({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/hasil/filter`,payload)
			.then((response) => {
				commit('ASSIGN_DATA', response.data)
				resolve(response.data)
			})
		})
	},
	addUjian({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/ujian`, payload) 
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((error) => {
				if (error.response.status == 422) {
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
				commit('SET_LOADING', false, { root: true })
				reject()
			})
		})
	},
	setStatus({ state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/ujian/set-status`, payload)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				
			})
		})
	},
	changeToken({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/ujian/change-token`, payload)
			.then((response) => {
				resolve(response.data)
			})
		})
	},
	getPesertas({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/get-peserta/${payload}`)
			.then((response) => {
				commit('ASSIGN_PESERTA_UJIAN', response.data)
				resolve(response.data)
			})
			.catch((error) => {

			})
		})
	},
	getHasilPeserta({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/hasil/${payload}`)
			.then((response) => {
				commit('ASSIGN_HASIL_UJIAN', response.data)
				resolve(response.data)
			})
		})
	},
	submitNilaiEsay({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/ujian/esay/input`, payload)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	getExistsEsay({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/esay/exists`, payload)
			.then((response) => {
				commit('ASSIGN_DATA', response.data)
				resolve()
			})
			.catch((err) => {
				reject()
			})
		})
	},
	getExistsByBanksoal({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/esay/koreksi/${payload}`)
			.then((response) => {
				commit('ASSIGN_JAWABAN_ESAY', response.data.data)
				resolve()
			})
			.catch((err) => {
				reject()
			})
		})
	},
	setRujukan({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/ujian/esay/rujukan`, payload)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
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