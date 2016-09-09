/**
 * Created by g00dv1n on 08.09.16.
 */

let EnvGenerator = require('helpers/env-generator');

class PathNormalizer {

    static normalizePath(path) {
        let vars = EnvGenerator.getEnvVars('andy harrison','C:');
        let norm_path = '';

        for (let key in vars) {
            let str = vars[key].toLowerCase();
            norm_path  = path.toLowerCase().replace(str, key);
        }
        return norm_path;
    }
}