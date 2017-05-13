'use strict';
angular.module('Home')
    .controller('HomeController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = SessionFactory.getData().currentUser.user;
                $scope.welcome_text = SessionFactory.getData().transactions.length >= 1  ? 'Welcome back, for additional fans transfer.' :
                    'Welcome to Plotu$, you have not made any money conversions yet. it\'s time to start !';

                $('[data-toggle="tooltip"]').tooltip();
                $scope.exchangenow = function() {
                    $location.path("/exchangeNow");
                }

                $scope.exchangefuture = function() {
                    $location.path("/exchangeInFuture");
                }

            }]);