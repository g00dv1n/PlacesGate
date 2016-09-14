/**
 * Created by g00dv1n on 08.09.16.
 */

let EnvGenerator = require('helpers/env-generator');


/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
* This is need for convert cuckoo places in our format
* * * * * * * * * * * * * * * * * * * * * * * * * * * */

class PathNormalizer {

    static normalizePath(path, username, windrive) {
        let regExps = EnvGenerator.getEnvRegExps();
        let norm_path = '';
        let env_var = '';
        //path = path.toLowerCase();

        /*for (let key in regExps) {
            let str = vars[key].toLowerCase();
            norm_path  = path.replace(str, `%${key}%`);
            if (norm_path != path) break;
        }*/
        for (let key in regExps) {
            let re = regExps[key];
            norm_path = path.replace(re, key);
            if (norm_path != path) {
                env_var = key;
                break;
            }
        }
        return {
            data: norm_path,
            env: env_var
        }
    }
}

module.exports = PathNormalizer;

