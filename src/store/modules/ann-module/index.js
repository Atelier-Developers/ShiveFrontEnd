import axios from 'axios';
import {ACCEPT_PENDING_PERSON, GET_PENDING_PERSON, LOGIN, REJECT_PENDING_PERSON} from "@/network/API";
import {CREATE_ANN, GET_ANNOUNCEMENTS, UPLOAD_ANN} from "../../../network/API";

const state = {
    announcements: [],
};

const mutations = {
    setAnnouncements(state, item) {
        state.announcements = item;
    }
};

const actions = {
    async createAnnouncement(context, announcement) {
        let response = await axios.post(CREATE_ANN, {
            title: announcement.title,
            description: announcement.desc,
        });


        let annId = response.data.pk;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        for (const file of announcement.files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', file.name);
            let uploadResponse = await axios.post(UPLOAD_ANN + annId, formData, config);
        }

    },
    async getAnnouncements(context, payload) {
        let response = await axios.get(GET_ANNOUNCEMENTS);
        context.commit('setAnnouncements', response.data);
    }

};

const getters = {
    announcements: (state) => state.announcements,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
