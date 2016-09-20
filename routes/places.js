/**
 * Created by g00dv1n on 07.09.16.
 */
let express = require('express');
let router = express.Router();
let Place = require('models/place');
let co = require('co');
let mongoose = require('db')
let controller = require('controllers/placesController');


router.get('/stat', (req,res) => {
    controller.getStatistic(req,res);
});

router.get('/authors', (req,res) => {
    controller.getAuthors(req,res);
});

router.get('/env', (req,res) => {
    controller.getEnv(req,res);
});

router.get('/types', (req,res) => {
    controller.getTypes(req,res);
});

router.get('/unique', (req,res) => {
    controller.getUniqSamplesCount(req,res);
});

router.post('/changebymd5', (req,res) => {
    controller.changeNameByMD5(req,res);
});


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

router.delete('/:id', (req,res) => {
    controller.deletePlace(req,res);
});





module.exports = router;