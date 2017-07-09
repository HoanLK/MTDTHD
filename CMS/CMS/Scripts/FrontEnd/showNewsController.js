front.controller("showNewsController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.post = {};
    $scope.categoryPost = {};
    $scope.lastPosts = [];
    $scope.idPost = angular.element('#idPost').val();

    Init();

    function Init() {
        GetPost();
    }

    function GetPost() {
        $http.get('/News/GetPost/' + $scope.idPost)
            .then(
                function success(response) {
                    if (response.status == 200) {
                        angular.forEach(response.data.LastPosts, function (value, index) {
                            value.timePublished = new Date(parseInt(value.timePublished.substr(6)));
                            if (value.description != null) {
                                value.description = (value.description.length > 130) ? CutString(value.description, 127) : value.description;
                            }
                        });
                        $scope.lastPosts = angular.copy(response.data.LastPosts);
                        $scope.categoryPost = angular.copy(response.data.CategoryPost);
                        $scope.post = angular.copy(response.data.Post);
                        $scope.post.timePublished = new Date(parseInt($scope.post.timePublished.substr(6)));
                        console.log($scope.lastPosts);
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