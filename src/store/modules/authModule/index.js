import axios from 'axios';
import {LOGIN, SIGNUP} from "@/network/API";

const state = {
    token: "",
};

const mutations = {
    setToken(state, payload) {
        state.token = payload;
    }
};

const actions = {
    async login(context, payload) {
        let response = await axios.post(LOGIN, payload);
        context.commit("setToken", "Token " + response.data.token);
    },
    async signUp(context, payload) {
        let response = await axios.post(SIGNUP, payload);
    }

};

const getters = {
    pending: (state) => state.pending,
    accepted: (state) => state.accepted,
    rejected: (state) => state.rejected
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
