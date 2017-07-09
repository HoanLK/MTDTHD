admin.controller("modifyProductController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', '$sce', function ($scope, $http, $window, $location, $filter, Alias, Url, $sce) {
    //---VAR---
    //Product
    apiProduct = "/API/ProductAPI";
    $scope.product = {};
    //Category Product
    $scope.categoryProducts = [];
    $scope.tempCategoryProducts = [];

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
    $scope.featureds = [
        {
            text: "Có",
            value: true
        },
        {
            text: "Không",
            value: false
        }
    ];
    $scope.categoryProducts = [];

    //Lấy idCategory từ Url
    $scope.product.id = Url.getParameterByName('idProduct');

    Init();

    function Init() {
        GetAllCategoryProduct();

        //Nếu sửa thì trả về giá trị của Category
        if ($scope.product.id !== null) {
            GetProduct($scope.product.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //GetAllCategoryProduct
    function GetAllCategoryProduct() {
        $http.get('/CategoryProduct/GetAll')
            .then(
            function success(response) {
                if (response.status == 200) {
                    $scope.tempCategoryProducts = angular.copy(response.data);

                    angular.forEach($scope.tempCategoryProducts, function (value, index) {
                        CategoryMultiLevel(value, 0);
                    });

                } else {

                }
            },
            function error(response) {

            }
            );
    }

    //Save
    $scope.Save = function () {
        if($scope.product.id == null){
            $http.post(apiProduct, $scope.product)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.product = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Product/Modify?idProduct=' + $scope.product.id;
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Bài viết');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Bài viết');
                    }
                );
        }
        else {
            $http.put(apiProduct + '/' + $scope.product.id, $scope.product)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Bài viết');
                        } else {
                            toastr.error('Thất bại', 'Lưu Bài viết');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Bài viết');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.product.id == null) {
            $http.post(apiProduct, $scope.product)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.product = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Product';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Bài viết');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Bài viết');
                    }
                );
        }
        else {
            $http.put(apiProduct + '/' + $scope.product.id, $scope.product)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Bài viết');
                            $window.location.href = '/Admin/Product';
                        } else {
                            toastr.error('Thất bại', 'Lưu Bài viết');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Bài viết');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.product.id == null) {
            $http.post(apiProduct, $scope.product)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.product = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Product/Modify';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Bài viết');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Bài viết');
                    }
                );
        }
        else {
            $http.put(apiProduct + '/' + $scope.product.id, $scope.product)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Bài viết');
                            $window.location.href = '/Admin/Product/Modify';
                        } else {
                            toastr.error('Thất bại', 'Lưu Bài viết');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Bài viết');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/Product';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.product = {
            featured: false,
            published: true,
            version: 1,
            robots: 'Index, Follow',
            colorBackgroundBanner: "#000000",
            colorTitleBanner: "#ffffff",
            colorTextBanner: "#ffffff",
            //timePublished: $filter('date')(new Date(), 'HH:mm:ss dd-MM-yyyy'),
            timePublished: new Date()
        };
    }

    //Get Product
    function GetProduct(id) {
        $http.get(apiProduct + '/' + $scope.product.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.product = angular.copy(response.data);
                    //$scope.product.timePublished = $filter('date')($scope.product.timePublished, 'HH:mm:ss dd-MM-yyyy');
                    $scope.product.timePublished = new Date($scope.product.timePublished);
                }
                else {
                    $window.location.href = '/Admin/Product';
                }
            }, function error(response) {
                $window.location.href = '/Admin/Product';
            });
    }

    //Gen Category Multi Level
    function CategoryMultiLevel(category, count) {
        if ($scope.categoryProducts.indexOf(category) == -1) {
            for (i = 1; i <= count; i++) {
                category.title = "– " + category.title;
            }
            count++;
            $scope.categoryProducts.push(category);
            angular.forEach($scope.tempCategoryProducts, function (value, index) {
                if (value.idParentCategory == category.id) {
                    CategoryMultiLevel(value, count);
                }
            });
        }
    }

    //Chọn hình ảnh
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }
    $scope.ChooseImage1 = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.hinhanh1 = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }
    $scope.ChooseImage2 = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.hinhanh2 = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }
    $scope.ChooseImage3 = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.hinhanh3 = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }
    $scope.ChooseImage4 = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.hinhanh4 = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }
    $scope.ChooseImage5 = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.hinhanh5 = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }
    $scope.ChooseImage6 = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.hinhanh6 = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Chọn hình ảnh banner
    $scope.ChooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.imageBanner = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Generate Alias
    $scope.GenAlias = function () {
        $scope.product.alias = angular.copy(Alias.genAlias($scope.product.title));
    };

    
}]);