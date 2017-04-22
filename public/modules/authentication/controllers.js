'use strict';
//http://www.apilayer.net/api/live?access_key=284b0fa1855d9fc703d67d39bae6a659&currencies=USD,ILS,JPY,EUR,GBP&format = 1
angular.module('Authentication')

    .controller('LoginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService',
            function ($scope, $rootScope, $location, AuthenticationService) {
                // reset login status
                AuthenticationService.ClearCredentials();

                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.email, $scope.password, function(response) {
                        if(response.success) {
                            AuthenticationService.SetCredentials($scope.email, $scope.password, response.user,
                                response.transactions);
                            $location.path('/');
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };
            }]);