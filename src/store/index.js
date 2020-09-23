import Vue from 'vue'
import Vuex from 'vuex'
import personModule from './modules/person-module'
import teamModule from './modules/team-module'
import teamCreateEditModule from './modules/team-create-edit-module'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        personModule,
        teamModule,
        teamCreateEditModule,
    }
})
