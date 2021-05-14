require('./cookies');
require('./bootstrap');

import Vue from 'vue';
import store from './store'
import i18n from './plugins/i18n'
import './plugins'
import './components';
import routes  from './routes';

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

const app = new Vue({
    el: '#default-app',
    i18n,
    store,
    router
});