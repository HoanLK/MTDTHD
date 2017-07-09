
front.controller("footerController", ['$scope', '$http', '$window', '$location', '$filter', function ($scope, $http, $window, $location, $filter) {
    //VAR
    $scope.infoCompany = {};


    Init();

    function Init() {
        GetInfoCompany();
    }

    function GetInfoCompany() {
        $http.get('/API/InfoCompanyAPI')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.infoCompany = angular.copy(response.data[0]);
                    }
                },
                function error(response) {

                }
            );
    }


}]);