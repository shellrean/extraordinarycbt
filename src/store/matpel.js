import $axios from '../api.js'

const state = () => ({
	matpels: [],
    allMatpels: [],
    matpel: {
        kode_mapel: '',
        nama: '',
        jurusan_id: '',
        agama_id: '',
        correctors: ''
    },
	page: 1,
    from: 1
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.matpels = payload
	},
    ASSIGN_ALL_DATA(state, payload) {
        state.allMatpels = payload
    },
	SET_PAGE(state, payload) {
        state.page = payload
    },
    ASSIGN_FORM(state, payload) {
        state.matpel = {
            kode_mapel: payload.kode_mapel,
            nama: payload.nama,
            agama_id: payload.agama_id,
            correctors: payload.correctors_name,
            jurusan_id: payload.jurusans
        }
    },
    CLEAR_FORM(state) {
        state.matpel = {
            kode_mapel: '',
            nama: '',
            jurusan_id: '',
            agama_id: '',
            correctors: ''
        }
    },
    SET_FROM_DATA(state, payload) {
        state.from = payload
    }
}

const actions = {
	getMatpels({ commit, state }, payload) {
		let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
		return new Promise(( resolve, reject ) =>  {
            commit('SET_LOADING', true, { root: true })
			$axios.get(`/matpel?page=${state.page}&q=${search}&perPage=${perPage}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data)
                commit('SET_FROM_DATA', response.data.data.from)
                commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
            .catch((err) => {
                commit('SET_LOADING', true, { root: true })
                reject()
            })
		}) 
	},
    getAllMatpels({ commit, state }, payload) {
        return new Promise(( resolve, reject ) =>  {
            $axios.get(`/matpel/list`)
            .then((response) => {
                commit('ASSIGN_ALL_DATA', response.data)
                resolve(response.data)
            })
        }) 
    },
	submitMatpel({ dispatch, commit, state }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise((resolve, reject) => {
            $axios.post(`/matpel`, state.matpel)
            .then((response) => {
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
    editMatpel({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.get(`/matpel/${payload}`)
            .then((response) => {
                commit('SET_LOADING',false, { root: true })
                commit('ASSIGN_FORM', response.data.data)
                resolve()
            })
            .catch((err) => {
                commit('SET_LOADING',false, { root: true })
                reject()
            })
        })
    },
    updateMatpel({ dispatch, commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise((resolve, reject) => {
            $axios.put(`/matpel/${payload}`, state.matpel)
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
    removeMatpel({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true, { root: true })
            $axios.delete(`/matpel/${payload}`)
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