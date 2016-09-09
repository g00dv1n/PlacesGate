/**
 * Created by g00dv1n on 08.09.16.
 */

let EnvGenerator = require('helpers/env-generator');


/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
* This is need for convert cuckoo places in our format
* * * * * * * * * * * * * * * * * * * * * * * * * * * */

class PathNormalizer {

    static normalizePath(path, username, windrive) {
        let vars = EnvGenerator.getEnvVars(username, windrive);
        let norm_path = '';
        path = path.toLowerCase();

        for (let key in vars) {
            let str = vars[key].toLowerCase();
            norm_path  = path.replace(str, `%${key}%`);
            if (norm_path != path) break;
        }
        return norm_path;
    }
}

module.exports = PathNormalizer;

