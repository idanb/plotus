'use strict';
angular.module('Exchange')
    .controller('exchangeConfirmController',
        ['$scope','$rootScope','$cookies', '$location', '$http', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, SessionFactory) {
                if(typeof SessionFactory.getData().session == 'undefined') $location.path('/login');
                var user = SessionFactory.getData().currentUser.user;
                var session = SessionFactory.getData().session;
                var currency = SessionFactory.getData().currency;


                $scope.ptransactions = $cookies.getObject('globals').prefreredDeals;

                $scope.confirmTransfer = function() {
                    $scope.transfer = angular.copy($scope.ptransactions[0]);
                    $scope.transfer.names = $scope.transfer.first_name + " " + $scope.transfer.last_name;


                    if($scope.ptransactions.length > 1) {
                        $scope.transfer.currency_offer_amount = 0;
                        $scope.transfer.currency_requested_amount = 0;
                        angular.forEach($scope.ptransactions, function (trans, key) {
                            $scope.transfer.currency_offer_amount += trans.currency_offer_amount;
                            $scope.transfer.currency_requested_amount += trans.currency_requested_amount;
                            $http.put('/users/balance/'+ $scope.transfer.offer_user_id + '/' + trans.currency_requested_type, {value: $scope.transfer.currency_requested_amount});
                            $http.put('/users/balance/'+ $scope.transfer.offer_user_id + '/' + trans.currency_offer_type, {value: -1 * $scope.transfer.currency_offer_amount});

                            $scope.transfer.names = trans.first_name + " " + trans.last_name;
                            if(key == 0) return true;
                            $http.put('/transactions/'+ trans.id +'/'+ user.id);
                        });
                    }

                    $http.put('/transactions/'+ $scope.transfer.id +'/'+ user.id)
                        .then(function (response) {
                            //$scope.ptransactions = response.data;
                            $http.put('/users/balance/'+ user.id + '/' + $scope.transfer.currency_requested_type, {value:  -1 * $scope.transfer.currency_requested_amount});
                            $http.put('/users/balance/'+ user.id + '/' + $scope.transfer.currency_offer_type, {value: $scope.transfer.currency_offer_amount});

                             $('#myModal').modal('show');
                            $('#myModal').on('hidden.bs.modal', function () {
                                $location.path("/");
                                $scope.$apply()
                            })
                        }).catch(function (e) {
                        console.log('error',e);
                    });
                }


                // Amount of money for conversion: {{transfer_amount_off}} {{transfer_curr_off}}
                // Source currency: {{transfer_curr_off}}
                // Target currency: {{transfer_curr_req}}
                // Exchange rate: {{transfer_amount_off / transfer_amount_req}}
                // Amount of money after conversion: {{transfer_amount_req}} {{transfer_curr_req}}
                // You chose to exchange the money with {{transfer_offerd_user}}
//                 var session = $cookies.getObject('globals').session;
//                 var currency = $cookies.getObject('globals').currency;
// debugger;
//                 $scope.offered_amount = session.amount;
//                 $scope.offered_amount_currency = currency[session.off_curr].code;
//
//                 $scope.requested_amount = session.amount * session.rate;
//                 $scope.requested_amount_currency = currency[session.req_curr].code;
//
//                 $scope.propertyName = 'rate';
//                 $scope.selectedDeal = null;
//
//                 $scope.sortBy = function(propertyName) {
//                     $scope.propertyName = propertyName;
//                 };
//                 $scope.selectDeal = function(index) {
//                     $scope.selectedDeal = index;
//                 };
//
//
//
//
//                 $http.get('/transactions/'+ session.off_curr +'/'+ session.req_curr +'/' + user.id)
//                     .then(function (response) {
//                         $scope.ptransactions = response.data;
//                     }).catch(function (e) {
//                     console.log('error',e);
//                 });
            }]);
