import Vue from 'vue'
import Vuex from 'vuex'
import personModule from './modules/person-module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        personModule
    }
})
