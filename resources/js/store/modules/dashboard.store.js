import axios from 'axios'
import catchHandle from '../catch'
import Vue from "vue";

export default {
    name: 'dashboard',
    namespaced: true,
    state: {
        status: '',
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
                axios({url: '/dashboard?' + Vue.httpBuildQuery(params), method: 'GET'})
                    .then((resp) => {
                        commit('success', resp.data)
                        resolve(resp)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }
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
        },
        //
        error(state, message) {
            state.status = 'error'
            state.message = (message !== undefined) ? message : ''
        },
    },
};
