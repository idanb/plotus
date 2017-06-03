'use strict';
angular.module('Home')
    .controller('HomeController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
                // if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $rootScope.currentPath = $location.path();
                $scope.user = SessionFactory.getData().currentUser.user;
                $scope.welcome_text_1 = !SessionFactory.getData().is_new  ? 'Welcome back, ' :
                    'Welcome to Plotu$,';

                $scope.welcome_text_2 = !SessionFactory.getData().is_new  ? 'for additional funds transfer.' :
                    'you have not made any money conversions yet. it\'s time to start !';


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