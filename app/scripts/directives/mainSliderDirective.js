/**
 * Created by vilin on 1/26/2017.
 */
angular.module("app")
    .directive('mainSlider', ["$sce", function ($sce) {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: "../../../app/views/partials/mainSliderTemplate.html",
        link: function (scope, element) {
            // alert();
            
            scope.activeSlide = 0;
            
            scope.slidesContainer = angular.element(document.querySelectorAll('.sm-main-slider-container'));
            scope.slidesCount = angular.element(document.querySelectorAll('.sm-main-slider-slide')).length;
            console.log(scope.slidesCount);
            console.log(scope.slidesContainer);
            scope.howItWorksVideoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/EczVZby9xvc");
                // $scope.page2TrustedVideoUrl = $sce.trustAsResourceUrl($scope.page2TrustedVideoUrl + "?autoplay=1");
            
            scope.autoPlay = function (){
                scope.howItWorksVideoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/EczVZby9xvc?autoplay=1");
            };
            scope.next = function () {
                if (scope.activeSlide < scope.slidesCount-1) {
                    scope.activeSlide++;
                    transformTranslateX(scope.slidesContainer, scope.activeSlide * 99)
                }
                
            };
            scope.previous = function () {
                if (scope.activeSlide !== 0) {
                    scope.activeSlide--;
                    transformTranslateX(scope.slidesContainer, scope.activeSlide * 99)
                }
            };
            
            var transformTranslateX = function (element, length) {
                
                angular.element(element).css('transform', "translateX(-" + length + "vw)");
                
            }
        }
    }
}]);
