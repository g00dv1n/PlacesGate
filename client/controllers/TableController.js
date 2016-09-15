/**
 * Created by g00dv1n on 12.09.16.
 */
(function () {
    angular
        .module('placesGate')
        .controller('TableController', TableController);

    TableController.$inject = ['$scope', 'PlacesHelper', '$timeout']

    function TableController($scope, PlacesHelper,$timeout) {

        let vm  = this;

        vm.places = [];



        function deletePlace(element) {
            var i = vm.places.indexOf(element);
            var id = element._id;
            console.log(i);
            PlacesHelper.deletePlace(id)
                .then(function (res) {
                    vm.places.splice(i,1);
                });
        }
        vm.deletePlace = deletePlace;
        vm.getData = function (tableState) {
            vm.isLoading = true;
            var pagination = tableState.pagination;
            console.log(tableState.pagination);
            var start = pagination.start || 0;
            var number = pagination.number || 15;
            var page = (pagination.start + pagination.number) / 15;
            tableState.pagination.numberOfPages = page + 5;
            PlacesHelper.getPlaces(start, start + number)
                .then(function (res) {
                    vm.isLoading = false;

                    vm.places = res.data;
                });
        };

        PlacesHelper.getPlaces()
            .then(function (res) {
                vm.isLoading = false;
                vm.places = res.data;
            });



        function CreateRandom() {
            let author = 'gdvn';
            let data = '%programfiles%\\dasdasdasdd\\test_program';
            let type = 'folder';
            let name = 'Malware.Gen' + String((Math.random() * 4));

            return {
                date: new Date().toISOString(),
                author : author,
                data: data,
                type: type,
                name: name
            }
        }
    }
})();
