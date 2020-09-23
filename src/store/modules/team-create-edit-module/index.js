import axios from 'axios';

const state = {
    pending: [{
        pk: 1,
        name: 'محمد',
        student_no: "923847"
    },
        {
            pk: 2,
            name: 'امیر',
            student_no: "213123"
        }],
    teamMembers: [],
    selectableSubjects: [],
};

const mutations = {
    addPersonToTeam(state, item) {
        let value = state.pending.splice(state.pending.indexOf(item), 1)[0];
        state.teamMembers.push(value);
    },
    removePersonFromTeam(state, item) {
        let value = state.teamMembers.splice(state.teamMembers.indexOf(item), 1)[0];
        state.pending.push(value);
    },
};

const actions = {
    addPersonToTeam(context, payload) {
        context.commit("addPersonToTeam", payload);
    },
    removePersonFromTeam(context, payload) {
        context.commit("removePersonFromTeam", payload);
    },
};

const getters = {
    pending: (state) => state.pending,
    teamMembers: (state) => state.teamMembers,
    selectableSubjects: (state) => state.selectableSubjects,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
