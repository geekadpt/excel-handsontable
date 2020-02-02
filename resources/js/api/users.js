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
}
