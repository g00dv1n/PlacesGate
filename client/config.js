(function () {
    angular
        .module('placesGate')
        .config(appConfig)
        .constant('constConfig' ,{
            host: '127.0.0.1',
            port: 8080
        });

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
            })
            .when('/stat', {
                templateUrl: './views/stat.html',
                controller: 'StatController',
                controllerAs: 'vm',
                isNew: false
            });

        //$locationProvider.html5Mode(true);
    }
})();
