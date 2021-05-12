import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = process.env.MIX_APP_API_URL;

function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
        }
    }
    return '';
}

const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token
}

const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
if (csrfToken) {
    axios.defaults.headers.post['X-CSRF-TOKEN'] = csrfToken
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

Vue.use(VueAxios, axios)
