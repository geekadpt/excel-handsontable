window._ = require('lodash');
// try {
//     window.$ = window.jQuery = require('jquery');
// } catch (e) {}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
import Vue from 'vue';
import router from './routes.js'
import store from './store.js'
// 引入vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import  {i18n} from  './plugins/vue-i18n'

Vue.use(Vuetify);

// 添加请求拦截器，在请求头中加 AcceptLanguage
axios.interceptors.request.use(
    config => {
        config.headers.AcceptLanguage = i18n.locale;
        return config;
    },
    error => {
        return Promise.reject(error);
    });

new Vue({
    //定义Vue绑定的根元素
    el: '#app',
    //将上面声明的路由器传递到根Vue实例
    router,
    store,
    i18n,
    //初始化Vuetify
    vuetify: new Vuetify()
}).$mount('#app'); //将这个实例挂载到id=app的根元素上

