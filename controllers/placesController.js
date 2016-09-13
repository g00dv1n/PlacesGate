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
            return res.status(406).json({
                message: 'Data and type fields are required'
            });
        }

        let count = yield  Place.count({data: params.data});
        if (count > 0) {
            return res.status(409).json({
                message: 'Place already exists'
            });
        }

        if (NEED_NORMALIZE_PATH_AUTHORS.indexOf(params.author)!= -1) {
            switch (params.author) {
                case 'cuckoo': {
                    params.data = PathNormalizer.normalizePath(params.data, "Andy Harrison", "C:");
                    break;
                }
            }
        }
        let ex = yield checkPathEx(params.data);
        if (ex) {
            return res.status(422).json({
                message: 'Folder in exclusions'
            });
        }

        let p = new Place({
            data: params.data,
            type: params.type,
            author: params.author || 'bot',
            name: params.name || 'Malware.Gen'
        });

        let doc = yield p.save();

        res.json(doc);

    }).catch((err) => {
        res.json(err);
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
            console.log(err)
            res.json(err);
        });
}

function getOnePlace(req, res) {
    Place.findById(req.params.id)
        .then(function(place) {
            if (!place) {
                return res.status(404).json({message: 'Not found'});
            }
            res.json(place);
        })
        .catch(function (err) {
            res.json(err);
        });
}

function editPlace(req, res) {
    co(function* () {
        let params = req.body;
        let count = yield  Place.count({data: params.data});

        if (!params.data || !params.type) {
            return res.status(406).json({
                message: 'Data and type fields are required'
            });
        }

        if (count > 0) {
            return res.status(409).json({
                message: 'Place already exists'
            });
        }
        let place = yield Place.findOneAndUpdate({'_id': req.params.id}, req.body, {new: true})
        if (!place) {
            return res.status(404).json({message: 'Not found'});
        }
        res.json(place);
    }).catch((err)=>{
        res.json(err);
    });

}

function deletePlace(req,res) {
    Place.remove({_id: req.params.id })
        .then((res) => {
            res.json(res);
        })
        .catch((err) => {
            res.json(err);
        });
}


exports.addPlace = addPlace;
exports.getOnePlace = getOnePlace;
exports.getPlaces = getPlaces;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;