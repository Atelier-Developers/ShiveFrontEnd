import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Signup from "@/views/Signup";
import PersonManagement from "@/views/PersonManagment";
import TeamManagement from "@/views/TeamManagement";
import PresentPage from "../views/PresentPage";
import SubjectManagement from "../views/SubjectManagement";
import Archive from "../views/Archive";
import TeamCreate from "../views/TeamCreate";
import TeamEdit from "../views/TeamEdit";
import Announcement from "../views/Announcement";
import TeamPresentPage from "../views/TeamPresentPage";
import ArchivedPresentationPage from "../views/ArchivedPresentationPage";
import VideoPlayerPage from '../views/VideoPlayerPage';
import {ability} from "@/services/ability";

import Error404 from "../views/Error404";
import NotAllowed from "../views/NotAllowed";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            action: "access",
            resource: 'authenticate'
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: {
            action: "access",
            resource: 'authenticate'
        }
    },
    {
        path: '/user-management',
        name: 'UserManagement',
        component: PersonManagement,
        meta: {
            resource: 'user'
        }
    },
    {
        path: '/team-management',
        name: 'TeamManagement',
        component: TeamManagement,
        meta: {
            resource: "team"
        }
    },
    {
        path: '/present-page',
        name: 'PresentPage',
        component: PresentPage,
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/team-present-page',
        name: 'TeamPresentPage',
        component: TeamPresentPage,
        meta: {
            action: 'read',
            resource: 'teampresentation'
        }
    },
    {
        path: '/team-create',
        name: 'TeamCreate',
        component: TeamCreate,
        meta: {
            action: "create",
            resource: "team"
        }
    },
    {
        path: '/team-edit/:id',
        name: 'TeamEdit',
        component: TeamEdit,
        meta: {
            action: "edit",
            resource: "team"
        }
    },
    {
        path: '/subject-management',
        name: 'SubjectManagement',
        component: SubjectManagement,
        meta: {
            resource: 'subject'
        }
    },
    {
        path: '/archived-presentation-page',
        name: 'ArchivedPresentationPage',
        component: ArchivedPresentationPage,
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/video-player',
        name: 'VideoPlayerPage',
        component: VideoPlayerPage,
    },
    {
        path: '/archive',
        name: 'Archive',
        component: Archive,
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/announcement',
        name: 'Announcement',
        component: Announcement,
        meta: {
            resource: 'all'
        }
    }
        component: Announcement
    },
    {
        path: '*',
        name: 'Error404',
        component: Error404
    },
    {
        path: '/notAllowed',
        name: 'NotAllowed',
        component: NotAllowed
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const canNavigate = to.matched.some(route => {
        console.log(route.meta.resource)
        return ability.can(route.meta.action || 'read', route.meta.resource)
    })
    console.log(canNavigate)
    if (!canNavigate && to.name !== 'Login') {
        return next({name: "Login"})
    } else {
        next()
    }
})

export default router
