/**
 * Created by g00dv1n on 07.09.16.
 */
let express = require('express');
let router = express.Router();
let Place = require('models/place');
let co = require('co');
let mongoose = require('db')


let getPlacesConfig = () => {
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
};



router.get('/', (req, res, next) => {
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
});

router.get('/:id', (req, res, next) => {
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

});

router.post('/', (req, res, next) => {

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

        if (params.type === 'folder') {
            let conf = yield getPlacesConfig();
            let exc_dirs = conf.exclusions.dirs;

            if (exc_dirs.indexOf(params.data) != -1) {
                return res.json({
                    error: 'Folder in exclusions'
                });
            }
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


});

router.patch('/:id', (req, res, next) => {
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
});



module.exports = router;