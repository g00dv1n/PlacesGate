/**
 * Created by g00dv1n on 07.09.16.
 */

let mongoose = require('db');


let placeSheme = mongoose.Schema({
    data: String,
    type: {type: String, enum: ['FPL', 'FMPL', 'PL', 'MPL', 'RPL', 'RMPL']},
    author: {
        type: String,
        default: 'bot'
    },
    name: {
        type: String,
        default: 'Malware.Gen'
    },
    created: {
        type: Date,
        default: Date.now
    },
    env: String,
    md5: String,
});




module.exports = mongoose.mainDb.model('Place', placeSheme);
