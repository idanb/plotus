'use strict';
angular.module('Exchange')
    .controller('addToBalanceController',
        ['$scope','$rootScope','$cookies', '$location', '$http', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, SessionFactory) {
                if(typeof SessionFactory.getData().session_currency == 'undefined') $location.path('/');
                $scope.user = SessionFactory.getData().currentUser.user;
                $scope.session_balance = SessionFactory.getData().session_balance;
                $scope.currency = SessionFactory.getData().currency;
                $scope.session_currency = SessionFactory.getData().session_currency;
                $scope.limit = (100 / $scope.currency[0].rate * $scope.session_currency.rate).toFixed(2); //minimum 100 Shekel in dollar
                $scope.min_value = $scope.currency[$scope.session_currency.id - 1].rate
                $scope.session_balance = {
                    amount: "",
                    curr: $scope.session_currency
                }

                $scope.user.credit_card = $scope.user.credit_card.replace(/\d(?=\d{4})/g, "*");

                $scope.sub = function() {
                    $scope.under_minimum = $scope.session_balance.amount < $scope.limit;
                    if (!$scope.under_minimum && $scope.form.amount.$valid) {
                        SessionFactory.addData('session_balance',$scope.session_balance)
                        $location.path("/addToBalanceConfirm");
                    }
                }


            }]);
