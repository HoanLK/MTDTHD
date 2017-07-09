front.controller("newsController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.posts = [];
    $scope.categoryPost = {};


    Init();

    function Init() {
        Get();
    }

    function Get() {
        $http.get('/News/GetPosts')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        angular.forEach(response.data.Posts, function (value, index) {
                            value.timePublished = new Date(parseInt(value.timePublished.substr(6)));
                            if (value.description != null) {
                                value.description = (value.description.length > 130) ? CutString(value.description, 127) : value.description;
                            }
                        });
                        $scope.posts = angular.copy(response.data.Posts);
                        $scope.categoryPost = angular.copy(response.data.CategoryPost);
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