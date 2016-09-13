/**
 * Created by g00dv1n on 12.09.16.
 */
(function () {
    angular
        .module('placesGate')
        .controller('PlaceController', PlaceController);

    PlaceController.$inject = ['$scope', '$routeParams', '$route', 'PlacesHelper', 'Notification']

    function PlaceController($scope, $routeParams, $route, PlacesHelper, Notification ) {

        var vm  = this;
        var isNew = $route.current.isNew;
        var id = $routeParams.id;

        vm.model = {}
        vm.model.name = 'dasd';

        PlacesHelper.getOnePlace(id)
            .then(function (res) {
                vm.model = res.data;
            });

        vm.submit = function () {
            if(isNew) {
                PlacesHelper.createPlace(vm.model)
                    .then(function (res) {
                        Notification.success('Place add successful');
                    })
                    .catch(function (err) {
                        Notification.error(err.message);
                    });
            } else  {
                PlacesHelper.editPlace(vm.model)
                    .then(function (res) {
                        Notification.success('Place edit successful');
                    })
                    .catch(function (err) {
                        Notification.error(err.message);
                    });
            }
        };

    }
})();

