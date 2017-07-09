admin.controller("modifyCategoryPostController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //VAR
    apiCategoryPost = "/API/CategoryPostAPI";
    $scope.categoryPosts = [];
    $scope.tempCategoryPosts = [];
    $scope.categoryPost = {};
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
    $scope.categoryPost.id = Url.getParameterByName('idCategoryPost');

    Init();

    function Init(){
        GetAllCategoryPost();

        //Nếu sửa thì trả về giá trị của Category
        if ($scope.categoryPost.id !== null) {
            GetCategoryPost($scope.categoryPost.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //Save
    $scope.Save = function () {
        if($scope.categoryPost.id == null){
            $http.post(apiCategoryPost, $scope.categoryPost)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryPost = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Bài viết');
                            $window.location.href = '/Admin/CategoryPost/Modify?idCategoryPost=' + $scope.categoryPost.id;
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                    }
                );
        }
        else {
            $http.put(apiCategoryPost + '/' + $scope.categoryPost.id, $scope.categoryPost)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Bài viết');
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.categoryPost.id == null) {
            $http.post(apiCategoryPost, $scope.categoryPost)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryPost = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Bài viết');
                            $window.location.href = '/Admin/CategoryPost';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                    }
                );
        }
        else {
            $http.put(apiCategoryPost + '/' + $scope.categoryPost.id, $scope.categoryPost)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Bài viết');
                            $window.location.href = '/Admin/CategoryPost';
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.categoryPost.id == null) {
            $http.post(apiCategoryPost, $scope.categoryPost)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.categoryPost = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Danh mục Bài viết');
                            $window.location.href = '/Admin/CategoryPost/Modify';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                    }
                );
        }
        else {
            $http.put(apiCategoryPost + '/' + $scope.categoryPost.id, $scope.categoryPost)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Danh mục Bài viết');
                            $window.location.href = '/Admin/CategoryPost/Modify';
                        } else {
                            toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/CategoryPost';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.categoryPost = {
            idParentCategory: 1,
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

    //GetAllCategoryPost
    function GetAllCategoryPost() {
        $http.get('/CategoryPost/GetAll')
            .then(
            function success(response) {
                if (response.status == 200) {
                    $scope.tempCategoryPosts = angular.copy(response.data);

                    angular.forEach($scope.tempCategoryPosts, function (value, index) {
                        CategoryMultiLevel(value, 0);
                    });

                } else {

                }
            },
            function error(response) {

            }
            );
    }

    //Get Category Post
    function GetCategoryPost(id) {
        $http.get(apiCategoryPost + '/' + $scope.categoryPost.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.categoryPost = angular.copy(response.data);
                    //$scope.categoryPost.timePublished = $filter('date')($scope.categoryPost.timePublished, 'HH:mm:ss dd-MM-yyyy');
                    $scope.categoryPost.timePublished = new Date($scope.categoryPost.timePublished);
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
            $scope.categoryPosts.push(category);
        } else {
            if ($scope.categoryPosts.indexOf(category) == -1) {
                count++;
                for (i = 1; i <= count; i++) {
                    category.title = "– " + category.title;
                }
                $scope.categoryPosts.push(category);
                angular.forEach($scope.tempCategoryPosts, function (value, index) {
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
            $scope.categoryPost.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Chọn hình ảnh banner
    $scope.ChooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.categoryPost.imageBanner = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Generate Alias
    $scope.GenAlias = function () {
        $scope.categoryPost.alias = angular.copy(Alias.genAlias($scope.categoryPost.title));
    };

    
}]);