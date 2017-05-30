'use strict';
angular.module('Profile')
    .controller('ProfileController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
                // if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = SessionFactory.getData().currentUser.user;

                $http.get('users/balance/' + SessionFactory.getData().currentUser.user.id)
                    .then(function (response) {
                        $scope.balance = response.data;
                        SessionFactory.addData('balance',response.data);

                    }).catch(function (e) {
                    console.log('error',e);
                });

                $scope.addToBalance = function(currency){
                    SessionFactory.addData('session_currency',currency);
                    $location.path('/addToBalance');
                }

                $scope.show_nav = true;
                $scope.changePage = function(url){
                    $location.path(url);
                }

            }]);