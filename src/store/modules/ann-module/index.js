import axios from 'axios';
import {ACCEPT_PENDING_PERSON, GET_PENDING_PERSON, LOGIN, REJECT_PENDING_PERSON} from "@/network/API";
import {CREATE_ANN, UPLOAD_ANN} from "../../../network/API";

const state = {
    announcements: [],
};

const mutations = {

};

const actions = {
    async createAnnouncement(context, announcement) {
        let response = await axios.post(CREATE_ANN, {
            title: announcement.title,
            description: announcement.desc,
        });

        console.log(response);

        let annId = response.data.pk;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        let index = 0;
        for (index = 0; index < announcement.files.length; ++index) {
            let file = announcement.files[index]
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', file.name);
            let uploadResponse = await axios.post(UPLOAD_ANN + annId, formData, config);
        }
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
