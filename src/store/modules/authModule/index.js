import axios from 'axios';
import {LOGIN, SIGNUP} from "@/network/API";

const state = {
    token: localStorage.getItem("ShiveToken") || '',
};

const mutations = {
    setToken(state, payload) {
        state.token = payload;
    }
};

const actions = {
    async login(context, payload) {
        try {
            let response = await axios.post(LOGIN, payload);
            context.commit("setToken", "Token " + response.data.token);
            localStorage.setItem("ShiveToken", state.token);
            axios.defaults.headers.common['Authorization'] = state.token;
        } catch (e) {
            if (e.response.status === 400) {
                throw Error("نام کاربری یا رمز عبور اشتباه است!");
            } else if (e.response.status === 401 ){
                throw Error('اکانت شما هنوز تایید نشده است!');
            } else if (e.response.status >= 500) {
                throw Error("خطا در برقزاری ارتباط با سرور!");
            }
        }

    },
    async signUp(context, payload) {
        try {
            let response = await axios.post(SIGNUP, payload);
        } catch (e) {
            if (e.response.status === 409) {
                throw Error("قبلا ثبت نام شده است!");
            } else if (e.response.status >= 500) {
                throw Error("خطا در برقزاری ارتباط با سرور!")
            }
        }
    },
    logout(context) {
        axios.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem("ShiveToken");
        context.commit('setToken', "");
    },
};

const getters = {
    isAuthenticated: (state) => {
        return state.token !== ""
    }
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
