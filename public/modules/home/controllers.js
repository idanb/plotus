'use strict';
angular.module('Home')
    .controller('HomeController',
        ['$scope','$rootScope','$cookies',
            function ($scope, $rootScope, $cookies) {
                $scope.user = $cookies.getObject('globals').currentUser.user
                $scope.welcome_text = $cookies.getObject('globals').transactions.length <= 1  ? 'Welcome back, for additional fans transfer' :
                    'you have not made any money conversions yet.';
            }]);