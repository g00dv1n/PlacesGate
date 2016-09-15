/**
 * Created by g00dv1n on 12.09.16.
 */
(function () {
    angular
        .module('placesGate')
        .factory('PlacesHelper', PlacesHelper);

    PlacesHelper.$inject = ['$http', 'constConfig'];
    function PlacesHelper($http, constConfig) {

        var service = {};
        service.getPlaces = getPlaces;
        service.deletePlace = deletePlace;
        service.getOnePlace = getOnePlace;
        service.createPlace = createPlace;
        service.editPlace = editPlace;
        service.getStat = getStat;

        var places = 'places'
        service.host = constConfig.host + ':' + constConfig.port;
        service.resource = `http://${service.host}/${places}`;
        
        function getPlaces(from, to) {
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

        function getOnePlace(id) {
            return $http.get(service.resource + '/' + String(id));
            //return $http.get(service.resource);
        }

        function deletePlace(id) {
            return $http.delete(service.resource + '/' + String(id));
        }


        function editPlace(data) {
            return $http.patch(service.resource + '/' + String(data._id),data);
        }

        function createPlace(data) {
            return $http.post(service.resource,data);
        }

        function getStat() {
            return $http.get(service.resource +'/stat');
        }

        return service;

    }
})();