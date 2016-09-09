let Place = require('models/place');
let co = require('co');
let mongoose = require('db')
let PathNormalizer = require('helpers/path-normalizer');

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

        if (!params.data || !params.type) {
            return res.json({
                error: 'Data and type fields are required'
            });
        }

        let count = yield  Place.count({data: params.data});
        if (count > 0) {
            return res.json({
                error: 'Place already exists'
            });
        }

        if (NEED_NORMALIZE_PATH_AUTHORS.indexOf(params.author)!= -1) {
            switch (params.author) {
                case 'cuckoo': {
                    params.data = PathNormalizer.normalizePath(params.data, "Andy Harrison", "C:");
                }
            }
        }
        let ex = yield checkPathEx(params.data);
        if (ex) {
            return res.json({
                error: 'Folder in exclusions'
            });
        }

        let p = new Place({
            data: params.data,
            type: params.type,
            author: params.author || 'bot'
        });

        let doc = yield p.save();

        res.json(doc);

    }).catch((err) => {
        res.json(err);
    });
}

function getPlaces (res, req) {
    Place.find({})
        .then(function(places) {
            if (req.query.from && req.query.to) {
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
            res.json(err);
        });
}

function getOnePlace(req, res) {
    Place.findById(req.params.id)
        .then(function(place) {
            if (!place) {
                res.status = 404;
            }
            res.json(place);
        })
        .catch(function (err) {
            res.json(err);
        });
}

function editPlace(req, res) {
    Place.findOneAndUpdate({'_id': req.params.id}, req.body, {new: true})
        .then(function (place) {
            if (!place) {
                res.status = 404;
            }
            res.json(place);

        })
        .catch(function (err) {
            res.json(err);
        });
}


exports.addPlace = addPlace;
exports.getOnePlace = getOnePlace;
exports.getPlaces = getPlaces;
exports.editPlace = editPlace;
