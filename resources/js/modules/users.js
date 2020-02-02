/*
 |-------------------------------------------------------------------------------
 | VUEX modules/users.js
 |-------------------------------------------------------------------------------
 | The Vuex data store for the users
 */

import HypercellApi from '../api/users';

export const users = {
    /**
     * Defines the state being monitored for the module.
     */
    state: {
        verificationCodesSendStatus: 0,
        verificationKey:'',
        verificationCodesSendErrors:'',
        registerStatus: 0,
        registerErrors: '',
        loginStatus: 0,
        loginErrors: '',
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    },

    /**
     * Defines the actions used to retrieve the data.
     */
    actions: {
        sendVerificationCodes( { commit },data ){
            commit( 'setSendVerificationCodes', 1 );

            HypercellApi.sendVerificationCodes(data)
                .then( function( response ){
                    commit( 'setSendVerificationCodes', 2 );
                    commit( 'setVerificationKey' ,response.data.key);
                })
                .catch( function(error){
                    commit( 'setSendVerificationCodes', 3 );
                    if(typeof error.response.data.errors === "undefined"){
                        commit( 'setVerificationCodesSendErrors',error.response.data.message);
                    }else{
                        commit( 'setVerificationCodesSendErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    }
                });
        },
        register( { commit },data ){
            commit( 'setRegisterStatus', 1 );

            HypercellApi.register(data)
                .then( function( response ){
                    commit( 'setRegisterStatus', 2 );
                })
                .catch( function(error){
                    commit( 'setRegisterStatus', 3 );
                    if(typeof error.response.data.errors === "undefined"){
                        commit( 'setRegisterErrors',error.response.data.message);

                    }else{
                        commit( 'setRegisterErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    }
                });
        },
        login( { commit },data ){
            commit( 'setLoginStatus', 1 );

            HypercellApi.login(data)
                .then( function( response ){
                    commit( 'setLoginStatus', 2 );
                    commit('setLoginToken','Bearer ' + response.data.access_token);
                })
                .catch( function(error){
                    commit( 'setLoginStatus', 3 );
                    commit('setLoginToken','');
                    if(typeof error.response.data.errors === "undefined"){
                        commit( 'setLoginErrors',error.response.data.message);
                    }else{
                        commit( 'setLoginErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    }
                });
        },

    },
    /**
     * Defines the mutations used
     */
    mutations: {
        setSendVerificationCodes( state, status ){
            state.verificationCodesSendStatus = status;
        },
        setVerificationKey( state, data){
            state.verificationKey = data;
        },
        setVerificationCodesSendErrors( state, error){
            state.verificationCodesSendErrors = error;
        },
        setRegisterStatus( state, status){
            state.registerStatus = status;
        },
        setRegisterErrors( state, errors){
            state.registerErrors = errors;
        },
        setLoginStatus( state, status){
            state.loginStatus = status;
        },
        setLoginErrors( state, errors){
            state.loginErrors = errors;
        },
        setLoginToken( state, access_token){
            state.Authorization = access_token;
            localStorage.setItem('Authorization', access_token);
        },

    },
    /**
     * Defines the getters used by the module
     */
    getters: {
        getVerificationCodesSendStatus( state ){
            return function(){
                return state.verificationCodesSendStatus;
            }

        },
        getVerificationKey( state ){
            return state.verificationKey;
        },
        getVerificationCodesSendErrors( state){
            return state.verificationCodesSendErrors;
        },
        getRegisterStatus( state ){
            return function () {
                return state.registerStatus;
            }
        },
        getRegisterErrors( state ){
            return state.registerErrors;
        },
        getLoginStatus( state ){
            return function () {
                return state.loginStatus ;
            }
        },
        getLoginErrors( state ){
            return state.loginErrors;
        },
        getLoginToken( state ){
            return state.Authorization;
        },


    }
};