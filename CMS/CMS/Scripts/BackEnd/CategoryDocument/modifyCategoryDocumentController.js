admin.controller("modifyCategoryDocumentController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //VAR
    apiCategoryDocument = "/API/CategoryDocumentAPI";
    $scope.categoryDocuments = [];
    $scope.tempCategoryDocuments = [];
    $scope.categoryDocument = {};
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
    $scope.categoryDocument.id = Url.getParameterByName('idCategoryDocument');

    Init();

    function Init(){
        //Nếu sửa thì trả về giá trị của Category
        if ($scope.categoryDocument.id !== null) {
            GetCategoryDocument($scope.categoryDocument.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //Save
    $scope.Save = function () {
        if($scope.categoryDocument.id == null){
            $http.post(apiCategoryDocument, $scope.categoryDocument)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryDocument = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Tài liệu');
                            $window.location.href = '/Admin/CategoryDocument/Modify?idCategoryDocument=' + $scope.categoryDocument.id;
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Tài liệu');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Tài liệu');
                    }
                );
        }
        else {
            $http.put(apiCategoryDocument + '/' + $scope.categoryDocument.id, $scope.categoryDocument)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Tài liệu');
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Tài liệu');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Tài liệu');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.categoryDocument.id == null) {
            $http.post(apiCategoryDocument, $scope.categoryDocument)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryDocument = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Tài liệu');
                            $window.location.href = '/Admin/CategoryDocument';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Tài liệu');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Tài liệu');
                    }
                );
        }
        else {
            $http.put(apiCategoryDocument + '/' + $scope.categoryDocument.id, $scope.categoryDocument)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Tài liệu');
                            $window.location.href = '/Admin/CategoryDocument';
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Tài liệu');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Tài liệu');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.categoryDocument.id == null) {
            $http.post(apiCategoryDocument, $scope.categoryDocument)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryDocument = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Tài liệu');
                            $window.location.href = '/Admin/CategoryDocument/Modify';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Tài liệu');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Tài liệu');
                    }
                );
        }
        else {
            $http.put(apiCategoryDocument + '/' + $scope.categoryDocument.id, $scope.categoryDocument)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Tài liệu');
                            $window.location.href = '/Admin/CategoryDocument/Modify';
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Tài liệu');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Tài liệu');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/CategoryDocument';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.categoryDocument = {
            published: true,
            robots: 'Index, Follow',
            colorBackgroundBanner: "#000000",
            colorTitleBanner: "#ffffff",
            colorTextBanner: "#ffffff",
            //timePublished: $filter('date')(new Date(), 'HH:mm:ss dd-MM-yyyy'),
            timePublished: new Date()
        };
    }

    //Get Category Document
    function GetCategoryDocument(id) {
        $http.get(apiCategoryDocument + '/' + $scope.categoryDocument.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.categoryDocument = angular.copy(response.data);
                    //$scope.categoryDocument.timePublished = $filter('date')($scope.categoryDocument.timePublished, 'HH:mm:ss dd-MM-yyyy');
                    $scope.categoryDocument.timePublished = new Date($scope.categoryDocument.timePublished);
                }
                else {
                    $window.location.href = '/admin/categorypost';
                }
            }, function error(response) {
                $window.location.href = '/admin/categorypost';
            });
    }

    //Gen Category Multi Level
    function CategoryMultiLevel(category, count) {
        if (category.idParentCategory == null || category.idParentCategory == "") {
            $scope.categoryDocuments.push(category);
        } else {
            if ($scope.categoryDocuments.indexOf(category) == -1) {
                count++;
                for (i = 1; i <= count; i++) {
                    category.title = "– " + category.title;
                }
                $scope.categoryDocuments.push(category);
                angular.forEach($scope.tempCategoryDocuments, function (value, index) {
                    if (value.idParentCategory == category.id) {
                        CategoryMultiLevel(value, count);
                    }
                });
            }
        }
    }

    //Chọn hình ảnh
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.categoryDocument.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Chọn hình ảnh banner
    $scope.ChooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.categoryDocument.imageBanner = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Generate Alias
    $scope.GenAlias = function () {
        $scope.categoryDocument.alias = angular.copy(Alias.genAlias($scope.categoryDocument.title));
    };

    
}]);