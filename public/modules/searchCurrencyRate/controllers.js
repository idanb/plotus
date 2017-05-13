'use strict';
angular.module('Exchange')
    .controller('SearchCurrencyRateController',
        ['$scope','$rootScope','$cookies', '$location', '$http', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, SessionFactory) {
                if(typeof SessionFactory.getData().session == 'undefined') $location.path('/login');
                var user = SessionFactory.getData().currentUser.user;
                var session = SessionFactory.getData().session;
                var currency = SessionFactory.getData().currency;
                $scope.notice = false;

                $scope.offered_amount = session.amount;
                $scope.offered_amount_currency = currency[session.off_curr-1].code;

                $scope.requested_amount = (Math.round(session.amount * session.rate * 100)/100).toFixed(2);
                $scope.requested_amount_currency = currency[session.req_curr-1].code;

                $scope.propertyName = 'rate';
                $scope.selectedDeal = {};

                var globals = $cookies.getObject('globals');
                globals.prefreredDeals = [];

                $scope.sortBy = function(propertyName) {
                    $scope.propertyName = propertyName;
                };

                $scope.confirmSelection = function() {
                    //var globals = $cookies.getObject('globals');
                    //globals.prefreredDeals = [];

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

                $http.get('/transactions/'+ session.req_curr  +'/'+ session.off_curr +'/' + user.id)
                    .then(function (response) {
                        if(response.data.length == 0) $scope.notice = true;
                        $scope.ptransactions = response.data;
                    }).catch(function (e) {
                    console.log('error',e);
                });
            }]);
