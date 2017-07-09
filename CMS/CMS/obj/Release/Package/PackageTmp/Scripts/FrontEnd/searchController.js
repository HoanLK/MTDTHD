front.controller("searchController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', '$cookieStore', function ($scope, $http, $window, $location, $filter, $sce, $cookieStore) {
    //VAR
    $scope.posts = [];

    $scope.searchText = $cookieStore.get('search');

    Init();

    function Init() {
        Get();
    }

    function Get() {
        $http.get('/Search/SearchByText?search=' + $scope.searchText)
            .then(
                function success(response) {
                    if (response.status == 200) {
                        angular.forEach(response.data, function (value, index) {
                            value.timePublished = new Date(parseInt(value.timePublished.substr(6)));
                            if (value.description != null) {
                                value.description = (value.description.length > 130) ? CutString(value.description, 127) : value.description;
                            }
                        });
                        $scope.posts = angular.copy(response.data);
                    }
                },
                function error(response) {

                }
            );
    }

    //FUNCTIONe
    function CutString(input, limit) {
        var output = angular.copy(input);
        var index = angular.copy(limit - 1);

        while ((output[index] != ' ') && index < (output.length - 1)) {
            index++;
        }

        return (output.substring(0, index) + "...");
    }


}]);