import axios from 'axios'
import catchHandle from '../catch'

export default {
    name: 'auth',
    namespaced: true,
    state: {
        status: '',
        data: [],
        message: '',
        token: localStorage.getItem('token') || '',
        user: null,
    },
    getters: {
        isAuthenticated: state => {
            return !!state.token && state.user !== null;
        },
        isLoading: state => {
            return state.status === 'loading';
        },
        userInfo: state => {
            return state.user;
        }
    },
    actions: {
        async login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({ url: '/auth/login', data: user, method: 'POST' })
                    .then((resp) => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('success', {
                            user: user,
                            token: token,
                            message: resp.data.message
                        })
                        resolve(resp)
                    })
                    .catch((err) => {
                        localStorage.removeItem('token')
                        axios.defaults.headers.common['Authorization'] = ''
                        commit('reset')
                        reject(catchHandle(err))
                    })
            })
        },

        async logout({ commit }) {
            axios({ url: '/auth/logout', method: 'POST' })
                .then((resp) => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    axios.defaults.headers.common['Authorization'] = ''
                    commit('reset')
                    resolve(resp)
                })
                .catch((err) => {
                    reject(catchHandle(err))
                })
        },
    },

    mutations: {
        request(state) {
            state.status = 'loading'
        },
        //
        success(state, data = { token: '', user: '', message: '' }) {
            state.status = 'success'
            if (data.token !== undefined)
                state.token = data.token
            if (data.user !== undefined)
                state.user = data.user
            if (data.message !== undefined)
                state.message = data.message
        },
        //
        error(state, message) {
            state.status = 'error'
            state.message = (message !== undefined) ? message : ''
        },
        //
        reset(state) {
            state.status = ''
            state.message = ''
            state.token = ''
            state.user = null
        },
    },
};