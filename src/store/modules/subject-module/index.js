import axios from 'axios';
import {parseTime} from "vuetify/lib/components/VCalendar/util/timestamp";

const state = {
    subjects: [{
        title: "تدریس مجازی"
    },
        {
            title: "شیوه‌ی نگارش رزومه"
        },
        {
            title: "شیوه‌ی ارائه تشریحی"
        }],
};

const mutations = {
    addToSubjects(state, item) {
        console.log(item);
        state.subjects.push(item);
    },
    removeFromSubjects(state, item) {
        let value = state.subjects.splice(state.subjects.indexOf(item), 1)[0];
    },
    changeOneSubject(state, item) {
        console.log(item);
        state.subjects[state.subjects.indexOf(item.subject)].title = item.title;
    }
};

const actions = {

    addToSubjects(context, payload) {
        context.commit('addToSubjects', payload);
    },
    removeFromSubjects(context, payload){
        context.commit('removeFromSubjects', payload);
    },
    changeOneSubject(context, payload) {
        context.commit('changeOneSubject', payload);
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
