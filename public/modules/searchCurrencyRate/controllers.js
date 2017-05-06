'use strict';
angular.module('Exchange')
    .controller('SearchCurrencyRateController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                var user = $cookies.getObject('globals').currentUser.user;
                var session = $cookies.getObject('globals').session;
                var currency = $cookies.getObject('globals').currency;
                $scope.notice = false;

                $scope.offered_amount = session.amount;
                $scope.offered_amount_currency = currency[session.off_curr-1].code;

                $scope.requested_amount = (Math.round(session.amount * session.rate * 100)/100).toFixed(2);
                $scope.requested_amount_currency = currency[session.req_curr-1].code;

                $scope.propertyName = 'rate';
                $scope.selectedDeal = {};

                $scope.sortBy = function(propertyName) {
                    $scope.propertyName = propertyName;
                };

                $scope.confirmSelection = function() {
                    var globals = $cookies.getObject('globals');
                    globals.prefreredDeals = [];

                    if(angular.equals($scope.selectedDeal, {})){
                        alert('none selected');
                        return;
                    }

                    angular.forEach($scope.selectedDeal, function(value, key) {
                        globals.prefreredDeals.push($scope.ptransactions[key]);
                    });

                    $cookies.putObject('globals', globals);
                    $location.path("/exchangeConfirm");
                }

                $http.get('/transactions/'+ session.off_curr +'/'+ session.req_curr +'/' + user.id)
                    .then(function (response) {
                        if(response.data.length == 0) $scope.notice = true;
                        $scope.ptransactions = response.data;
                    }).catch(function (e) {
                    console.log('error',e);
                });
            }]);
