/**
 * Created by g00dv1n on 07.09.16.
 */

let mongoose = require('db');


let placeSheme = mongoose.Schema({
    data: String,
    type: {type: String, enum: ['registr', 'folder', 'file']},
    author: String,
    name: String,
    created: {
        type: Date,
        default: Date.now
    }
});




module.exports = mongoose.mainDb.model('Place', placeSheme);
