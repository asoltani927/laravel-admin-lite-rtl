import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import enUs from '../lang/en-US';
import faIR from '../lang/fa-IR'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'fa-IR',
    messages: {
        'fa-IR': faIR
    }
})

export default i18n
