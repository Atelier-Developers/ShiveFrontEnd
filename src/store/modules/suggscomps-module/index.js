import axios from 'axios';
import {CREATE_SUGGS_COMPS, GET_SUGGS_COMPS, UPLOAD_SUGGS_COMPS} from "../../../network/API";

const state = {
    suggsComps: [],
};

const mutations = {
    setSuggestionsComplaints(state, item) {
        state.suggsComps= item;
    }
};

const actions = {
    async createSuggestionsComplaints(context, suggComp) {
        let response = await axios.post(CREATE_SUGGS_COMPS, {
            title: suggComp.title,
            description: suggComp.desc,
        });


        let suggsCompsId = response.data.pk;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        for (const file of suggComp.files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', file.name);
            let uploadResponse = await axios.post(UPLOAD_SUGGS_COMPS + suggsCompsId, formData, config);
        }

    },
    async getSuggComps(context, payload) {
        let response = await axios.get(GET_SUGGS_COMPS);
        context.commit('setSuggestionsComplaints', response.data);
    }

};

const getters = {
    suggsComps: (state) => state.suggsComps,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
