// ExchangeInFutureController


'use strict';
angular.module('Exchange')
    .controller('ExchangeInFutureController',
        ['$scope','$rootScope','$cookies', '$location', '$http','SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http,SessionFactory) {
                if(typeof SessionFactory.getData().currentUser == 'undefined') $location.path('/login');

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
                    $scope.session = {
                        amount: "",
                        rate: parseFloat(($scope.currency[0].rate / $scope.currency[1].rate).toFixed(2)),
                        req_curr: '1',
                        off_curr: '2',
                        end_at: afterTomorrow
                    }
                }
                else{
                    $scope.session.rate = parseFloat($scope.session.rate.toFixed(2));
                    $scope.session.end_at = new Date($scope.session.end_at);
                }

                $scope.updateRate = function(rate) {
                    $scope.session.rate = parseFloat(($scope.currency[$scope.session.req_curr-1].rate / $scope.currency[$scope.session.off_curr-1].rate).toFixed(2));
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
                        transaction['currency_requested_amount'] = (transaction['currency_offer_amount'] * transaction['rate']).toFixed(2);
                        transaction['currency_requested_type'] = transaction['req_curr'];
                        transaction['currency_offer_type'] = transaction['off_curr'];

                        delete transaction['amount'];
                        delete transaction['req_curr'];
                        delete transaction['off_curr'];
                        delete transaction['end_date'];
                        delete transaction['rate'];

                        var created = new Date();
                        created.setTime(created.getTime() + (3*60*60*1000))

                        transaction['created_at'] = created.toISOString().slice(0, 19).replace('T', ' ');
                        transaction['end_at'] = $scope.session.end_at.toISOString().substring(0, 10);
                        transaction['offer_user_id'] = user.id;
                        //transaction['created_at'] = new Date().toISOString().slice(0, 19).replace('T', ' ');;

                        SessionFactory.addData('session',$scope.session);
                        $http.post('/transactions',transaction).
                        success(function(data) {
                            SessionFactory.addData('is_new',false);
                            $scope.transfer = transaction;
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
                };

                $scope.dateOptions = {
                    //dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date().addDays(30*6),
                    minDate: new Date(),
                    startingDay: 1
                };

                $scope.openCalendar = function() {
                    $scope.calPopup.opened = true;
                };

                $scope.calPopup = {
                    opened: false
                };
            }]);