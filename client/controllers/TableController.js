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
            vm.updateData();
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
        };

        vm.clearFilter = function () {
            vm.env.selected.value = 'None';
            vm.authors.selected.value = 'None';
            vm.types.selected.value = 'None';

            vm.name = '';
            vm.md5 = '';
            vm.search = '';

            vm.updateData();

        };

        vm.updateData = function () {
            var env = vm.env && vm.env.selected  && vm.env.selected.value || '';
            var and = [];
            var name = '';
            if(env && env !== 'None') {
                and.push({
                    data: {$regex: '^' + env}
                });
            }
            if(vm.search) {
                and.push({
                    data: {$regex: vm.search, $options: 'i'}
                });
            }

            if(vm.name) {
                name = {$regex: vm.name, $options: 'i'};
            }

            var q = {
                author:vm.authors && vm.authors.selected && vm.authors.selected.value || '',
                type: vm.types && vm.types.selected  && vm.types.selected.value || '',
                $and: and,
                md5: vm.md5,
                name: name

            };

            for (var i in q) {
                if (!q[i] || q[i] === 'None' || q[i].length === 0) {
                    delete q[i];
                }
            }
            vm.fetchData(q)

        };

        function genPromise(name) {
            return Places.all(name).getList()
                .then(function (res) {
                    vm[name] = res.plain() || [];
                    console.log(vm[name]);
                    var i = vm[name].push('None') - 1;
                    vm[name].selected = {value: vm[name][i]};
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
