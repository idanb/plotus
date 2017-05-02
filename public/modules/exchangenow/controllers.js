'use strict';
angular.module('Exchange')
    .controller('ExchangeNowController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window) {
                if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');



                $http.get('currency/')
                    .then(function (response) {
                        debugger;
                        $scope.currency = response.data;
                    }).catch(function (e) {
                    console.log('error',e);
                });


                $(".button").on("click", function() {

                    var $button = $(this);
                    var oldValue = $button.parent().find("input").val();

                    if ($button.text() == "+") {
                        var newVal = parseFloat(oldValue) + 0.1;
                    } else {
                        // Don't allow decrementing below zero
                        if (oldValue > 0) {
                            var newVal = parseFloat(oldValue) - 0.1;
                        } else {
                            newVal = 0;
                        }
                    }

                    $button.parent().find("input").val(newVal);

                });


                // $scope.user = $cookies.getObject('globals').currentUser.user;
                // $scope.user.cc_date = new Date($scope.user.cc_date);
                //
                //
                // $scope.sub = function() {
                //     $http.put('/users/' + $scope.user.id,$scope.user).
                //     success(function(data) {
                //         var globals = $cookies.getObject('globals');
                //         globals.currentUser.user = $scope.user;
                //         $cookies.putObject('globals', globals);
                //         $(".alert-success").fadeTo(2000, 500).slideUp(500, function(){
                //             $(".alert-success").slideUp(500);
                //         });
                //         console.log("posted successfully");
                //     }).error(function(data) {
                //         debugger;
                //         console.error("error in posting");
                //     })
                // }


            }]);
