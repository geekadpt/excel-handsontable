/**
 * Imports the HYPERCELL API URL from the config.
 */
import { HYPERCELL_CONFIG } from '../config.js';

export default {
    /**
     * POST /api/v1/verificationCodes
     */
    sendVerificationCodes: function(data){
        return axios.post( HYPERCELL_CONFIG.API_URL + '/verificationCodes' , {
            phone:data.phone
        });
    },
    /**
     * POST /api/v1/users
     */
    register: function(data){
        return axios.post( HYPERCELL_CONFIG.API_URL + '/users' , {
            verification_key:data.verification_key,
            verification_code:data.verification_code,
            name:data.name,
            password:data.password
        });
    },
    /**
     * POST /api/v1/authorizations
     */
    login: function(data){
        return axios.post( HYPERCELL_CONFIG.API_URL + '/authorizations' , {
            username:data.username,
            password:data.password
        });
    },
    /**
     * POST /api/v1//socials/{social_type}/authorizations
     */
    oauth: function(data){
        return axios.post( HYPERCELL_CONFIG.API_URL + '/socials/'+data.social+'/authorizations' , {
            code:data.code,
        });
    },

}
