'use strict';
angular.module('Exchange')
    .controller('ExchangeNowController',
        ['$scope','$rootScope','$cookies', '$location', '$http','SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http,SessionFactory) {
                $scope.session = SessionFactory.getData().session;
                var user = SessionFactory.getData().currentUser.user;
                $scope.balance = SessionFactory.getData().balance;
                $scope.currency = SessionFactory.getData().currency;
                $scope.format = 'yyyy/MM/dd';
                $scope.date = new Date();
                $scope.rate_is_lower = false;
                if(!$scope.session) {
                    $scope.session = {
                        amount: "",
                        rate: $rootScope.parseAmount($scope.currency[0].rate / $scope.currency[1].rate),
                        req_curr: '1',
                        off_curr: '2'
                    }
                }
                else{
                    $scope.session.rate = $rootScope.parseAmount($scope.session.rate);

                }

                // $http.get('currency/')
                //     .then(function (response) {
                //         $scope.currency = response.data;
                //         $scope.updateRate();
                //         //$scope.session.rate = $scope.currency[$scope.session.req_curr-1].rate / $scope.currency[$scope.session.off_curr-1].rate
                //     }).catch(function (e) {
                //     console.log('error',e);
                // });


                $scope.updateRate = function(rate) {
                    console.log($scope.session.req_curr,$scope.session.off_curr);
                    // if( typeof $scope.session.off_curr != 'undefined' &&  typeof $scope.session.req_curr != 'undefined')
                    $scope.session.rate = $rootScope.parseAmount($scope.currency[$scope.session.req_curr-1].rate / $scope.currency[$scope.session.off_curr-1].rate);
                }


                $(".button").on("click", function() {

                    var $button = $(this);
                    var oldValue = $button.parent().find("input").val();
                    if(oldValue == '') oldValue = 1;

                    if ($button.text() == "+") {
                        var newVal = parseFloat(oldValue) + 0.1;
                    } else {
                        // Don't allow decrementing below zero
                        if (oldValue > 0) {
                            if($scope.currency[$scope.session.req_curr-1].rate / $scope.currency[$scope.session.off_curr-1].rate > (parseFloat(oldValue) - 0.1))
                            {
                                $scope.rate_is_lower = true;
                                $scope.$apply();
                                return true;
                            }
                            var newVal = parseFloat(oldValue) - 0.1;
                        } else {
                            //$scope.rate_is_lower = false;
                            newVal = 0;
                        }
                    }
                    $scope.rate_is_lower = false;
                    $scope.$apply();
                    //$scope.rate_is_lower = false;
                    $button.parent().find("input").val(newVal);

                });


                $scope.sub = function() {
                    $scope.amount_balance = $scope.balance[$scope.session.off_curr - 1].value;
                    $scope.overload = $scope.session.amount <= $scope.balance[$scope.session.off_curr - 1].value ? false : true

                    if ($scope.form.amount.$valid && !$scope.overload) {
                        SessionFactory.addData('session',$scope.session)
                        $location.path("/searchCurrencyRate");
                    }
                }


                $scope.today = function() {
                    $scope.dt = new Date();
                };
                $scope.today();
            }]);
