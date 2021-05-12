import Vue from 'vue'
import httpBuildQueryInstance from 'http-build-query'


const httpBuildQuery = {
    install(vue, opts) {
        const instance = httpBuildQueryInstance
        vue.httpBuildQuery = instance
        vue.prototype.$httpBuildQuery = instance
    }
}

Vue.use(httpBuildQuery)
