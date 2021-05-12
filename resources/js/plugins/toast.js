import Vue from "vue";
import VueToast from "vue-toast-notification";

import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

Vue.mixin({
    methods: {

        show_msg: function (msg, type, position) {
            if (typeof position === 'undefined') {
                position = 'bottom-right';
            }
            if (typeof type === 'undefined') {
                type = 'warning';
            }
            Vue.$toast.open({
                message: msg,
                type: type,
                position: position,
                duration: 5000
            });
        },
    },
});
