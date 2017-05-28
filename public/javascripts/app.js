'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Profile', []);
angular.module('Personal', []);
angular.module('Exchange', []);
angular.module('Withdraw', []);
angular.module('Helpers', []);

var PlotusApp = angular.module('PlotusApp', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'ngCookies',
    'Profile',
    'Personal',
    'Exchange',
    'Withdraw',
    'Helpers',
    'angularCSS',
    'LocalStorageModule',
    'ui.bootstrap',
    'nemLogging',
    'uiGmapgoogle-maps' // AIzaSyBxeGpuLv3hg5yQ_nfk2wILCpZO-Sqzms4
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
                controller: 'PersonalController'

            })
            .when('/exchangeNow', {
                templateUrl: 'modules/exchangeNow/views/exchangeNow.html',
                controller: 'ExchangeNowController',
                css: {
                    href: 'styles/exchangeForm.css',
                    bustCache: true
                }
            })
            .when('/exchangeInFuture', {
                templateUrl: 'modules/exchangeInFuture/views/exchangeInFuture.html',
                controller: 'ExchangeInFutureController',
                css: 'styles/exchangeForm.css'

            })
            .when('/searchCurrencyRate', {
                templateUrl: 'modules/searchCurrencyRate/views/searchCurrencyRate.html',
                controller: 'SearchCurrencyRateController'

            })
            .when('/exchangeConfirm', {
                templateUrl: 'modules/exchangeConfirm/views/exchangeConfirm.html',
                controller: 'exchangeConfirmController'
            })
            .when('/withdraw', {
                controller: 'WithdrawController',
                templateUrl: 'modules/withdraw/views/withdraw.html'

            })
            .when('/withdrawCash', {
                controller: 'WithdrawCashController',
                templateUrl: 'modules/withdrawCash/views/withdrawCash.html',
                css: 'styles/exchangeForm.css'

            }).when('/requestDebit', {
                controller: 'RequestDebitController',
                templateUrl: 'modules/requestDebit/views/requestDebit.html',
                css: 'styles/exchangeForm.css'

            })

            .otherwise({ redirectTo: '/login' });
    }])
    // .config(function(uiGmapGoogleMapApiProvider) {
    //     uiGmapGoogleMapApiProvider.configure({
    //         key: 'AIzaSyBxeGpuLv3hg5yQ_nfk2wILCpZO-Sqzms4',
    //         v: '3.20', //defaults to latest 3.X anyhow
    //         libraries: 'weather,geometry,visualization'
    //     });
    // })
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