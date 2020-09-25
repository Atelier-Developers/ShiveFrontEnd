import axios from 'axios';
import {TEAMS_LIST} from "../../../network/API";

const state = {
    teams: []
};

const mutations = {
    setTeams (state, teams) {
        state.teams = teams;
    }
};

const actions = {
    async setTeam (context, payload) {
        let response = axios.get(TEAMS_LIST);
        console.log(response)
        await context.commit("setTeams", response.body);
    }
};

const getters = {
    teams: (state) => state.teams,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
