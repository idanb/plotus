'use strict';
angular.module('Home')
    .controller('HomeController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
                // if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $rootScope.currentPath = $location.path();
                $scope.user = SessionFactory.getData().currentUser.user;
                $scope.welcome_text = SessionFactory.getData().transactions.length >= 1  ? 'Welcome back, for additional funds transfer.' :
                    'Welcome to Plotu$, you have not made any money conversions yet. it\'s time to start !';

                var isOS = /iPad|iPhone|iPod/.test(navigator.platform);
                if(isOS) $('body').on("touchstart", function(e){
                    $('[data-toggle="tooltip"]').each(function () {
                        // hide any open tooltips when the anywhere else in the body is clicked
                        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.tooltip').has(e.target).length === 0) {
                            $(this).tooltip('hide');
                        }////end if
                    });
                });

                $('[data-toggle="tooltip"]').tooltip();
                $scope.exchangenow = function() {
                    $location.path("/exchangeNow");
                }

                $scope.exchangefuture = function() {
                    $location.path("/exchangeInFuture");
                }

            }]);