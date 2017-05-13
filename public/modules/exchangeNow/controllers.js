'use strict';
angular.module('Exchange')
    .controller('ExchangeNowController',
        ['$scope','$rootScope','$cookies', '$location', '$http','SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http,SessionFactory) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');

                $scope.session = SessionFactory.getData().session;
                var user = SessionFactory.getData().currentUser.user;
                $scope.balance = SessionFactory.getData().balance;
                $scope.format = 'yyyy/MM/dd';
                $scope.date = new Date();
                $scope.rate_is_lower = false;
                if($scope.session) {
                    //$scope.current_rate = $scope.session.rate
                }
                else{
                    $scope.session = {
                        amount: "",
                        rate:1,
                        req_curr: '1',
                        off_curr: '2'

                    }
                }

                $http.get('currency/')
                    .then(function (response) {
                        $scope.currency = response.data;
                        $scope.updateRate();
                        //$scope.session.rate = $scope.currency[$scope.session.req_curr-1].rate / $scope.currency[$scope.session.off_curr-1].rate
                    }).catch(function (e) {
                    console.log('error',e);
                });


                $scope.updateRate = function(rate) {
                    console.log($scope.session.req_curr,$scope.session.off_curr);
                    // if( typeof $scope.session.off_curr != 'undefined' &&  typeof $scope.session.req_curr != 'undefined')
                    $scope.session.rate = $scope.currency[$scope.session.req_curr-1].rate / $scope.currency[$scope.session.off_curr-1].rate
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
                //
                // $scope.clear = function() {
                //     $scope.dt = null;
                // };
                //
                // $scope.inlineOptions = {
                //     customClass: getDayClass,
                //     minDate: new Date(),
                //     showWeeks: true
                // };
                //
                // $scope.dateOptions = {
                //     dateDisabled: disabled,
                //     formatYear: 'yy',
                //     maxDate: new Date(2020, 5, 22),
                //     minDate: new Date(),
                //     startingDay: 1
                // };
                //
                // // Disable weekend selection
                // function disabled(data) {
                //     var date = data.date,
                //         mode = data.mode;
                //     return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                // }
                //
                // $scope.toggleMin = function() {
                //     $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                //     $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
                // };
                //
                // $scope.toggleMin();
                //
                $scope.open1 = function() {
                    $scope.popup1.opened = true;
                };
                //
                // $scope.open2 = function() {
                //     $scope.popup2.opened = true;
                // };
                //
                // $scope.setDate = function(year, month, day) {
                //     $scope.dt = new Date(year, month, day);
                // };
                //
                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                // $scope.altInputFormats = ['M!/d!/yyyy'];
                //
                $scope.popup1 = {
                    opened: false
                };
                //
                // $scope.popup2 = {
                //     opened: false
                // };
                //
                // var tomorrow = new Date();
                // tomorrow.setDate(tomorrow.getDate() + 1);
                // var afterTomorrow = new Date();
                // afterTomorrow.setDate(tomorrow.getDate() + 1);
                // $scope.events = [
                //     {
                //         date: tomorrow,
                //         status: 'full'
                //     },
                //     {
                //         date: afterTomorrow,
                //         status: 'partially'
                //     }
                // ];
                //
                // function getDayClass(data) {
                //     var date = data.date,
                //         mode = data.mode;
                //     if (mode === 'day') {
                //         var dayToCheck = new Date(date).setHours(0,0,0,0);
                //
                //         for (var i = 0; i < $scope.events.length; i++) {
                //             var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
                //
                //             if (dayToCheck === currentDay) {
                //                 return $scope.events[i].status;
                //             }
                //         }
                //     }
                //
                //     return '';
                // }
            }]);
