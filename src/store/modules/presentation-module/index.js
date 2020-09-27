import axios from 'axios';
import {
    DELETE_FILE_UPLOAD,
    GET_PRESENTATION_CURRENT,
    GET_PRESENTATION_TEAM,
    POST_COMMENT,
    PRESENTATION_FILE_UPLOAD,
    UPDATE_PRESENTATION
} from "../../../network/API";

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
        context.commit('setTeamPresentation', response.data[0]);
    },
    async getCurrentPresentation(context,) {
        let response = await axios.get(GET_PRESENTATION_CURRENT);
        context.commit('setCurrentPresentation', response.data[0]);
    },
    async postCommentForCurrentPresentation(context, payload) {
        let response = await axios.post(POST_COMMENT + payload.pk, payload.comment);
    },
    async uploadFileForTeamPresentation(context, payload) {
        const formData = new FormData();
        formData.append('file', payload.file);
        formData.append('name', payload.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let response = await axios.post(PRESENTATION_FILE_UPLOAD + payload.pk, formData, config);
    },
    async setDescriptionForTeamPresentation(context, payload) {
        let response = await axios.put(UPDATE_PRESENTATION + payload.pk, payload.description);
    },
    async deleteFileFromTeamPresentation(context, payload) {
        await axios.delete(DELETE_FILE_UPLOAD + payload);
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
