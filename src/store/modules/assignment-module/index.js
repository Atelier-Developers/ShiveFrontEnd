import axios from 'axios';
import {
    CREATE_ASSIGNMENTS,
    GET_ASSIGNMENT_SUBJECTS,
    GET_ASSIGNMENTS,
    UPLOAD_ASSIGNMENTS
} from "../../../network/API";
import moment from "jalali-moment";

const state = {
    subjects: [],
    assignments: [],
};

const mutations = {
    setAssignments(state, item) {
        state.assignments = item;
    },
    setSubjects(state, payload) {
        state.subjects = payload;
    }
};

const actions = {
    async createAssignment(context, assignment) {
        let response = await axios.post(CREATE_ASSIGNMENTS, {
            name: assignment.name,
            subjectId: assignment.subjectId,
        });


        let assignId = response.data.pk;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const formData = new FormData();
        formData.append('file', assignment.file);
        formData.append('title', assignment.file.name);
        let uploadResponse = await axios.post(UPLOAD_ASSIGNMENTS + assignId, formData, config);
    },

    async getSubjects(context) {
        let response = await axios.get(GET_ASSIGNMENT_SUBJECTS);
        console.log(response.data);
        context.commit("setSubjects", response.data);
    },


    async getAssignments(context, id) {
        let response = await axios.get(GET_ASSIGNMENTS + id);
        // response.data.forEach((p) => {
        //     //TODO: DEADLINE ATTRIBUTE CHANGE TO WHATEVER IT IS
        //     p.deadline = moment.from(p.deadline, 'en','YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
        // });
        context.commit("setAssignments", response.data);
    },

};

const getters = {
    subjects: (state) => state.subjects,
    assignments: (state) => state.assignments,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
