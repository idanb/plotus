angular.module('Helpers', []).directive("progressBar", function() {
    return {
        restrict : "E",
        scope: {
            stage: '='
        },
        templateUrl : "/directives/progress-bar/progress-bar.html",
        controller: function($scope, $element, $attrs, $location) {
            $scope.circle1 = 'btn-primary';
            $scope.circle2 = $scope.stage > 1 ? 'btn-primary' :'btn-default';
            $scope.circle3 = $scope.stage > 2 ? 'btn-primary' :'btn-default';
        }
    };
});