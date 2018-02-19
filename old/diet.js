'use strict';

define([
    'config',
    'app/system/services/store/service'
], (
    CONFIG,
    service
) => {
    return {
        ...services,
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
});