'use strict';
angular.module('Profile')
    .controller('ProfileController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = SessionFactory.getData().currentUser.user;
                $scope.balance = SessionFactory.getData().balance;
                $scope.show_nav = true;
                $scope.changePage = function(){
                    $location.path("/exchangeNow");
                }

            }]);