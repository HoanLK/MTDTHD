
admin.controller("modifyBannerController", ['$scope', '$http', '$window', '$location', '$filter', 'Url', function ($scope, $http, $window, $location, $filter, Url) {
    //VAR
    apiBanner = "/API/BannerAPI";
    $scope.banner = {};
    $scope.statuses = [
        {
            text: "Xuất bản",
            value: true
        },
        {
            text: "Không xuất bản",
            value: false
        }
    ];

    //Lấy idCategory từ Url
    $scope.banner.id = Url.getParameterByName('idBanner');

    Init();

    function Init() {
        //Nếu sửa thì trả về giá trị
        if ($scope.banner.id !== null) {
            GetBanner($scope.banner.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //Save
    $scope.Save = function () {
        if($scope.banner.id == null){
            $http.post(apiBanner, $scope.banner)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.banner = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm banner');
                            $window.location.href = '/Admin/Banner/Modify?idBanner=' + $scope.banner.id;
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm banner');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm banner');
                    }
                );
        }
        else {
            $http.put(apiBanner + '/' + $scope.banner.id, $scope.banner)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu banner');
                        } else {
                            toastr.error('Thất bại', 'Lưu banner');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu banner');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.banner.id == null) {
            $http.post(apiBanner, $scope.banner)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.banner = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm banner');
                            $window.location.href = '/Admin/Banner';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm banner');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm banner');
                    }
                );
        }
        else {
            $http.put(apiBanner + '/' + $scope.banner.id, $scope.banner)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu banner');
                            $window.location.href = '/Admin/Banner';
                        } else {
                            toastr.error('Thất bại', 'Lưu banner');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu banner');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.banner.id == null) {
            $http.post(apiBanner, $scope.banner)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.banner = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm banner');
                            $window.location.href = '/Admin/Banner/Modify';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm banner');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm banner');
                    }
                );
        }
        else {
            $http.put(apiBanner + '/' + $scope.banner.id, $scope.banner)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu banner');
                            $window.location.href = '/Admin/Banner/Modify';
                        } else {
                            toastr.error('Thất bại', 'Lưu banner');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu banner');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/Banner';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.banner = {
            published: true
        };
    }

    //Get Banner
    function GetBanner(id) {
        $http.get(apiBanner + '/' + $scope.banner.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.banner = angular.copy(response.data);
                }
                else {
                    $window.location.href = '/Admin/Banner';
                }
            }, function error(response) {
                $window.location.href = '/Admin/Banner';
            });
    }

    //Chọn hình ảnh banner
    $scope.ChooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.banner.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    
}]);