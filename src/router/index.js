import Vue from 'vue'
import VueRouter from 'vue-router'
import {ability} from "@/services/ability";
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: {
            name: "Announcement"
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login"),
        meta: {
            action: "access",
            resource: 'authenticate'
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import("@/views/Signup"),
        meta: {
            action: "access",
            resource: 'authenticate'
        }
    },
    {
        path: '/user-management',
        name: 'UserManagement',
        component: () => import("@/views/PersonManagment"),
        meta: {
            resource: 'user'
        }
    },
    {
        path: '/team-management',
        name: 'TeamManagement',
        component: () => import("@/views/TeamManagement"),
        meta: {
            resource: "team"
        }
    },
    {
        path: '/present-page',
        name: 'PresentPage',
        component: () => import("../views/PresentPage"),
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/suggestions-complaints-list',
        name: 'SuggestionsAndComplaintsList',
        component: () => import("../views/SuggestionsAndComplaintsList"),
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/assignment-list',
        name: 'AssignmentList',
        component: () => import("../views/AssignmentsList"),
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/assignment-upload',
        name: 'AssignmentUpload',
        component: () => import("../views/AssignmentUpload"),
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/suggestions-complaints-create',
        name: 'SuggestionsAndComplaintsCreate',
        component: () => import("../views/SuggestionsAndComplaintsCreate"),
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/team-present-page',
        name: 'TeamPresentPage',
        component: () => import("../views/TeamPresentPage"),
        meta: {
            action: 'read',
            resource: 'teampresentation'
        }
    },
    {
        path: '/team-create',
        name: 'TeamCreate',
        component: () => import("../views/TeamCreate"),
        meta: {
            action: "create",
            resource: "team"
        }
    },
    {
        path: '/team-edit/:id',
        name: 'TeamEdit',
        component: () => import("../views/TeamEdit"),
        meta: {
            action: "edit",
            resource: "team"
        }
    },
    {
        path: '/subject-management',
        name: 'SubjectManagement',
        component: () => import("../views/SubjectManagement"),
        meta: {
            resource: 'subject'
        }
    },
    {
        path: '/archived-presentation-page',
        name: 'ArchivedPresentationPage',
        component: () => import("../views/ArchivedPresentationPage"),
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/video-player',
        name: 'VideoPlayerPage',
        component: () => import('../views/VideoPlayerPage'),
    },
    {
        path: '/archive',
        name: 'Archive',
        component: () => import("../views/Archive"),
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/announcement',
        name: 'Announcement',
        component: () => import("../views/Announcement"),
        meta: {
            resource: 'all'
        }
    },
    {
        path: '/notAllowed',
        name: 'NotAllowed',
        component: () => import("../views/NotAllowed")
    },
    {
        path: '*',
        name: 'Error404',
        component: () => import("../views/Error404")
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const canNavigate = to.matched.some(route => {
        return ability.can(route.meta.action || 'read', route.meta.resource)
    });
    if (!canNavigate && to.name === "Announcement" && !store.getters["authModule/isAuthenticated"]) {
        next({name: "Login"});
    } else if (!canNavigate && to.name !== 'NotAllowed') {
        next({name: "NotAllowed"})
    } else {
        next()
    }
})

export default router
