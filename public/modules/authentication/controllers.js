'use strict';
angular.module('Authentication')
    .controller('LoginController',
        ['$scope', '$rootScope', '$location', '$timeout', 'AuthenticationService',
            function ($scope, $rootScope, $location, $timeout, AuthenticationService) {
                // reset login status
                AuthenticationService.ClearCredentials();
                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.email, $scope.password, function(response) {
                        if(response.success) {
                            AuthenticationService.SetCredentials($scope.email, $scope.password, response.user,
                                response.transactions);
                            $timeout(function(){ $location.path('/'); },2000);
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };
            }]);