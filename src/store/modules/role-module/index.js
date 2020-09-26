import {GET_ROLE,} from "@/network/API";
import axios from 'axios'

const state = {
    role: "",
};

const mutations = {
    setRole(state, payload) {
        state.role = payload;
    }
};

const actions = {
    async getRole(context) {
        let response = await axios.get(GET_ROLE);
        console.log(response.data.role)
        context.commit("setRole", response.data.role);
    },
};

const getters = {
    role: (state) => {
        return state.role
    }
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
