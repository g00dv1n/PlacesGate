/**
 * Created by g00dv1n on 07.09.16.
 */

let config = {
    PORT: process.env.PORT || 8080,
    MAIN_DB: 'mongodb://10.10.10.12/placesgate',
    SECONDARY_DB: 'mongodb://10.10.10.13/collect_analyzer'
};

module.exports = config;