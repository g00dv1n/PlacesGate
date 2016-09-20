'use strict'

let Place = require('models/place');
let co = require('co');
let mongoose = require('db')
let PathNormalizer = require('helpers/path-normalizer');
let filter = require('helpers/place-filter');
let generator = require('helpers/env-generator');

const NEED_NORMALIZE_PATH_AUTHORS = ['cuckoo'];



let sendError = (res, err) => {
    console.log(err);
    return res.status(err.status || 404).json(err);
};

function checkPathEx(path) {
    return co(function *() {
        let conf = yield getPlacesConfig();
        let exc_dirs = conf.exclusions.dirs;
        if (exc_dirs.indexOf(path) != -1) {
            return true;
        } else {
            return false;
        }
    });
}


function addPlace(req, res) {
    co(function* () {

        let params = req.body;

        yield filter.checkParams(params);

        if (NEED_NORMALIZE_PATH_AUTHORS.indexOf(params.author)!= -1) {
            switch (params.author) {
                case 'cuckoo': {
                    let norm = PathNormalizer.normalizePath(params.data);
                    params.data = norm.data;
                    break;
                }
            }
        }

        yield filter.placeExists(params);

        yield filter.checkPathEx(params);

        let p = new Place(params);
        let doc = yield p.save();

        res.json(doc);

    }).catch((err) => {
        sendError(res, err);
    });
}

function getPlaces (req, res) {

    let from = req.query && req.query.from || 0;
    let to = req.query && req.query.to || 0;
    let limit = (parseInt(to) - parseInt(from)) || 15;
    let skip = from;

    let query = req.query && req.query.q || {};
    try {
        query = JSON.parse(query);
    } catch (err) {
        query = {};
    }

    Place.find(query,'', {limit: parseInt(limit), skip: parseInt(skip)})
        .then(function(places) {
            res.json(places);
        })
        .catch(function (err) {
            sendError(res,err);
        });
}

function getStatistic(req, res) {
    co(function *() {
        let envEx = generator.getEnvRegExps();
        let keys = Object.keys(envEx);
        let stat = {};
        for (let i=0; i<keys.length; i++) {
            let k = keys[i];
            stat[k] = yield Place.count({data: {
                '$regex': `^${k}`
            }
            });
        }

        res.json(stat);
    }).catch(function (err) {
       sendError((res,err));
    });

}

function getOnePlace(req, res) {

   Place.findById(req.params.id)
        .then(function(place) {
            if (!place) {
                return res.status(404).json({message: 'Not found'});
            } else {
                res.json(place);
            }
        })
        .catch(function (err) {
            sendError(res,err);
        });
}

function editPlace(req, res) {
    co(function* () {
        let params = req.body;

        yield filter.checkParams(params);

        yield filter.placeExists(params);

        let place = yield Place.findOneAndUpdate({'_id': req.params.id}, req.body, {new: true})
        if (!place) {
            throw new Error('Not Found');
        }
        res.json(place);
    }).catch((err)=>{
        sendError(res,err);
    });

}

function deletePlace(req,res) {
    Place.remove({_id: req.params.id })
        .then(function (place)  {
            res.json(place);
        })
        .catch((err) => {
            sendError(res,err);
        });
}

function getAuthors(req, res) {

    Place.find().distinct('author')
        .then((authors) => {
            res.json(authors);
        })
        .catch((err) => {
            sendError(res,err);
        });
    
}

function getUniqSamplesCount(req, res) {
    Place.find().distinct('md5').count()
        .then((count) => {
            res.json({'count':count});
        })
        .catch((err) => {
            sendError(res,err);
        });
}

function getEnv(req, res) {
    let envVars = Object.keys(generator.getEnvRegExps());
    res.json(envVars);
}

function getTypes(req, res) {
    Place.find().distinct('type')
        .then((types) => {
            res.json(types);
        })
        .catch((err) => {
            sendError(res,err);
        });

}

function changeNameByMD5(req, res) {
    Place.update({md5: req.body.md5}, {name: req.body.name}, {multi: true})
        .then((update)=> {
            res.json(update);
        })
        .catch((err) => {
            sendError(res,err);
        });
}


exports.addPlace = addPlace;
exports.getOnePlace = getOnePlace;
exports.getPlaces = getPlaces;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;
exports.getStatistic = getStatistic;
exports.getAuthors = getAuthors;
exports.getEnv = getEnv;
exports.getTypes = getTypes;
exports.getUniqSamplesCount = getUniqSamplesCount;
exports.changeNameByMD5 = changeNameByMD5;
