front.controller("commitmentController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.post = {};
    $scope.categoryPost = {};


    Init();

    function Init() {
        GetInfoCompany();
    }

    function GetInfoCompany() {
        $http.get('/Commitment/GetPost')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.post = angular.copy(response.data.Post);
                        $scope.categoryPost = angular.copy(response.data.CategoryPost);
                    }
                },
                function error(response) {

                }
            );
    }


}]);