'use strict';
angular.module('Exchange')
    .controller('exchangeConfirmController',
        ['$scope','$rootScope','$cookies', '$location', '$http', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, SessionFactory) {
                if(typeof SessionFactory.getData().session == 'undefined') $location.path('/login');
                var user = SessionFactory.getData().currentUser.user;

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
                            $scope.transfer.names += trans.first_name + " " + trans.last_name + ", ";
                        });
                    }

                     angular.forEach($scope.ptransactions, function (tran, key) {
                         $http.put('/transactions/'+ tran.id +'/'+ user.id)
                             .then(function () {
                                 $http.put('/users/balance/'+ user.id + '/' + tran.currency_requested_type, {value:  -1 * tran.currency_requested_amount});
                                 $http.put('/users/balance/'+ user.id + '/' + tran.currency_offer_type, {value: tran.currency_offer_amount});

                                 $http.put('/users/balance/'+ tran.offer_user_id + '/' + tran.currency_requested_type, {value: tran.currency_requested_amount});
                                 $http.put('/users/balance/'+ tran.offer_user_id + '/' + tran.currency_offer_type, {value: -1 * tran.currency_offer_amount});

                                 SessionFactory.addData('is_new',false);
                                 $('#myModal').modal('show');
                                 $('#myModal').on('hidden.bs.modal', function () {
                                     $location.path("/");
                                     $scope.$apply();
                                 })
                             }).catch(function (e) {
                                console.log('error',e);
                         });
                     });
                }
            }]);
