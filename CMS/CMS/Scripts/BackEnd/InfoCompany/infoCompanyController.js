
admin.controller("infoCompanyController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //VAR
    apiInfoCompany = "/API/InfoCompanyAPI";
    $scope.infoCompany = {};


    Init();

    function Init() {
        GetInfoCompany();
    }

    function GetInfoCompany() {
        $http.get(apiInfoCompany)
            .then(
                function success(response) {
                    $scope.infoCompany = angular.copy(response.data[0]);
                },
                function error(response) {
                    $window.location.href = "/Admin";
                }
            );
    }

    //Save
    $scope.Save = function () {
        if ($scope.infoCompany.id == null) {
            $http.post(apiInfoCompany, $scope.infoCompany)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.infoCompany = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm thông tin Công ty');
                            $window.location.href = '/Admin/InfoCompany';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm thông tin Công ty');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm thông tin Công ty');
                    }
                );
        }
        else {
            $http.put(apiInfoCompany + '/' + $scope.infoCompany.id, $scope.infoCompany)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu thông tin Công ty');
                        } else {
                            toastr.error('Thất bại', 'Lưu thông tin Công ty');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu thông tin Công ty');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.infoCompany.id == null) {
            $http.post(apiInfoCompany, $scope.infoCompany)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.infoCompany = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm thông tin Công ty');
                            $window.location.href = '/Admin';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm thông tin Công ty');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm thông tin Công ty');
                    }
                );
        }
        else {
            $http.put(apiInfoCompany + '/' + $scope.infoCompany.id, $scope.infoCompany)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu thông tin Công ty');
                            $window.location.href = '/Admin';
                        } else {
                            toastr.error('Thất bại', 'Lưu thông tin Công ty');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu thông tin Công ty');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin';
    }


}]);