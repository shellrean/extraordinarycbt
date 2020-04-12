import $axios from '../api.js'

const state = () => ({
    banksoals: [],
    allBanksoals: [],
    banksoal: '',
	page: 1
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.banksoals = payload
    },
    ASSIGN_ALL_DATA(state, payload){ 
        state.allBanksoals = payload
    },
	SET_PAGE(state, payload) {
        state.page = payload
    },
    ASSIGN_FORM(state, payload) {
        state.banksoal = payload
    }
}

const actions = {
	getBanksoals({ commit, state }, payload) {
		let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
		return new Promise(( resolve, reject ) =>  {
            commit('SET_LOADING', true, { root: true })
			$axios.get(`/banksoal?page=${state.page}&q=${search}&perPage=${perPage}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data)
                commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
            .catch((err) => {
                commit('SET_LOADING', false, { root: true })
                reject()
            })
		}) 
    },
    getAllBanksoals({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? payload : ''
		return new Promise(( resolve, reject ) =>  {
			$axios.get(`/banksoal/get-all`)
			.then((response) => {
				commit('ASSIGN_ALL_DATA', response.data)
				resolve(response.data)
			})
		}) 
    },
    getBanksoal({ commit, state }, payload) {
        return new Promise(( resolve, reject ) => {
            commit('SET_LOADING', true, { root: true })
            $axios.get(`/banksoal/${payload}`)
            .then((response) => {
                commit('ASSIGN_FORM', response.data)
                commit('SET_LOADING', false, { root: true })
                resolve()
            })
            .catch((err) => {
                reject()
            })
        })
    },
	addBanksoal({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.post(`/banksoal`, payload)
            .then((response) => {
                commit('CLEAR_ERRORS', '', { root: true })
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING',false, { root: true })
            })
        })
    },
    addSoalBanksoal({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.post(`/soal/banksoal`, payload) 
            .then((response) => {
                commit('SET_LOADING', false, { root: true})
                resolve(response.data)
            })
            .catch((error) => {
                commit('SET_LOADING', false, { root: true })
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                else {
                    reject()
                }
            })
        })
    },
    getDataById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.get(`/banksoal/${payload}`)
            .then((response) => {
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((error) => {
                if(error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.erros, { root: true })
                }
                commit('SET_LOADING',false, { root: true })
                reject(error)
            })
        })
    },
    updateSoalBanksoal({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.post(`/soal/banksoal/edit`, payload) 
            .then((response) => {
                commit('CLEAR_ERRORS','', { root: true })
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING',false, { root: true })
                reject()
            })
        })
    },
    removeBanksoal({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.delete(`/banksoal/${payload}`)
            .then((response) => {
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((err) => {
                commit('SET_LOADING',false, { root: true })
                reject(err)
            })
        })
    },
    updateDataBanksoal({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.put(`/banksoal/${payload.id}`, payload.data)
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
    getMyBanksoal({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.get('/banksoal/active')
            .then((response) => {
                commit('ASSIGN_ALL_DATA', response.data)
                commit('SET_LOADING',false, { root: true })
				resolve(response.data)
            })
            .catch((err) => {
                commit('SET_LOADING',false, { root: true })
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