import $axios from '../api.js'

const state = () => ({
	
})

const mutations = {

}

const actions = {
	submit({ commit }, payload) {
		localStorage.setItem('token',null)

		commit('SET_TOKEN',null,{ root: true } )
		commit('SET_LOADING', true, { root: true })
		return new Promise((resolve, reject) => {
			$axios.post('/login', payload)
			.then((response) => {
				if (response.data.status == 'success') {
					localStorage.setItem('token',response.data.token)
					commit('SET_TOKEN',response.data.token, { root: true })
					commit('SET_LOADING',false, { root: true })
				}
				else {
					commit('SET_ERRORS', { invalid: 'Username/password salah' } , { root: true })
					commit('SET_LOADING',false, { root: true })
				}
				resolve(response.data)
			})
			.catch((error) => {
				if (error.response.status == 422) {
					commit('SET_ERRORS',error.response.data.errors, { root: true})
				}
				commit('SET_LOADING',false, { root: true })
				reject(error)
			})
		})
	},
	loggedOut({ commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get('logout')
			.then((response) => {
				resolve(response.message)
			})
			.catch((err) => {
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