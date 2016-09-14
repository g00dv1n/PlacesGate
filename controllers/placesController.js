'use strict'

let Place = require('models/place');
let co = require('co');
let mongoose = require('db')
let PathNormalizer = require('helpers/path-normalizer');
let filter = require('helpers/place-filter');

const NEED_NORMALIZE_PATH_AUTHORS = ['cuckoo'];



let sendError = (res, err) => {
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
                    params.env = norm.env;
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
    Place.find({})
        .then(function(places) {
            if (req.query && req.query.from && req.query.to) {
                try {
                    res.json(places.slice(req.query.from, req.query.to));
                } catch (e) {
                    res.json(e);
                }
            } else {
                res.json(places);
            }
        })
        .catch(function (err) {
            sendError(res,err);
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
        .then((res) => {
            res.json(res);
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