'use strict';
angular.module('Home')
    .controller('HomeController',
        ['$scope','$rootScope','$cookies', '$location', '$http',
            function ($scope, $rootScope, $cookies, $location, $http) {
        debugger;
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = $cookies.getObject('globals').currentUser.user
                $scope.welcome_text = $cookies.getObject('globals').transactions.length <= 1  ? 'Welcome back, for additional fans transfer.' :
                    'Welcome to Plotu$, you have not made any money conversions yet. it\'s time to start !';
                $http.get("http://www.apilayer.net/api/live?access_key=284b0fa1855d9fc703d67d39bae6a659&currencies=USD,ILS,JPY,EUR,GBP&format = 1")
                    .then(function(response) {
                        $scope.rates = response.data.quotes;
                    });
            }]);