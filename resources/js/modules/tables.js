/*
 |-------------------------------------------------------------------------------
 | VUEX modules/tables.js
 |-------------------------------------------------------------------------------
 | The Vuex data store for the tables
 */

import HyperCellAPI from '../api/tables';

export const tables = {
    /**
     * Defines the state being monitored for the module.
     */
    state: {
        tableSaveStatus: 0,
        tableSaveResult: '',
        tableSaveErrors:'',
        getMyTablesStatus:0,
        myTables:'',
        getMyTableStatus:0,
        myTable:'',
        updateMyTableStatus:0,
        deleteMyTableStatus:0,
    },
    /**
     * Defines the actions used to retrieve the data.
     */
    actions: {
        saveTable( { commit },data ){
            commit( 'setSaveTableStatus', 1 );

            HyperCellAPI.saveTable(data)
                .then( function( response ){
                    commit( 'setSaveTableStatus', 2 );
                    commit( 'setSaveTableResult', response.data );
                })
                .catch( function(error){
                    commit( 'setSaveTableStatus', 3 );
                    if(typeof error.response.data.errors === "undefined"){
                        commit( 'setSaveTableErrors',error.response.data.message);
                    }else{
                        commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    }
                });
        },
        getMyTables( { commit },data ){
            commit( 'setGetMyTablesStatus', 1 );

            HyperCellAPI.getMyTables(data)
                .then( function( response ){
                    commit( 'setGetMyTablesStatus', 2 );
                    commit( 'setMyTables', response.data.data );

                })
                .catch( function(error){
                    commit( 'setGetMyTablesStatus', 3 );
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        getMyTable( { commit },data ){
            commit( 'setGetMyTableStatus', 1 );

            HyperCellAPI.getMyTable(data)
                .then( function( response ){
                    commit( 'setGetMyTableStatus', 2 );
                    commit( 'setMyTable', response.data);
                })
                .catch( function(error){
                    commit( 'setGetMyTableStatus', 3 );
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        updateMyTable( { commit },data ){
            commit( 'setUpdateMyTableStatus', 1 );
            HyperCellAPI.updateMyTable(data)
                .then( function( response ){
                    commit( 'setUpdateMyTableStatus', 2 );
                })
                .catch( function(error){
                    commit( 'setUpdateMyTableStatus', 3 );
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        deleteMyTable( { commit },data ){
            commit( 'setDeleteMyTableStatus', 1 );
            HyperCellAPI.deleteTable(data)
                .then( function( response ){
                    commit( 'setDeleteMyTableStatus', 2 );
                })
                .catch( function(error){
                    commit( 'setDeleteMyTableStatus', 3 );
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
    },
    /**
     * Defines the mutations used
     */
    mutations: {
        setSaveTableStatus( state, status ){
            state.tableSaveStatus= status;
        },
        setSaveTableResult( state, result){
            state.tableSaveResult = result;
        },
        setSaveTableErrors( state, error){
            state.tableSaveErrors = error;
        },
        setMyTables( state, data){
            state.myTables = data;
        },
        setGetMyTablesStatus( state, status ){
            state.getMyTablesStatus= status;
        },
        setMyTable( state, data){
            state.myTable = data;
        },
        setGetMyTableStatus( state, status ){
            state.getMyTableStatus = status;
        },
        setUpdateMyTableStatus( state, status ){
            state.updateMyTableStatus = status;
        },
        setDeleteMyTableStatus( state, status ){
            state.deleteMyTableStatus = status;
        },
    },
    /**
     * Defines the getters used by the module
     */
    getters: {
        getSaveTableStatus( state ){
            return function(){
                return state.tableSaveStatus;
            }

        },
        getSaveTableResult( state){
            return state.tableSaveResult;
        },
        getSaveTableErrors( state){
            return state.tableSaveErrors;
        },
        getMyTables( state){
            return state.myTables;
        },
        getGetMyTablesStatus( state ){
            return function(){
                return state.getMyTablesStatus;
            }

        },
        getMyTable( state){
            return state.myTable;
        },
        getGetMyTableStatus( state ){
            return function(){
                return state.getMyTableStatus;
            }

        },
        getUpdateMyTableStatus( state ){
            return function(){
                return state.updateMyTableStatus;
            }

        },
        getDeleteMyTableStatus( state ){
            return function(){
                return state.deleteMyTableStatus;
            }

        },
    }
};