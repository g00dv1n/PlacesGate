/**
 * Created by g00dv1n on 12.09.16.
 */
(function () {
    angular
        .module('placesGate')
        .controller('TableController', TableController);

    TableController.$inject = ['$scope', 'PlacesHelper', '$timeout', 'Places']

    function TableController($scope, PlacesHelper,$timeout, Places) {

        let vm  = this;

        vm.places = [];



        function deletePlace(element) {
            var i = vm.places.indexOf(element);
            var id = element._id;
            console.log(i);
            //PlacesHelper.deletePlace(id)
            Places.one(id).remove()
                .then(function (res) {
                    vm.places.splice(i,1);
                });
        }
        vm.deletePlace = deletePlace;
        vm.getData = function (tableState) {
            vm.isLoading = true;
            var pagination = tableState.pagination;
            console.log(tableState.pagination);
            vm.start = pagination.start || 0;
            var number = pagination.number || 15;
            var page = (pagination.start + pagination.number) / 15;
            tableState.pagination.numberOfPages = page + 5;
            //PlacesHelper.get(start, start + number)
            /*Places.getList({from: vm.start, to: vm.start + 15})
                .then(function (res) {
                    vm.isLoading = false;
                    vm.places = res.plain();
                });*/
            vm.fetchData({});
        };

        vm.fetchData = function (q) {
            Places.getList({
                from: vm.start,
                to: vm.start + 15,
                q: q
            })
                .then(function (res) {
                    vm.isLoading = false;
                    vm.places = res.plain();
                });
        }

        vm.updateData = function () {
            var q = {
                author: vm.authors.selected && vm.authors.selected.value || '',
                type: vm.types.selected  && vm.types.selected.value || ''

            };

            for (var i in q) {
                if (!q[i]) {
                    delete q[i];
                }
            }
            vm.fetchData(q)

        }

        function genPromise(name) {
            return Places.all(name).getList()
                .then(function (res) {
                    vm[name] = res.plain() || [];
                    console.log(vm[name]);
                });
        }

        genPromise('env');
        genPromise('types');
        genPromise('authors');


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
