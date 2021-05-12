import axios from 'axios'
import catchHandle from '../catch'
import Vue from "vue";

export default {
    name: 'category',
    namespaced: true,
    state: {
        status: '',
        fullData: {},
        data: [],
        message: '',
    },
    getters: {
        isLoading: state => {
            return state.status === 'loading';
        },
    },
    actions: {
        async index({commit}, params) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({url: '/category?' + Vue.httpBuildQuery(params), method: 'GET'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        async store({commit}, params) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({url: '/category', data: params, method: 'POST'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        async update({commit}, params) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({url: '/category/' + params.id, data: params, method: 'PUT'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        async destroy({commit}, params) {
            return new Promise((resolve, reject) => {
                commit('request')
                axios({url: '/category/' + params.id, method: 'DELETE'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
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
