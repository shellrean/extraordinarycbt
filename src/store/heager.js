import $axios from '../api.js'

const state = () => ({
	
})

const mutations = {
	
}

const actions = {
    generateHasilUjian({ commit, state }, payload) {
        return new Promise(( resolve, reject) => {
            commit('SET_LOADING', true, { root: true })
            $axios.get(`/heager/generate/hasil-ujian`)
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