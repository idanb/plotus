'use strict';
angular.module('Exchange')
    .controller('ExchangeInFutureController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window','$animate', '$sanitize',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, uibDateParser,SessionFactory) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');

                $scope.session = $cookies.getObject('globals').session;
                var user = $cookies.getObject('globals').currentUser.user;
                $scope.balance = $cookies.getObject('globals').balanace;
                $scope.format = 'yyyy/MM/dd';
                $scope.date = new Date();
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
                        $scope.session.rate = $scope.currency[$scope.session.off_curr-1].rate / $scope.currency[$scope.session.req_curr-1].rate
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
                                alert('you cannot offer under formal Exchange rate');
                                return true;
                            }

                            var newVal = parseFloat(oldValue) - 0.1;
                        } else {
                            newVal = 0;
                        }
                    }

                    $button.parent().find("input").val(newVal);

                });


                $scope.sub = function() {
                    $rootScope.session = $scope.session;
                    var globals = $cookies.getObject('globals');

                    globals.session = $rootScope.session;
                    $cookies.putObject('globals', globals);
                    $location.path("/searchCurrencyRate");
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

                Date.prototype.addDays = function(days) {
                    var dat = new Date(this.valueOf());
                    dat.setDate(dat.getDate() + days);
                    return dat;
                }

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date().addDays(30),
                    minDate: new Date(),
                    startingDay: 1
                };



                //var dat = new Date();

                //alert()

                // // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                        mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }
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



                // $scope.user = $cookies.getObject('globals').currentUser.user;
                // $scope.user.cc_date = new Date($scope.user.cc_date);
                //
                //
                // $scope.sub = function() {
                //     $http.put('/users/' + $scope.user.id,$scope.user).
                //     success(function(data) {
                //         var globals = $cookies.getObject('globals');
                //         globals.currentUser.user = $scope.user;
                //         $cookies.putObject('globals', globals);
                //         $(".alert-success").fadeTo(2000, 500).slideUp(500, function(){
                //             $(".alert-success").slideUp(500);
                //         });
                //         console.log("posted successfully");
                //     }).error(function(data) {
                //         debugger;
                //         console.error("error in posting");
                //     })
                // }


            }]);
