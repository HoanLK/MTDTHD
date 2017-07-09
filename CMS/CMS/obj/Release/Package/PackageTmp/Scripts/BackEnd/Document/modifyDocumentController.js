admin.controller("modifyDocumentController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //---VAR---
    //Document
    apiDocument = "/API/DocumentAPI";
    $scope.document = {};
    //Category Document
    $scope.categoryDocuments = [];
    $scope.tempCategoryDocuments = [];

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

    $scope.categoryDocuments = [];

    //Lấy idCategory từ Url
    $scope.document.id = Url.getParameterByName('idDocument');

    Init();

    function Init() {
        GetAllCategoryDocument();

        //Nếu sửa thì trả về giá trị của Category
        if ($scope.document.id !== null) {
            GetDocument($scope.document.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //GetAllCategoryDocument
    function GetAllCategoryDocument() {
        $http.get('/CategoryDocument/GetAll')
            .then(
            function success(response) {
                if (response.status == 200) {
                    $scope.tempCategoryDocuments = angular.copy(response.data);

                    angular.forEach($scope.tempCategoryDocuments, function (value, index) {
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
        if($scope.document.id == null){
            $http.post(apiDocument, $scope.document)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.document = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Document/Modify?idDocument=' + $scope.document.id;
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
            $http.put(apiDocument + '/' + $scope.document.id, $scope.document)
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
        if ($scope.document.id == null) {
            $http.post(apiDocument, $scope.document)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.document = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Document';
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
            $http.put(apiDocument + '/' + $scope.document.id, $scope.document)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Bài viết');
                            $window.location.href = '/Admin/Document';
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
        if ($scope.document.id == null) {
            $http.post(apiDocument, $scope.document)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.document = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Document/Modify';
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
            $http.put(apiDocument + '/' + $scope.document.id, $scope.document)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Bài viết');
                            $window.location.href = '/Admin/Document/Modify';
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
        $window.location.href = '/Admin/Document';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.document = {
            idCategory: 1,
            published: true,
        };
    }

    //Get Document
    function GetDocument(id) {
        $http.get(apiDocument + '/' + $scope.document.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.document = angular.copy(response.data);
                    //$scope.document.timePublished = $filter('date')($scope.document.timePublished, 'HH:mm:ss dd-MM-yyyy');
                    $scope.document.timePublished = new Date($scope.document.timePublished);
                }
                else {
                    $window.location.href = '/Admin/Document';
                }
            }, function error(response) {
                $window.location.href = '/Admin/Document';
            });
    }

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
    $scope.ChooseDocument = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.document.url = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Chọn hình ảnh banner
    $scope.ChooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.document.imageBanner = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Generate Alias
    $scope.GenAlias = function () {
        $scope.document.alias = angular.copy(Alias.genAlias($scope.document.name));
    };

    
}]);