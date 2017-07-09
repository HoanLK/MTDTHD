front.controller("mainmenuController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', '$cookieStore', function ($scope, $http, $window, $location, $filter, $sce, $cookieStore) {
    //VAR
    $scope.services = {};

    $scope.itemMenus = [];
    $scope.menu = {};

    Init();

    function Init() {
        GetSerVices();
    }

    function GetSerVices() {
        $http.get('/Admin/Menu/GetItemByMenu/1')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.itemMenus = angular.copy(response.data);
                    }
                },
                function error(response) {
                    console.log("Không lấy được Main menu");
                }
            );
    }

    $scope.Search = function () {

        $cookieStore.put('search', $scope.searchText);

        $window.location.href = '/tim-kiem';
    };

    //---FUNCTION---


}]);