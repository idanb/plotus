'use strict';
angular.module('Personal')
    .controller('PersonalController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = $cookies.getObject('globals').currentUser.user;
                $scope.first_name = $scope.user.first_name;
                $scope.last_name = $scope.user.last_name;
                $scope.email_address = $scope.user.email_address;

            }]);