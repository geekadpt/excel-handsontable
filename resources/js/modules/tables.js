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
        myTrash:'',
        clearMyTrashStatus:0,
        deleteMyTrashStatus:0,
        restoreMyTrashStatus:0,
        shareSwitchStatus:0,
        shareSwitchResult:false,
        getShareTableStatus:0,
        shareTable:'',
        searchTable:'',
        searchTableStatus:0
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
                    commit( 'setMyTables', response.data);

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
        getMyTrash( { commit },data ){
            commit( 'setGetMyTrashStatus', 1 );

            HyperCellAPI.getMyTrash(data)
                .then( function( response ){
                    commit( 'setGetMyTrashStatus', 2 );
                    commit( 'setMyTrash', response.data);
                })
                .catch( function(error){
                    commit( 'setGetMyTrashStatus', 3 );
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        deleteMyTrash( { commit },data ){
            commit( 'setDeleteMyTrashStatus', 1 );
            HyperCellAPI.deleteTrash(data)
                .then( function( response ){
                    commit( 'setDeleteMyTrashStatus', 2 );
                })
                .catch( function(error){
                    commit( 'setDeleteMyTrashStatus', 3 );
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        clearMyTrash( { commit },data ){
            commit( 'setClearMyTrashStatus', 1 );
            HyperCellAPI.clearTrash(data)
                .then( function( response ){
                    commit( 'setClearMyTrashStatus', 2 );
                })
                .catch( function(error){
                    commit( 'setClearMyTrashStatus', 3 );
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        restoreMyTrash( { commit },data ){
            commit( 'setRestoreMyTrashStatus', 1 );
            HyperCellAPI.restoreTrash(data)
                .then( function( response ){
                    commit( 'setRestoreMyTrashStatus', 2 );
                })
                .catch( function(error){
                    commit( 'setRestoreMyTrashStatus', 3 );
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        resetMyTrashState( { commit }){
            commit( 'setMyTrash','');
        },
        switchShare( { commit },data){
            commit('setShareSwitchStatus',1);
            HyperCellAPI.switchShare(data)
                .then( function( response ){
                    commit('setShareSwitchStatus',2);
                    console.log(response.data);
                    commit('setShareSwitchResult',response.data);

                })
                .catch( function(error){
                    commit('setShareSwitchStatus',3);
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        getShareTable( { commit },data){
            commit('setGetShareTableStatus',1);
            HyperCellAPI.getShare(data)
                .then( function( response ){
                    commit('setGetShareTableStatus',2);

                    commit( 'setGetShareTable', response.data);
                })
                .catch( function(error){
                    commit('setGetShareTableStatus',3);
                    // if(typeof error.response.data.errors === "undefined"){
                    //     commit( 'setSaveTableErrors',error.response.data.message);
                    // }else{
                    //     commit( 'setSaveTableErrors', error.response.data.errors[Object.keys(error.response.data.errors)[0]].toString() );
                    // }
                });
        },
        searchTable( { commit },data ){
            commit( 'setSearchTableStatus', 1 );

            HyperCellAPI.searchTable(data)
                .then( function( response ){
                    commit( 'setSearchTableStatus', 2 );
                    commit( 'setSearchTable', response.data);
                })
                .catch( function(error){
                    commit( 'setSearchTableStatus', 3 );
                });
        },
        clearSearchTable( { commit } ){
            commit( 'setSearchTable', '');
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
        setMyTrash( state, data){
            state.myTrash = data;
        },
        setGetMyTrashStatus( state, status ){
            state.getMyTrashStatus = status;
        },
        setDeleteMyTrashStatus( state, status ){
            state.deleteMyTrashStatus = status;
        },
        setClearMyTrashStatus( state, status ){
            state.clearMyTrashStatus = status;
        },
        setRestoreMyTrashStatus( state, status ){
            state.restoreMyTrashStatus = status;
        },
        setShareSwitchStatus( state, status){
            state.shareSwitchStatus = status;
        },
        setShareSwitchResult( state, result){
            state.shareSwitchResult= result;
        },
        setGetShareTable( state, data){
            state.shareTable = data;
        },
        setGetShareTableStatus( state, status ){
            state.getShareTableStatus= status;
        },
        setSearchTable( state, data){
            state.searchTable = data;
        },
        setSearchTableStatus( state, status ){
            state.searchTableStatus = status;
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
        getMyTrash( state){
            return state.myTrash;
        },
        getGetMyTrashStatus( state ){
            return function(){
                return state.getMyTrashStatus;
            }

        },
        getDeleteMyTrashStatus( state ){
            return function(){
                return state.deleteMyTrashStatus;
            }

        },
        getClearMyTrashStatus( state ){
            return function(){
                return state.clearMyTrashStatus;
            }

        },
        getRestoreMyTrashStatus( state ){
            return function(){
                return state.restoreMyTrashStatus;
            }

        },
        getShareSwitchResult( state){
            return state.shareSwitchResult;
        },
        getShareSwitchStatus( state){
            return function(){
                return state.shareSwitchStatus;
            }
        },
        getShareTable( state){
            return state.shareTable;
        },
        getShareTableStatus( state ){
            return function(){
                return state.getShareTableStatus;
            }
        },
        getSearchTable( state){
            return state.searchTable ;
        },
        getSearchTableStatus( state ){
            return function(){
                return state.searchTableStatus;
            }
        },
    }
};