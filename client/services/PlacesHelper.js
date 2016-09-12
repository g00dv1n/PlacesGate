/**
 * Created by g00dv1n on 12.09.16.
 */
(function () {
    angular
        .module('placesGate')
        .factory('PlacesHelper', PlacesHelper);

    PlacesHelper.$inject = ['$http'];
    function PlacesHelper($http) {

        var service = {};
        service.getPlaces = getPlaces;
        service.deletePlace = deletePlace;

        var places = 'places'
        service.host = '127.0.0.1:8080';
        service.resource = `http://${service.host}/${places}`;
        
        function getPlaces(from, to, params) {
            return $http({
                url: service.resource,
                method: "GET",
                params: {
                    from: from,
                    to: to
                }
            });
            //return $http.get(service.resource);
        }

        function deletePlace(id) {
            return $http.delete(service.resource + '/' + String(id));
        }

        return service;

    }
})();