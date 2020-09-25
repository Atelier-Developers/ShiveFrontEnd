import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Signup from "@/views/Signup";
import PersonManagement from "@/views/PersonManagment";
import TeamManagement from "@/views/TeamManagement";
import PresentPage from "../views/PresentPage";
import TeamCreateEdit from "../views/TeamCreateEdit";
import SubjectManagement from "../views/SubjectManagement";
import Archive from "../views/Archive";

Vue.use(VueRouter)

const routes = [
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
    },
    {
        path: '/team-create-edit',
        name: 'TeamCreateEdit',
        component: TeamCreateEdit
    },
    {
        path: '/subject-management',
        name: 'SubjectManagement',
        component: SubjectManagement
    },
    {
        path: '/archive',
        name: 'Archive',
        component: Archive
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
