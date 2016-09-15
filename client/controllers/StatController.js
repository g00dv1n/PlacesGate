
(function () {
    angular
        .module('placesGate')
        .controller('StatController', StatController);

    StatController.$inject = ['$scope', 'PlacesHelper'];

    function StatController($scope, PlacesHelper) {

        var vm = this;

        vm.isLoading = true;


        PlacesHelper.getStat()
            .then(function (res) {
                vm.stat = res.data;
                $scope.labels = Object.keys(vm.stat);
                $scope.data = [];
                for(let i=0;i<$scope.labels.length;i++) {
                    $scope.data[i] = vm.stat[$scope.labels[i]];
                }

                console.log($scope.data);
                vm.isLoading = false;
            });

    }
})();

