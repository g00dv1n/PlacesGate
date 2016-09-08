/**
 * Created by g00dv1n on 07.09.16.
 */


let mongoose = require('mongoose');
let config = require('config');
//let mainDb = mongoose.createConnection(config.MAIN_DB)

/*module.exports = {
    mainDb: mainDb
};*/
mongoose.Promise = global.Promise;
mongoose.mainDb =  mongoose.createConnection(config.MAIN_DB);
mongoose.secondaryDb = mongoose.createConnection(config.SECONDARY_DB);

module.exports = mongoose;