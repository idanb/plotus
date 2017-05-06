'use strict';
angular.module('Exchange')
    .controller('exchangeConfirmController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.ptransactions = $cookies.getObject('globals').prefreredDeals;
                var user = $cookies.getObject('globals').currentUser.user;

                debugger;


                $scope.confirmTransfer = function() {
                    debugger;
                    $scope.transfer = $scope.ptransactions[0];
debugger;

                    $http.put('/transactions/'+ $scope.transfer.id +'/'+ user.id)
                        .then(function (response) {
                            //$scope.ptransactions = response.data;
                            debugger;
                            $('#myModal').modal('show');
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
