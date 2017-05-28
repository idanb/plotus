'use strict';
angular.module('Withdraw')
    .controller('RequestDebitController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {

                $scope.session_debit = {};
                $scope.show1 = true;

                $scope.user = SessionFactory.getData().currentUser.user;
                $scope.currency = SessionFactory.getData().currency;
                $scope.balance = SessionFactory.getData().balance;

                $scope.session_debit.email_address = $scope.user.email_address;

                $scope.options = {
                    disableDefaultUI: true,
                    scrollwheel: false
                };
                $scope.randomMarkers = [];

                $http.get('currency/atms').success(function(markers) {
                    $scope.randomMarkers = markers;
                }).catch(function(data){
                    console.log(data);
                });


                $scope.windowOptions = {
                    boxClass: "infobox",
                    boxStyle: {
                        backgroundColor: "white",
                        border: "1px solid #bfb478",
                        width: "74px",
                        borderRadius: "5px",
                        height: "17px",
                        padding: "2px"
                    },
                    content: "atm selected",
                    disableAutoPan: true,
                    maxWidth: 0,

                    zIndex: null,

                    isHidden: false,
                    pane: "floatPane",
                    enableEventPropagation: false
                };


                $http.get('users/balance/' + SessionFactory.getData().currentUser.user.id)
                    .then(function (response) {
                        $scope.balance = response.data;
                        SessionFactory.addData('balance',response.data);

                    }).catch(function (e) {
                    console.log('error',e);
                });

                $scope.setZoom = function(zoom){
                    $scope.map.zoom = zoom;
                };
                $scope.show_nav = true;
                $scope.changePage = function(){
                    $location.path("/exchangeNow");
                }


                $scope.sub = function() {
                    debugger;
                    $scope.amount_balance = $scope.balance[$scope.session_debit.off_curr - 1].value;
                    $scope.overload = $scope.session_debit.amount <= $scope.balance[$scope.session_debit.off_curr - 1].value ? false : true

                    if ($scope.form.amount.$valid && !$scope.overload) {
                        //SessionFactory.addData('session',$scope.session)
                        $http.put('/users/withdraw/'+ $scope.user.id + '/' + $scope.session_debit.off_curr, $scope.session_debit).
                        success(function(data) {
                            // $scope.transfer = transaction;
                            console.log(data);
                            $('#myModal').modal('show');
                            $('#myModal').on('hidden.bs.modal', function () {
                                $location.path("/");
                                $scope.$apply()
                            })
                        }).error(function(data) {
                            console.error("error in posting");
                        });
                    }
                    else{
                        angular.element('#main')[0].scrollTop=0;
                    }


                }

            }]);