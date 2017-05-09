'use strict';
angular.module('Home')
    .controller('HomeController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = $cookies.getObject('globals').currentUser.user;
                $scope.welcome_text = $cookies.getObject('globals').transactions.length >= 1  ? 'Welcome back, for additional fans transfer.' :
                    'Welcome to Plotu$, you have not made any money conversions yet. it\'s time to start !';
                $http.get('currency/')
                    .then(function (response) {
                        var globals = $cookies.getObject('globals');

                        globals.currency = response.data;
                        $cookies.putObject('globals', globals);
                        $http.get('users/balance/' + $scope.user.id)
                            .then(function (response) {
                                $scope.balanace = response.data;
                                globals.balanace = $scope.balanace;
                                $cookies.putObject('globals', globals);

                            }).catch(function (e) {
                            console.log('error',e);
                        });

                    }).catch(function (e) {
                    console.log('error',e);
                });





                $scope.exchangenow = function() {
                    $location.path("/exchangeNow");
                }

            }]);