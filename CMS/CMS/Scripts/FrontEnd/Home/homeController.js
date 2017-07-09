front.controller("homeController", ['$scope', '$http', '$window', '$location', '$filter', function ($scope, $http, $window, $location, $filter) {
    console.log("Hello");

    //VAR
    $scope.banners = [];
    $scope.productDmCLines = [];
    $scope.infoCompany = {};
    $scope.featuredPosts = [];
    $scope.customers = [];


    Init();

    function Init() {
        GetAllBanner();
        GetProductDmCLine();
        GetInfoCompany();
        GetPosts();
        GetCustomers();
    }

    function GetAllBanner() {
        $http.get('/API/BannerAPI')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.banners = angular.copy(response.data);
                    }
                },
                function error(response) {
                    
                }
            );
    }

    function GetProductDmCLine() {
        $http.get('/Home/GetProductDmCLine')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.productDmCLines = angular.copy(response.data);
                        //angular.forEach($scope.services, function (value, index) {
                        //    if (value.description != null) {
                        //        value.description = (value.description.length > 170) ? CutString(value.description, 172) : value.description;
                        //    }
                            
                        //});
                    }
                },
                function error(response) {

                }
            );
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

    function GetPosts() {
        $http.get('/Home/GetPosts')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        angular.forEach(response.data, function (value, index) {
                            value.timePublished = new Date(parseInt(value.timePublished.substr(6)));
                            if (value.description != null) {
                                value.description = (value.description.length > 130) ? CutString(value.description, 127) : value.description;
                            }
                        });
                        $scope.featuredPosts = angular.copy(response.data);
                    }
                },
                function error(response) {

                }
            );
    }

    function GetCustomers() {
        $http.get('/Home/GetCustomers')
            .then(
            function success(response) {
                if (response.status == 200) {
                    angular.forEach(response.data, function (value, index) {
                        value.timePublished = new Date(parseInt(value.timePublished.substr(6)));
                        if (value.description != null) {
                            value.description = (value.description.length > 130) ? CutString(value.description, 127) : value.description;
                        }
                    });
                    $scope.customers = angular.copy(response.data);
                }
            },
            function error(response) {

            }
            );
    }

    //FUNCTION
    function CutString(input, limit) {
        var output = angular.copy(input);
        var index = angular.copy(limit - 1);

        while ((output[index] != ' ') && index < (output.length - 1)) {
            index++;
        }

        return (output.substring(0, index) +  "...");
    }

}]);