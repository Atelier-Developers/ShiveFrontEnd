import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Signup from "@/views/Signup";
import PersonManagement from "@/views/PersonManagment";
import TeamManagement from "@/views/TeamManagement";
import PresentPage from "../views/PresentPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/user-management',
        name: 'UserManagement',
        component: PersonManagement
    },
    {
        path: '/team-management',
        name: 'TeamManagement',
        component: TeamManagement
    },
    {
        path: '/present-page',
        name: 'PresentPage',
        component: PresentPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
