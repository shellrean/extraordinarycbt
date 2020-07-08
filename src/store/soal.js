import $axios from '../api.js'

const state = () => ({
	soals: [],
	allSoals: [],
	soal: '',
	page: 1,
	from: 1
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.soals = payload
	},
	ASSIGN_DATA_ALL(state, payload) {
		state.allSoals = payload
	},
	SET_PAGE(state, payload) {
        state.page = payload
    },
    ASSIGN_FORM(state, payload) {
        state.soal = payload
	},
	SET_FROM_DATA(state, payload) {
		state.from = payload
	}
}

const actions = {
	getSoals({ commit, state }, payload) {
		let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
		return new Promise(( resolve, reject ) =>  {
			commit('SET_LOADING',true, { root: true })
			$axios.get(`/soal/banksoal/${payload.banksoal_id}?page=${state.page}&q=${search}&perPage=${perPage}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data)
				commit('SET_FROM_DATA', response.data.data.from)
				commit('SET_LOADING',false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING',false, { root: true })
				reject()
			})
		}) 
	},
	getAllSoal({ commit, state }, payload) {
		return new Promise(( resolve, reject ) =>  {
			$axios.get(`/all-soal/banksoal/${payload.banksoal_id}`)
			.then((response) => {
				commit('ASSIGN_DATA_ALL', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject()
			})
		}) 
	},
	getAllSoalAnalys({ commit, state }, payload) {
		return new Promise(( resolve, reject ) =>  {
			$axios.get(`/all-soal/banksoal/analys/${payload.banksoal_id}`)
			.then((response) => {
				commit('ASSIGN_DATA_ALL', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject()
			})
		})	
	},
	editSoalBanksoal({ commit, state }, payload ) {
		return new Promise(( resolve, reject) => {
			commit('SET_LOADING',true, { root: true })
			$axios.get(`/soal/${payload}`)
			.then((response) => {
				commit('ASSIGN_FORM', response.data.data)
				commit('SET_LOADING',false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING',false, { root: true })
				reject()
			})
		})
	},
	removeSoal({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING',true, { root: true })
			$axios.delete(`/soal/banksoal/${payload}`)
			.then((response) => {
				commit('SET_LOADING',false, { root: true })
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING',false, { root: true })
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