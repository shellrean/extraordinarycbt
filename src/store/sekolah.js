import $axios from '../api.js'

const state = () => ({
	sekolah: [],
	sekola: {
		nis: '',
		nama: '',
		alamat: ''
	},
	page: 1,
	jurusan: []
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.sekolah = payload
	},
	ASSIGN_ALL_DATA(state, payload) {
		state.sekolah = payload
	},
	SET_PAGE(state, payload) {
		state.page = payload
	},
	ASSIGN_ALL_JURUSAN(state, payload) {
		state.jurusan = payload
	},
	ASSIGN_FORM(state, payload) {
		state.sekola = {
			nis: payload.nis,
			nama: payload.nama,
			alamat: payload.alamat
		}
	},
	CLEAR_FORM(state) {
		state.sekola = {
			nis: '',
			nama: '',
			alamat: ''
		}
	}
}

const actions = {
	getSekolah({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			let search = typeof payload != 'undefined' ? payload : ''
			$axios.get(`/sekolah?page=${state.page}&q=${search}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	getAllSekolah({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			$axios.get(`/all-sekolah`)
			.then((response) => {
				commit('ASSIGN_ALL_DATA', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	submitSekolah({ dispatch, commit, state }) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING',true, { root: true })
			$axios.post(`/sekolah`, state.sekola)
			.then((response) => {
				dispatch('getSekolah').then(() => {
					commit('SET_LOADING',false, { root: true })
					resolve(response.data)
				})
			})
			.catch((error) => {
				if(error.response.status == 422) {
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
				commit('SET_LOADING',false, { root: true })
				reject(error)
			})
		})
	},
	editSekolah({ commit }, payload ) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING',true, { root: true })
			$axios.get(`/sekolah/${payload}`)
			.then((response) => {
				commit('SET_LOADING',false, { root: true })
				commit('ASSIGN_FORM', response.data.data)
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING',false, { root: true })
				reject(err)
			})
		})
	},
	updateSekolah({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING',true, { root: true })
			$axios.put(`/sekolah/${payload}`, state.sekola)
			.then((response) => {
				commit('SET_LOADING',false, { root: true })
				commit('CLEAR_FORM')
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING',false, { root: true })
				reject(err)
			})
		})
	},
	removeSekolah({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			$axios.delete(`/sekolah/${payload}`)
			.then((response) => {
				dispatch('getSekolah').then(() => resolve())
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	getJurusans({ commit }) {
		return new Promise((resolve, reject) => {
			$axios.get(`/jurusan`)
			.then((response) => {
				commit('ASSIGN_ALL_JURUSAN', response.data)
			})
			.catch((err) => {
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