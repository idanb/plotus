'use strict';
angular.module('Withdraw')
    .controller('WithdrawController',
        ['$scope','$rootScope','$cookies', '$location', '$http', '$sce','$window', 'SessionFactory',
            function ($scope, $rootScope, $cookies, $location, $http, $sce, $window, SessionFactory) {
                //if(typeof $cookies.getObject('globals') == 'undefined') $location.path('/login');
                $scope.user = SessionFactory.getData().currentUser.user;


                $(function() {

                    $("#slider").draggable({
                        axis: 'x',
                        containment: 'parent',
                        drag: function(event, ui) {
                            if (ui.position.left > 550) {
                                //$("#well").fadeOut();
                                alert("slider");
                            } else {
                                alert("sd");
                                // Apparently Safari isn't allowing partial opacity on text with background clip? Not sure.
                                // $("h2 span").css("opacity", 100 - (ui.position.left / 5))
                            }
                        },
                        stop: function(event, ui) {
                            if (ui.position.left < 551) {
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
                        if(curX > 550){
                            $location.path("/exchangeNow");
                            $scope.$apply();
                            $('#well').fadeOut();
                        }
                        el.style.webkitTransform = 'translateX(' + curX + 'px)';
                    }, false);

                    $('#slider')[0].addEventListener('touchend', function(event) {
                        this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
                        this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
                        this.style.webkitTransform = 'translateX(0px)';
                    }, false);

                });


                $scope.show_nav = true;
                $scope.changePage = function(){
                    $location.path("/exchangeNow");
                }

            }]);