import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
const token = localStorage.getItem('ShiveToken');
if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
}

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
