import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import fa from "vuetify/lib/locale/fa";


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#009fb7',
                accent: '#fed766',
                background: '#eeeeee',
            }
        },
        options: {
            customProperties: true
        },
    },
    icons: {
        iconfont: 'md',
    },
    lang: {
        current: 'fa',
        locales: {fa}
    },
    rtl: true
});
