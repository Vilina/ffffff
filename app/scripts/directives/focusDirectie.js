angular.module("app")
    .directive('focusElement', function () {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.focusElement, function(value) {
                    if(value === true) {
                        element[0].focus();
                        element[0].select();
                    }
                });
            }
        };
    });