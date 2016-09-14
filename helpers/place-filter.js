/**
 * Created by g00dv1n on 14.09.16.
 */

let Place = require('models/place');
let mongoose = require('db')
let PathNormalizer = require('helpers/path-normalizer');
let co = require('co');

const NEED_NORMALIZE_PATH_AUTHORS = ['cuckoo'];

function getPlacesConfig () {
    return new Promise((resolve, reject) =>{
        let places = mongoose.secondaryDb.db.collection('config');
        places.find({}).toArray(function(err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs[0])
            }

        });
    });
}

let succes = true;

let error = (message, status) => {
    return {
        message: message,
        status: status,
    }
};


function placeExists(params) {
    return co(function *() {
        let count = yield  Place.count({data: params.data});
        console.log(count);
        if (count > 0) {
            //yield Promise.reject(error('Place already exists', 409));
            throw error('Place already exists', 409);
        } else {
            return succes;
        }
    });
}

function checkParams(params) {
    return co(function *() {
        if (!params.data || !params.type) {
            throw error('Data and type fields are required', 406);
        } else {
            return succes;
        }
    });
}

function checkPathEx(params) {
    return co(function *() {
        let conf = yield getPlacesConfig();
        let exc_dirs = conf.exclusions.dirs;
        if (exc_dirs.indexOf(params.data) != -1) {
            throw error('Folder in exclusions', 422);
        } else {
            return succes;
        }
    });
}


exports.placeExists = placeExists;
exports.checkParams = checkParams;
exports.checkPathEx = checkPathEx;
