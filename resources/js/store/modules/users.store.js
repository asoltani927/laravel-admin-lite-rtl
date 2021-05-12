import axios from 'axios'
import catchHandle from '../catch'
import Vue from "vue";

export default {
    name: 'users',
    namespaced: true,
    state: {
        status: '',
        fullData: [],
        data: [],
        message: '',
    },
    getters: {
        isLoading: state => {
            return state.status === 'loading';
        },
    },
    actions: {
        async update({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({url: '/users/' + data.id, data: data, method: 'PUT'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
                        commit('error', catchHandle(err))
                        reject(err)
                    })
            })
        },
        async index({commit}, params) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({url: '/users?' + Vue.httpBuildQuery(params), method: 'GET'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        async destroy({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({url: '/users/' + data, method: 'DELETE'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
                        commit('error', catchHandle(err))
                        reject(err)
                    })
            })
        },
        async show({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({url: '/users/' + data.id, data: data, method: 'GET'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
                        commit('error', catchHandle(err))
                        reject(err)
                    })
            })
        },
    },

    mutations: {
        request(state) {
            state.status = 'loading'
        },
        //
        success(state, data = {data: '', message: ''}) {
            state.status = 'success'
            state.fullData = data
            if (data.message !== undefined)
                state.message = data.message
            if (data.data !== undefined)
                state.data = data.data
            if (data !== undefined)
                state.fullData = data
        },
        //
        error(state, message) {
            state.status = 'error'
            state.message = (message !== undefined) ? message : ''
        },
    },
};
