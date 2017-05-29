'use strict';
angular.module('Withdraw')
    .controller('WithdrawController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory', '$timeout',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory, $timeout) {
                //if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = SessionFactory.getData().currentUser.user;


                $(function() {

                    $(".slider").draggable({
                        axis: 'x',
                        containment: 'parent',
                        drag: function(event, ui) {
                            if (ui.position.left > 250) {
                                //$("#well").fadeOut();
                            } else {
                                // Apparently Safari isn't allowing partial opacity on text with background clip? Not sure.
                                // $("h2 span").css("opacity", 100 - (ui.position.left / 5))
                            }
                        },
                        stop: function(event, ui) {
                            if (ui.position.left < 251) {
                                alert("slider");
                                $(this).animate({
                                    left: 0
                                })
                            }
                        }
                    });

                    // The following credit: http://www.evanblack.com/blog/touch-slide-to-unlock/

                    $('#slider')[0].addEventListener('touchmove', function(event) {
                        event.preventDefault();
                        var el = event.target;
                        var touch = event.touches[0];
                        var curX = touch.pageX - this.offsetLeft - 73;
                        if(curX <= 0) return;
                        if(curX > 250){
                            $location.path("/withdrawCash");
                            $scope.$apply();
                            //$('#well').fadeOut();
                        }
                        el.style.webkitTransform = 'translateX(' + curX + 'px)';
                    }, false);

                    $('#slider')[0].addEventListener('touchend', function(event) {
                        this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
                        this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
                        this.style.webkitTransform = 'translateX(0px)';
                    }, false);

                    $('#slider2')[0].addEventListener('touchmove', function(event) {
                        event.preventDefault();
                        var el = event.target;
                        var touch = event.touches[0];
                        var curX = touch.pageX - this.offsetLeft - 73;
                        if(curX <= 0) return;
                        if(curX > 250){
                            $('#myModal').modal('show');
                            // $scope.$apply();
                            //$('#well').fadeOut();
                        }
                        el.style.webkitTransform = 'translateX(' + curX + 'px)';
                    }, false);

                    $('#slider2')[0].addEventListener('touchend', function(event) {
                        this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
                        this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
                        this.style.webkitTransform = 'translateX(0px)';
                    }, false);

                });
                $scope.loading = true;

                $scope.show_nav = true;

                $scope.sendDebitRequest = function(){
                    $('#myModal').modal('hide');
                    $rootScope.loading = true;
                    $rootScope.loading_text = "please wait...";

                    $timeout(function(){ $http.get('users/debit-request/' + SessionFactory.getData().currentUser.user.id)
                        .then(function (response) {
                            $('.modal-backdrop.in').css('display','none');
                            $rootScope.loading = false;
                            var url = response.data.is_valid ? "/requestDebit" : "/requestDebitDenied";
                            $location.path(url);
                        }).catch(function (e) {
                            console.log('error',e);
                        }); },2000);


                }

            }]);