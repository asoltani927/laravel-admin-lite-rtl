import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


import authStore from './modules/auth.store';
import categoryStore from './modules/category.store';
import dashboardStore from './modules/dashboard.store';
import mediaStore from './modules/media.store';
import usersStore from './modules/users.store';


export default new Vuex.Store({
    strict: true,
    modules: {
        authStore,
        categoryStore,
        dashboardStore,
        mediaStore,
        usersStore,
    },
});