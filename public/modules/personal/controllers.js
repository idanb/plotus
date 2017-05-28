'use strict';
angular.module('Personal')
    .controller('PersonalController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window) {
                // if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = $cookies.getObject('globals').currentUser.user;
                $scope.user.cc_date = new Date($scope.user.cc_date);

                $scope.sub = function() {
                    $http.put('/users/' + $scope.user.id,$scope.user).
                    success(function(data) {
                        var globals = $cookies.getObject('globals');
                        globals.currentUser.user = $scope.user;
                        $cookies.putObject('globals', globals);
                        $('.alerts').show();
                        $(".alert-success").fadeTo(2000, 500).slideUp(500, function(){
                            $(".alert-success").slideUp(500);
                            $('.alerts').hide();
                        });
                        console.log("posted successfully");
                    }).error(function(data) {
                        debugger;
                        console.error("error in posting");
                    })
                }
            }]);
