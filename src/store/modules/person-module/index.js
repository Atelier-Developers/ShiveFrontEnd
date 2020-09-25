import axios from 'axios';
import {GET_PENDING_PERSON, LOGIN} from "@/network/API";

const state = {
    pending: [],
    accepted: [],
    rejected: [],
};

const mutations = {
    acceptPerson(state, item) {
        let value = state.pending.splice(state.pending.indexOf(item), 1)[0];
        state.accepted.push(value);
    },
    rejectPerson(state, item) {
        let value = state.pending.splice(state.pending.indexOf(item), 1)[0];
        state.rejected.push(value);
    },
    removeAccepted(state, item) {
        let value = state.accepted.splice(state.accepted.indexOf(item), 1)[0];
        state.pending.push(value);
    },
    removeRejected(state, item) {
        let value = state.rejected.splice(state.rejected.indexOf(item), 1)[0];
        state.pending.push(value);
    },
    setPendingPerson(state, items) {
        state.pending = items;
    }
};

const actions = {
    async getPendingPersons(context) {
        let response = await axios.get(GET_PENDING_PERSON);
        context.commit("setPendingPerson", response.data);
    },
    acceptPerson(context, payload) {
        context.commit("acceptPerson", payload);
    },
    rejectPerson(context, payload) {
        context.commit("rejectPerson", payload);
    },
    removeAccepted(context, payload) {
        context.commit("removeAccepted", payload);
    },
    removeRejected(context, payload) {
        context.commit("removeRejected", payload);
    },

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
