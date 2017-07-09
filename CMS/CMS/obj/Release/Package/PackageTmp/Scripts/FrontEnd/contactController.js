front.controller("contactController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.infoCompany = {};
    $scope.categoryPost = {};


    Init();

    function Init() {
        GetInfoCompany();
    }

    function GetInfoCompany() {
        $http.get('/Contact/GetPost')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.infoCompany = angular.copy(response.data.Info);
                        $scope.categoryPost = angular.copy(response.data.CategoryPost);
                    }
                },
                function error(response) {

                }
            );
    }


}]);