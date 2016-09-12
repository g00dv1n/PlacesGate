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
            });

        $locationProvider.html5Mode(true);
    }
})();
