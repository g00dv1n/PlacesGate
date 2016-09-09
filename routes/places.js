/**
 * Created by g00dv1n on 07.09.16.
 */
let express = require('express');
let router = express.Router();
let Place = require('models/place');
let co = require('co');
let mongoose = require('db')
let controller = require('controllers/placesController');


router.get('/', (req, res ) => {
    controller.getPlaces(req, res);
});

router.get('/:id', (req, res ) => {
    controller.getOnePlace(req, res);
});

router.post('/', (req, res ) => {
    controller.addPlace(req, res);
});

router.patch('/:id', (req, res ) => {
    controller.editPlace(req, res);
});



module.exports = router;