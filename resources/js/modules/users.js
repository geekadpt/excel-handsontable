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
    }
};