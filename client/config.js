(function () {
    angular
        .module('placesGate')
        .config(appConfig);

    appConfig.$inject = ['$routeProvider', '$locationProvider'];
    function appConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './views/main.html',
                controller: 'TableController',
                controllerAs: 'vm'

            })
            .when('/new', {
                templateUrl: './views/place.html',
                controller: 'PlaceController',
                controllerAs: 'vm',
                isNew: true,
            })
            .when('/edit/:id', {
                templateUrl: './views/place.html',
                controller: 'PlaceController',
                controllerAs: 'vm',
                isNew: false
            });

        $locationProvider.html5Mode(true);
    }
})();
