'use strict';
angular.module('Exchange')
    .controller('addToBalanceConfirmController',
        ['$scope','$rootScope','$cookies', '$location', '$http', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, SessionFactory) {
                if(typeof SessionFactory.getData().session_balance == 'undefined') $location.path('/');
                $scope.user = SessionFactory.getData().currentUser.user;
                $scope.session_balance = SessionFactory.getData().session_balance;


                $scope.user.credit_card = $scope.user.credit_card.replace(/\d(?=\d{4})/g, "*");

                $scope.sub = function() {

                    $http.put('/users/addToBalance/'+ $scope.user.id + '/' + $scope.session_balance.curr.id, $scope.session_balance).
                    success(function(data) {
                        $location.path("/addToBalanceFinal");
                    }).error(function(data) {
                        console.error("error in posting");
                    });
                }

            }]);
