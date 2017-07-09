front.controller("serviceController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.posts = [];
    $scope.idCategoryPost = angular.element('#idCategoryPost').val();


    Init();

    function Init() {
        GetPosts();
    }

    function GetPosts() {
        $http.get('/Service/GetPosts/' + $scope.idCategoryPost)
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