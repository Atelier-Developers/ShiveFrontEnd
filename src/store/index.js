import Vue from 'vue'
import Vuex from 'vuex'
import personModule from './modules/person-module'
import teamModule from './modules/team-module'
import teamCreateEditModule from './modules/team-create-edit-module'
import authModule from './modules/authModule'
import subjectModule from './modules/subject-module'
import roleModule from './modules/role-module'
import archiveModule from './modules/archive-module'
import presentationModule from './modules/presentation-module'
import annModule from './modules/ann-module'
import suggCompsModule from './modules/suggscomps-module'
import assignmentModule from './modules/assignment-module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        personModule,
        teamModule,
        teamCreateEditModule,
        authModule,
        presentationModule,
        subjectModule,
        roleModule,
        archiveModule,
        annModule,
        suggCompsModule,
        assignmentModule,
    }
})
