import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VuePageTransition from 'vue-page-transition'
import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';
import ReadMore from 'vue-read-more';


Vue.config.productionTip = false
Vue.prototype.$axios = axios
const token = localStorage.getItem('ShiveToken');
if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
}
Vue.use(VuePageTransition);
Vue.use(abilitiesPlugin, ability(''));
Vue.use(ReadMore);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
