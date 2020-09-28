import axios from 'axios';
import {parseTime} from "vuetify/lib/components/VCalendar/util/timestamp";
import {CREATE_SUBJECT, DELETE_SUBJECT, GET_ALL_SUBJECT, UPDATE_SUBJECT} from "../../../network/API";

const state = {
    subjects: [],
};

const mutations = {
    setSubjects(state, subjects) {
        state.subjects = subjects
    },
    removeFromSubjects(state, item) {
        let value = state.subjects.splice(state.subjects.indexOf(item), 1)[0];
    },
    changeOneSubject(state, item) {
        state.subjects[state.subjects.indexOf(item.subject)].title = item.title;
    }
};

const actions = {
    async addToSubjects(context, payload) { // todo awaits?
        await axios.post(CREATE_SUBJECT, payload);
        let response = await axios.get(GET_ALL_SUBJECT);
        await context.commit("setSubjects", response.data)

    },
    async removeFromSubjects(context, payload) { // todo payload.id or payload
        await axios.delete(DELETE_SUBJECT + payload.pk)
        let response = await axios.get(GET_ALL_SUBJECT);
        context.commit("setSubjects", response.data)
    },
    async changeOneSubject(context, payload) {
        await axios.put(UPDATE_SUBJECT + payload.pk, {title: payload.title});
        let response = await axios.get(GET_ALL_SUBJECT);
        context.commit('setSubjects', response.data)
    },
    async getSubjects(context){
        let response = await axios.get(GET_ALL_SUBJECT);
        context.commit('setSubjects', response.data)
    }
};

const getters = {
    subjects: (state) => state.subjects,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
