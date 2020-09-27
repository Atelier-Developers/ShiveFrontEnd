import axios from 'axios';
import {GET_PRESENTATION_CURRENT, GET_PRESENTATION_TEAM} from "../../../network/API";

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
    },
    addCommentToCurrentPresentation(state, item) {
        state.currentPresentation.comments.push(item);
    },
    addPostToTeamPresentation(state, item) {
        state.teamPresentation.files.push(item);
    },
    setTeamPresentationDescription(state, item) {
        state.teamPresentation.description = item;
    },
    removeFileFromTeamPresentation(state, item) {
        let value = state.teamPresentation.files.splice(state.teamPresentation.files.indexOf(item), 1)[0];
    }
};

const actions = {
    async getTeamPresentation(context,) {
        let response = await axios.get(GET_PRESENTATION_TEAM);
        context.commit('setTeamPresentation', response.data);
    },
    async getCurrentPresentation(context,) {
        let response = await axios.get(GET_PRESENTATION_CURRENT);
        context.commit('setCurrentPresentation', response.data);
    },
    postCommentForCurrentPresentation(context, payload) {
        context.commit('addCommentToCurrentPresentation', payload);
    },
    uploadFileForTeamPresentation(context, payload) {
        context.commit('addPostToTeamPresentation', payload);
    },
    setDescriptionForTeamPresentation(context, payload) {
        context.commit('setTeamPresentationDescription', payload);
    },
    deleteFileFromTeamPresentation(context, payload) {
        context.commit('removeFileFromTeamPresentation', payload)
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
