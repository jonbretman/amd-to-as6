

import CONFIG from 'config';
import service from 'app/system/services/store/service';

export default {
    ...service,

    /**
     * @type {String}
     */
        id: 'diet',

    /**
     * @returns {String}
     */
    getUrl() {
        return `${CONFIG.API_URL}/billing/plans`;
    }
}