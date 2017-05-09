'use strict';
angular.module('Profile')
    .controller('ProfileController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = $cookies.getObject('globals').currentUser.user;
                $scope.show_nav = true;

                $scope.welcome_text = $cookies.getObject('globals').transactions.length >= 1  ? 'Welcome back, for additional fans transfer.' :
                    'Welcome to Plotu$, you have not made any money conversions yet. it\'s time to start !';
                $http.get('users/balance/' + $scope.user.id)
                    .then(function (response) {
                    $scope.balanace = response.data;
                    }).catch(function (e) {
                    console.log('error',e);
                });

                $scope.changePage = function(){
                    $location.path("/exchangeNow");
                }

            }]);