import Vue from 'vue';
import axios from 'axios';
import { createRouter, createWebHistory, NavigationGuard, Router } from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Posts from './views/Posts.vue';
import Rough from './views/Rough.vue';

import { isTokenExpired } from "./utils";

// import RouterComponent from './components/RouterComponent.vue';
// Vue.use(Router);

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/rough',
        name: 'Rough',
        component: Rough,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/feed',
        name: 'Posts',
        component: Posts,
        meta: {
            requiresAuth: true, // to specify authentication requirement
        },
    }
]

// router.beforeEach((to, from, next) => {
const beforeEachGuard: NavigationGuard = async (to, from, next) => {
    // const isAuthenticated = Boolean(localStorage.getItem('user.access'));   /* Implement your authentication check logic here */
    // const isTokenExpired = isTokenExpired();   /* Implement your authentication check logic here */
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    // if (requiresAuth && !isAuthenticated) {
    if (requiresAuth && await isTokenExpired()) {
        localStorage.setItem('user.access', '')
        next('/login'); // Redirect to login page if authentication is required but not authenticated
    }
    
    else next(); // Proceed to the next route
};
// });

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(beforeEachGuard);

export default router;