'use strict';
angular.module('Home')
    .controller('aboutController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
                // if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');

            }]);