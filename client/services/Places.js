/**
 * Created by g00dv1n on 19.09.16.
 */

/**
 * Created by g00dv1n on 12.09.16.
 */
(function () {
    angular
        .module('placesGate')
        .factory('Places', Places);

    Places.$inject = ['Restangular'];
    function Places(Restangular) {

        return Restangular.all('places');
    }

})();
