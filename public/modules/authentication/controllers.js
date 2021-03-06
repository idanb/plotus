'use strict';
angular.module('Authentication')
    .controller('LoginController',
        ['$scope', '$rootScope', '$location', '$timeout', '$http', 'AuthenticationService', 'SessionFactory',
            function ($scope, $rootScope, $location, $timeout, $http, AuthenticationService, SessionFactory) {
                // reset login status
                AuthenticationService.ClearCredentials();
                $rootScope.currentPath = $location.path();
                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.email, $scope.password, function(response) {
                        if(response.success) {
                            AuthenticationService.SetCredentials($scope.email, $scope.password, response.user);
                            SessionFactory.addData('is_new',response.is_new);
                            $http.get('currency/')
                                .then(function (response) {
                                    SessionFactory.addData('currency',response.data);
                                    $http.get('users/balance/' + SessionFactory.getData().currentUser.user.id)
                                        .then(function (response) {
                                            $scope.balance = response.data;
                                            SessionFactory.addData('balance',response.data);

                                        }).catch(function (e) {
                                        console.log('error',e);
                                    });

                                }).catch(function (e) {
                                console.log('error',e);
                            });

                            $timeout(function(){ $location.path('/'); },2000);
                        } else {
                            $('.alert.alert-danger').show();
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };
            }]);