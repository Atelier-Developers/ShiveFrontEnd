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
        let response = await axios.get(TEAMS_LIST);
        await context.commit("setTeams", response.data);
        console.log(state.teams)
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
