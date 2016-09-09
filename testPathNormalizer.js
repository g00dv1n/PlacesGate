/**
 * Created by g00dv1n on 09.09.16.
 */


let PathNormalizer = require('helpers/path-normalizer');

let testPath = 'C:\\Program Files\\bandzip';


console.log(PathNormalizer.normalizePath(testPath,'g00dv1n', 'C:'));