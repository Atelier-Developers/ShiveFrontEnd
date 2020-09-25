import axios from 'axios';
import {TEAMS_DELETE, TEAMS_LIST} from "../../../network/API";

const state = {
    teams: []
};

const mutations = {
    setTeams(state, teams) {
        state.teams = teams;
    },
    deleteTeamFromList(state, id) {
        state.teams = state.teams.filter((t) => t.pk !== id);
    }
};

const actions = {
    async setTeam(context) {
        let response = await axios.get(TEAMS_LIST);
        await context.commit("setTeams", response.data);
    },
    async deleteSingleTeam(context, payload) {
        let response = await axios.delete(TEAMS_DELETE + payload);
        await context.commit("deleteTeamFromList", payload);
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
