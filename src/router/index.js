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
import TeamCreate from "../views/TeamCreate";
import TeamEdit from "../views/TeamEdit";
import Announcement from "../views/Announcement";
import TeamPresentPage from "../views/TeamPresentPage";
import ArchivedPresentationPage from "../views/ArchivedPresentationPage";

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
        path: '/team-present-page',
        name: 'TeamPresentPage',
        component: TeamPresentPage
    },
    {
        path: '/team-create',
        name: 'TeamCreate',
        component: TeamCreate
    },
    {
        path: '/team-edit/:id',
        name: 'TeamEdit',
        component: TeamEdit
    },
    {
        path: '/subject-management',
        name: 'SubjectManagement',
        component: SubjectManagement
    },
    {
        path: '/archived-presentation-page',
        name: 'ArchivedPresentationPage',
        component:ArchivedPresentationPage
    },
    {
        path: '/archive',
        name: 'Archive',
        component: Archive
    },
    {
        path: '/announcement',
        name: 'Announcement',
        component: Announcement
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
