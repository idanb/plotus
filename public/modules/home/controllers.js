'use strict';
angular.module('Home')
    .controller('HomeController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = $cookies.getObject('globals').currentUser.user;
                $scope.welcome_text = $cookies.getObject('globals').transactions.length >= 1  ? 'Welcome back, for additional fans transfer.' :
                    'Welcome to Plotu$, you have not made any money conversions yet. it\'s time to start !';
                // var URL = "https://openexchangerates.org/api/latest.json?app_id=1f49ab9363964bf2ad2f113800a44fbe";
                // $sce.trustAsResourceUrl(URL);
                // $http.get(URL)
                //     .then(function (response) {
                //         var types = ['USD','ILS','JPY','EUR','GBP'];
                //         $scope.rates = "";
                //         types.forEach(function(k) {
                //             $scope.rates += k + ':' + response.data.rates[k] + ', ';
                //         });
                //     }).catch(function (e) {
                //     console.log('error',e);
                // });




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