/**
 * Created by g00dv1n on 14.09.16.
 */

let mongoose = require('db');
let DIRS = [];


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


mongoose.secondaryDb.on('connected', function () {
    getPlacesConfig()
        .then((conf)=> {
           DIRS = conf.exclusions.dirs;
        });
});

mongoose.secondaryDb.on('error',function (err) {
    console.log('Mongoose secondaryDb connection error: ' + err);
});


module.exports = DIRS;
