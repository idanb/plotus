angular.module('Helpers', []).directive("progressBarBalance", function() {
    return {
        restrict : "E",
        scope: {
            stage: '='
        },
        templateUrl : "/directives/progress-bar-balance/progress-bar-balance.html",
        controller: function($scope, $element, $attrs, $location) {
            $scope.circle1_link = "/AddToBalance";
            $scope.circle2_link = "/AddToBalanceConfirm";
            $scope.circle3_link = "/AddToBalanceFinal";

            $scope.circle1 = 'btn-primary';
            $scope.circle2 = $scope.stage > 1 ? 'btn-primary' :'btn-default';
            $scope.circle3 = $scope.stage > 2 ? 'btn-primary' :'btn-default';

            $scope.changePage = function(link){
                $location.path(link);
            }
        }
    };
});