// ExchangeInFutureController


'use strict';
angular.module('Exchange')
    .controller('ExchangeInFutureController',
        ['$scope','$rootScope','$cookies', '$location', '$http','SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http,SessionFactory) {
                //if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');

                $scope.session = SessionFactory.getData().session;
                var user = SessionFactory.getData().currentUser.user;
                $scope.balance = SessionFactory.getData().balance;
                $scope.currency = SessionFactory.getData().currency;
                $scope.format = 'dd/MM/yyyy';
                $scope.date = new Date();
                $scope.rate_is_lower = false;
                if(!$scope.session) {
                    var tomorrow = new Date();
                    var afterTomorrow = new Date();
                    afterTomorrow.setDate(tomorrow.getDate());
                    debugger;
                    $scope.session = {
                        amount: "",
                        rate: parseFloat(($scope.currency[0].rate / $scope.currency[1].rate).toFixed(2)),
                        req_curr: '1',
                        off_curr: '2',
                        end_at: afterTomorrow
                    }
                }
                else{
                    $scope.session.end_at = new Date($scope.session.end_at);
                }

                $scope.updateRate = function(rate) {
                    debugger;
                    $scope.session.rate = $scope.currency[$scope.session.req_curr-1].rate / $scope.currency[$scope.session.off_curr-1].rate;
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
                            newVal = 0;
                        }
                    }
                    $scope.rate_is_lower = false;
                    $scope.$apply();
                    $button.parent().find("input").val(newVal);

                });


                $scope.sendForm = function() {
                    $scope.amount_balance = $scope.balance[$scope.session.off_curr - 1].value;
                    $scope.overload = $scope.session.amount <= $scope.balance[$scope.session.off_curr - 1].value ? false : true

                    if ($scope.form.amount.$valid && !$scope.overload) {
                        var transaction = angular.copy($scope.session);

                        transaction['currency_offer_amount'] = transaction['amount'];
                        delete transaction['amount'];

                        transaction['currency_requested_amount'] = transaction['currency_offer_amount'] * transaction['rate'];

                        transaction['currency_requested_type'] = transaction['req_curr'];
                        delete transaction['req_curr'];

                        transaction['currency_offer_type'] = transaction['off_curr'];
                        delete transaction['off_curr'];
                        delete transaction['end_date'];
                        delete transaction['rate'];

                        var created = new Date();
                        created.setTime(created.getTime() + (3*60*60*1000))

                        transaction['created_at'] = created.toISOString().slice(0, 19).replace('T', ' ');
                        transaction['end_at'] = $scope.session.end_at.toISOString().substring(0, 10);
                        transaction['offer_user_id'] = user.id;
                        //transaction['created_at'] = new Date().toISOString().slice(0, 19).replace('T', ' ');;

                        SessionFactory.addData('session',$scope.session)
                        console.log($scope.session);
                        debugger;
                        $http.post('/transactions',transaction).
                        success(function(data) {
                            $scope.transfer = transaction;
                            console.log(data);
                            $('#myModal').modal('show');
                            $('#myModal').on('hidden.bs.modal', function () {
                                $location.path("/");
                                $scope.$apply()
                            })
                        }).error(function(data) {
                            console.error("error in posting");
                        });
                    }
                }


                $scope.today = function() {
                    $scope.end_at = new Date();
                };
                $scope.today();

                Date.prototype.addDays = function(days) {
                    var dat = new Date(this.valueOf());
                    dat.setDate(dat.getDate() + days);
                    return dat;
                }

                $scope.dateOptions = {
                    //dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date().addDays(30*6),
                    minDate: new Date(),
                    startingDay: 1
                };


                // // Disable weekend selection
                // function disabled(data) {
                //     var date = data.date,
                //         mode = data.mode;
                //     return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                // }

                // $scope.toggleMin = function() {
                //     //$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                //     $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
                // };
                //
                // $scope.toggleMin();
                $scope.openCalendar = function() {
                    $scope.calPopup.opened = true;
                };

                // $scope.setDate = function(year, month, day) {
                //     $scope.dt = new Date(year, month, day);
                // };
                //
                //$scope.formats = [, 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                // $scope.altInputFormats = ['M!/d!/yyyy'];
                //
                $scope.calPopup = {
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
                // $scope.$apply();
            }]);