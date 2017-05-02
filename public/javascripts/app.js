'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Profile', []);
angular.module('Personal', []);
angular.module('Exchange', []);

angular.module('PlotusApp', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies',
    'Profile',
    'Personal',
    'Exchange',
])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'modules/authentication/views/login.html',
                hideMenus: true
            })
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'modules/home/views/home.html'
            })
            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'modules/profile/views/profile.html'
            })
            .when('/personal', {
                templateUrl: 'modules/personal/views/personal.html',
                controller: 'PersonalController',

            })
            .when('/exchangenow', {
                templateUrl: 'modules/exchangenow/views/exchangenow.html',
                controller: 'ExchangeNowController',

            })

            .otherwise({ redirectTo: '/login' });
    }])
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            $rootScope.currentPath = $location.path();

            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
        }]);