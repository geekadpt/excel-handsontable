/**
 * Imports the HYPERCELL API URL from the config.
 */
import { HYPERCELL_CONFIG } from '../config.js';

export default {
    /**
     * POST /api/v1/tables
     */
    saveTable: function(data){
        return axios.post( HYPERCELL_CONFIG.API_URL + '/tables' , {
            name:data.name,
            //header:data.header,
            data:data.data,
            merge:data.merge,
            column:data.column,
            cell:data.cell,
        });
    },
    /**
     * GET /api/v1/tables
     */
    getMyTables: function(data){
        return axios.get( HYPERCELL_CONFIG.API_URL + '/tables');
    },
    /**
     * GET /api/v1/tables/{id}
     */
    getMyTable: function(data){
        return axios.get( HYPERCELL_CONFIG.API_URL + '/tables/'+data.table_id);
    },
    /**
     * PATCH /api/v1/tables/{id}
     */
    updateMyTable: function(data){
        return axios.patch( HYPERCELL_CONFIG.API_URL + '/tables/'+data.table_id,{
            name:data.name,
            //header:data.header,
            data:data.data,
            merge:data.merge,
            column:data.column,
            cell:data.cell,
        });
    },
    /**
     * DELETE /api/v1/tables/{id}
     */
    deleteTable: function(data){
        return axios.delete( HYPERCELL_CONFIG.API_URL + '/tables/'+data.table_id);
    },
}
