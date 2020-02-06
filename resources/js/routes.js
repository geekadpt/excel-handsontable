/*
 |-------------------------------------------------------------------------------
 | routes.js
 |-------------------------------------------------------------------------------
 | Contains all of the routes for the application
 */

/**
 * Imports Vue and VueRouter to extend with the routes.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Extends Vue to use Vue Router
 */
Vue.use( VueRouter )

/**
 * Makes a new VueRouter that we will use to run all of the routes for the app.
 */
import store from './store.js';

function requireAuth(to, from, next) {

    function proceed() {
        // 如果用户信息已经加载并且不为空则说明该用户已登录，可以继续访问路由，否则跳转到首页
        // 这个功能类似 Laravel 中的 auth 中间件
        if (store.getters.getMyInfoStatus() === 2 && store.getters.getMyInfo  !== '') {
            next();
        } else {
            next('/login');
        }
    }
    let token = localStorage.getItem('Authorization');

    if (token === 'null' || token === '') {
        proceed()
    }else {
        if(store.getters.getMyInfoStatus() === 0){
            store.dispatch('getMyInfo');
            // 监听用户信息加载状态，加载完成后调用 proceed 方法继续后续操作
            store.watch(store.getters.getMyInfoStatus, function () {
                if(store.getters.getMyInfoStatus() !== 1){
                    proceed();
                }
            });
        }else{
            proceed();
        }
    }
}

export default new VueRouter({

    routes: [
        {
            path: '/',
            redirect: {name: 'Desktop'},
            name: 'HyperCell',
            components: Vue.component( 'Layout', require( './pages/Layout' ) ),
            children: [
                {
                    path: 'register',
                    name: 'Register',
                    components: Vue.component( 'Register', require( './pages/Register' ) ),
                },
                {
                    path: 'login',
                    name: 'Login',
                    components: Vue.component( 'Login', require( './pages/Login' ) ),
                },
                {
                    path: 'desktop',
                    name: 'Desktop',
                    components: Vue.component( 'Desktop', require( './pages/Desktop' ) ),
                    beforeEnter: requireAuth,
                },

                {
                    path: 'profile',
                    name: 'Profile',
                    components: Vue.component( 'Profile', require( './pages/Profile' ) ),
                    beforeEnter: requireAuth,
                },
                {
                    path: 'table/:table?',
                    name: 'Table',
                    components: Vue.component( 'Profile', require( './pages/Table' ) ),
                    beforeEnter: requireAuth,
                },
                {
                    path: 'trash',
                    name: 'Trash',
                    components: Vue.component( 'Trash', require( './pages/Trash' ) ),
                    beforeEnter: requireAuth,
                },
                {
                    path: 'share/:share',
                    name: 'share',
                    components: Vue.component( 'Share', require( './pages/Share' ) ),
                },
                {
                    path: 'search',
                    name: 'Search',
                    components: Vue.component( 'Search', require( './pages/Search' ) ),
                    beforeEnter: requireAuth,
                },
            ]
        },
    ]
});
