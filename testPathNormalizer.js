/**
 * Created by g00dv1n on 09.09.16.
 */


let PathNormalizer = require('helpers/path-normalizer');

let testPath = 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp\\WordPerfect Password.lnk';


console.log(PathNormalizer.normalizePath(testPath));