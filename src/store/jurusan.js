import $axios from '../api.js'

const state = () => ({
	jurusans: [],
	jurusan: {
		nama: ''
	},
	page: 1,
	from: 1
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.jurusans = payload
	},
	SET_PAGE(state, payload) {
		state.page = payload
	},
	SET_FROM_DATA(state, payload) {
		state.from = payload
	},
	ASSIGN_FORM(state, payload) {
		state.jurusan = {
			nama: payload.nama
		}
	},
	CLEAR_FORM(state) {
		state.jurusan = {
			name: ''
		}
	}
}

const actions = {
	getJurusans({ commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
		let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''

        return new Promise(async ( resolve, reject) => {
        	try {
        		let network = await $axios.get(`/jurusans?page=${state.page}&q=${search}&perPage=${perPage}`)

        		commit('ASSIGN_DATA', network.data.data)
     			commit('SET_FROM_DATA', network.data.data.from)
     			commit('SET_LOADING', false, { root: true })

     			resolve(network.data)
        	} catch (error) {
        		commit('SET_LOADING', false, { root: true })

        		reject(error.response.data)
        	}
        })
	},
	submitJurusan({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })

		return new Promise(async ( resolve, reject) => {
        	try {
        		let network = await $axios.post(`jurusans`, state.jurusan)

        		commit('CLEAR_FORM')
        		commit('SET_LOADING', false, { root: true })
        		resolve(network.data)
        	} catch(error) {
        		if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
        		commit('SET_LOADING', false, { root: true })
        		reject(error.response.data)
        	}
        })
	},
	editJurusan({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })

		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`jurusans/${payload}`)

				commit('SET_LOADING', false, { root: true })
				commit('ASSIGN_FORM', network.data.data)
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response)
			}
		})
	},
	updateJurusan({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })

		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.put(`jurusans/${payload}`, state.jurusan)

				commit('CLEAR_FORM')
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	removeJurusan({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })

		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.delete(`jurusans/${payload}`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}