import axios from 'axios';
import {GET_PRESENTATION_CURRENT} from "../../../network/API";

const state = {
    teamPresentation: {},
    currentPresentation: {},
};

const mutations = {
    setTeamPresentation(state, item) {
        state.teamPresentation = item;
    },
    setCurrentPresentation(state, item) {
        state.currentPresentation = item;
    }
};

const actions = {
    async getTeamPresentation(context, payload) {
        let response = await axios.get(GET_PRESENTATION_CURRENT);
        context.commit('setTeamPresentation', payload);
    },
    async getCurrentPresentation(context, payload) {
        let response = await axios.get(GET_PRESENTATION_CURRENT);
        context.commit('setCurrentPresentation', response.data);
    }
};

const getters = {
    teamPresentation: (state) => state.teamPresentation,
    currentPresentation: (state) => state.currentPresentation
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
