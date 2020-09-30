import axios from 'axios';
import moment from 'jalali-moment'
import {
    GET_SELECTABLE_SUBJECTS,
    GET_SINGLE_TEAM,
    GET_TEAMLESS_USERS,
    TEAMS_CREATE,
    TEAMS_EDIT
} from "../../../network/API";

const state = {
    pending: [],
    teamMembers: [],
    singleTeam: {},
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
    setSelectableSubjects(state, item) {
        state.selectableSubjects = item;
    },
    setPending(state, item){
        state.pending = item;
    },
    setTeamMembers(state, item) {
        state.teamMembers = item;
    },
    setSingleTeam(state, item){
        state.singleTeam = item;
    }
};

const actions = {
    addPersonToTeam(context, payload) {
        context.commit("addPersonToTeam", payload);
    },
    removePersonFromTeam(context, payload) {
        context.commit("removePersonFromTeam", payload);
    },
    async getSelectableSubjects(context, payload){
        let response = await axios.get(GET_SELECTABLE_SUBJECTS);
        context.commit("setSelectableSubjects", response.data);
    },
    async getPending(context, payload) {
        let response = await axios.get(GET_TEAMLESS_USERS);
        context.commit("setPending", response.data);
    },
    async assignTeamMembers(context, payload) {
        context.commit("setTeamMembers", payload);
    },
    async sendTeamMembers(context, payload) {
        payload.deadline = moment.from(payload.deadline, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
        await axios.post(TEAMS_CREATE, payload);
    },
    async setSingleTeam(context, payload) {
        let response = await axios.get(GET_SINGLE_TEAM + payload);
        response.data.presentation.deadline = moment.from(response.data.presentation.deadline, 'en','YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
        context.commit("setSingleTeam", response.data);
    },
    async editTeamMembers(context, payload) {
        payload.deadline = moment.from(payload.deadline, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
        await axios.post(TEAMS_EDIT + payload.pk, payload);
    },
};

const getters = {
    pending: (state) => state.pending,
    teamMembers: (state) => state.teamMembers,
    selectableSubjects: (state) => state.selectableSubjects,
    singleTeam: (state) => state.singleTeam,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
