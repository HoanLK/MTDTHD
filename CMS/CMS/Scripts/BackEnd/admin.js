var admin = angular.module('admin', ['ngSanitize', 'ngLoadingSpinner', 'fcsa-number', 'dx', 'ngCkeditor']);
admin.config(['$compileProvider', function($compileProvider){
$compileProvider.debugInfoEnabled(false);
}]);
admin.config(function ($httpProvider) {
    $httpProvider.useApplyAsync(1000); //true
});
admin.directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });
            function updateModel() {
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});

admin.filter('trustUrl', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
});