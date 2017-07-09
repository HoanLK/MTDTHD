admin.controller("modifyCategoryProductController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //VAR
    apiCategoryProduct = "/API/CategoryProductAPI";
    $scope.categoryProducts = [];
    $scope.tempCategoryProducts = [];
    $scope.categoryProduct = {};
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
    $scope.isServices = [
        {
            text: "Có",
            value: true
        },
        {
            text: "Không",
            value: false
        }
    ];

    //Lấy idCategory từ Url
    $scope.categoryProduct.id = Url.getParameterByName('idCategoryProduct');

    Init();

    function Init(){
        GetAllCategoryProduct();

        //Nếu sửa thì trả về giá trị của Category
        if ($scope.categoryProduct.id !== null) {
            GetCategoryProduct($scope.categoryProduct.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //Save
    $scope.Save = function () {
        if($scope.categoryProduct.id == null){
            $http.post(apiCategoryProduct, $scope.categoryProduct)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryProduct = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Sản phẩm');
                            $window.location.href = '/Admin/CategoryProduct/Modify?idCategoryProduct=' + $scope.categoryProduct.id;
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Sản phẩm');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Sản phẩm');
                    }
                );
        }
        else {
            $http.put(apiCategoryProduct + '/' + $scope.categoryProduct.id, $scope.categoryProduct)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Sản phẩm');
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Sản phẩm');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Sản phẩm');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.categoryProduct.id == null) {
            $http.post(apiCategoryProduct, $scope.categoryProduct)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryProduct = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Sản phẩm');
                            $window.location.href = '/Admin/CategoryProduct';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Sản phẩm');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Sản phẩm');
                    }
                );
        }
        else {
            $http.put(apiCategoryProduct + '/' + $scope.categoryProduct.id, $scope.categoryProduct)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Sản phẩm');
                            $window.location.href = '/Admin/CategoryProduct';
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Sản phẩm');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Sản phẩm');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.categoryProduct.id == null) {
            $http.post(apiCategoryProduct, $scope.categoryProduct)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryProduct = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Sản phẩm');
                            $window.location.href = '/Admin/CategoryProduct/Modify';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Sản phẩm');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Sản phẩm');
                    }
                );
        }
        else {
            $http.put(apiCategoryProduct + '/' + $scope.categoryProduct.id, $scope.categoryProduct)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Sản phẩm');
                            $window.location.href = '/Admin/CategoryProduct/Modify';
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Sản phẩm');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Sản phẩm');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/CategoryProduct';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.categoryProduct = {
            //idParentCategory: 1,
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

    //Get Category Product
    function GetCategoryProduct(id) {
        $http.get(apiCategoryProduct + '/' + $scope.categoryProduct.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.categoryProduct = angular.copy(response.data);
                    //$scope.categoryProduct.timePublished = $filter('date')($scope.categoryProduct.timePublished, 'HH:mm:ss dd-MM-yyyy');
                    $scope.categoryProduct.timePublished = new Date($scope.categoryProduct.timePublished);
                }
                else {
                    $window.location.href = '/Admin/CategoryProduct';
                }
            }, function error(response) {
                $window.location.href = '/Admin/CategoryProduct';
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
            $scope.categoryProduct.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Chọn hình ảnh banner
    $scope.ChooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.categoryProduct.imageBanner = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Generate Alias
    $scope.GenAlias = function () {
        $scope.categoryProduct.alias = angular.copy(Alias.genAlias($scope.categoryProduct.title));
    };

    
}]);