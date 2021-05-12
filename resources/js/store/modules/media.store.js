import axios from 'axios'
import catchHandle from '../catch'

export default {

    name: 'media',
    namespaced: true,

    state: {
        status: '',
        data: [],
        records: [],
        message: '',
    },

    getters: {
        isLoading: state => {
            return state.status === 'loading';
        },
    },

    actions: {
        async dlFile({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({
                    url: data.url,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    let fileLink = document.createElement('a');
                    fileLink.style.display = "none";
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', data.name);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                });
            })
        },

        async upload({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('request')
                const formData = new FormData()
                formData.append('file', data.file)
                if (data.thumbnail !== undefined) {
                    formData.append('thumbnail', data.thumbnail)
                }
                if (data.path !== undefined) {
                    formData.append('path', data.path)
                }
                if (data.is_public !== undefined) {
                    formData.append('is_public', data.is_public)
                }
                axios({
                    url: '/media',
                    data: formData,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                            commit('success', response.data.message)
                            resolve(response)
                        }
                    )
                    .catch((err) => {
                        commit('error', catchHandle(err))
                        reject(err)
                    })
            })
        }
    },

    mutations: {
        request(state) {
            state.status = 'loading'
        },
        success(state, data = []) {
            state.status = 'success'
            state.data = data
        },
        error(state, message) {
            state.status = 'error'
            state.message = (message !== undefined) ? message : ''
        },
    },
};
