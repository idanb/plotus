'use strict';
angular.module('Withdraw')
    .controller('WithdrawCashController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory', 'uiGmapGoogleMapApi',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
               // if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.map = { center: { latitude: 32.073550, longitude: 34.822407 }, zoom: 14,
                    events: {
                        click: function(mapModel, eventName, originalEventArgs) {
                            console.log("user defined event: " + eventName, mapModel, originalEventArgs);
                            originalEventArgs.show = !originalEventArgs.show;
                            $scope.activeModel = originalEventArgs;
                            $scope.session_withdraw.atm_id = mapModel.key;
                            //var e = originalEventArgs[0];
                            //_scope.$apply();
                        }
                    }};
                $scope.session_withdraw = {};

                $scope.show1 = true;

                $scope.user = SessionFactory.getData().currentUser.user;
                $scope.currency = SessionFactory.getData().currency;
                $scope.balance = SessionFactory.getData().balance;

                $scope.session_withdraw.email_address = $scope.user.email_address;

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


                $scope.setAtmLocation = function(atm){
                    console.log(atm);
                }

                $scope.setZoom = function(zoom){
                    $scope.map.zoom = zoom;
                };
                $scope.show_nav = true;
                $scope.changePage = function(){
                    $location.path("/exchangeNow");
                }


                $('[data-toggle="tooltip"]').tooltip();

                $scope.sub = function() {
                    $scope.amount_balance = $scope.balance[$scope.session_withdraw.off_curr - 1].value;
                    $scope.overload = $scope.session_withdraw.amount <= $scope.balance[$scope.session_withdraw.off_curr - 1].value ? false : true

                    if ($scope.form.amount.$valid && !$scope.overload) {
                        //SessionFactory.addData('session',$scope.session)
                        $http.put('/users/withdraw/'+ $scope.user.id + '/' + $scope.session_withdraw.off_curr, $scope.session_withdraw).
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