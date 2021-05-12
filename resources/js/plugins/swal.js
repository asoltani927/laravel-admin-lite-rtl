// main.js
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);


Vue.mixin({
    methods: {
        swal_msg: function(title, msg, type) {
            if (typeof type === 'undefined') {
                type = 'warning';
            }
            this.$swal.fire({
                icon: type,
                title: title,
                text: msg,
            });
        },
        swal_msg_timer: function(msg, type, position) {
            if (typeof position === 'undefined') {
                position = 'center';
            }
            if (typeof type === 'undefined') {
                type = 'success';
            }
            this.$swal.fire({
                position: position,
                icon: type,
                title: msg,
                showConfirmButton: false,
                timer: 1500
            })
        }
    },
});