'use strict';
angular.module('Home')
    .controller('convertorController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
                // if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');

                $scope.currencys = SessionFactory.getData().currency;
                $scope.selected_curr = $scope.currencys[0];
                $scope.selected_curr_index = "1";

                $scope.change_curr = function(){
                    $scope.selected_curr = $scope.currencys[$scope.selected_curr_index - 1];
                }

            }]);