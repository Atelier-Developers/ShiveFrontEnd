import axios from 'axios';
import {ACCEPT_PENDING_PERSON, GET_PENDING_PERSON, LOGIN, REJECT_PENDING_PERSON} from "@/network/API";
import {GET_PRESENTATIONS, GET_SEMESTERS} from "../../../network/API";

const state = {
    semesters: [],
    presentations: [],
};

const mutations = {
    setSemesters(state, payload) {
        state.semesters = payload;
    },

    setSemesters(state, payload) {
        state.semesters = payload;
    },
};

const actions = {
    async getSemesters(context) {
        let response = await axios.get(GET_SEMESTERS);
        context.commit("setSemesters", response.data);
    },

    async getPresentations(context) {
        let response = await axios.get(GET_PRESENTATIONS);
        context.commit("setPresentations", response.data);
    },
};

const getters = {
    pending: (state) => state.pending,
    accepted: (state) => state.accepted,
    rejected: (state) => state.rejected,
    semesters: (state) => state.semesters,
    presentations: (state) => state.presentations,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
