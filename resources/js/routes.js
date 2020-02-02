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

export default new VueRouter({

    routes: [
        {
            path: '/',
            redirect: {name: 'Desktop'},
            name: 'Hypercell',
            components: Vue.component( 'Layout', require( './pages/Layout' ) ),
            children: [
                {
                    path: 'register',
                    name: 'Register',
                    components: Vue.component( 'Register', require( './pages/Register' ) ),
                },
                {
                    path: 'desktop',
                    name: 'Desktop',
                    components: Vue.component( 'Desktop', require( './pages/Desktop' ) ),
                },
            ]
        },
    ]
});
