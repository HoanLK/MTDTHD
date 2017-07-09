admin.controller("modifyPostController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //---VAR---
    //Post
    apiPost = "/API/PostAPI";
    $scope.post = {};
    //Category Post
    $scope.categoryPosts = [];
    $scope.tempCategoryPosts = [];

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
    $scope.categoryPosts = [];

    //Lấy idCategory từ Url
    $scope.post.id = Url.getParameterByName('idPost');

    Init();

    function Init() {
        GetAllCategoryPost();

        //Nếu sửa thì trả về giá trị của Category
        if ($scope.post.id !== null) {
            GetPost($scope.post.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
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

    //Save
    $scope.Save = function () {
        if($scope.post.id == null){
            $http.post(apiPost, $scope.post)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.post = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Post/Modify?idPost=' + $scope.post.id;
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
            $http.put(apiPost + '/' + $scope.post.id, $scope.post)
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
        if ($scope.post.id == null) {
            $http.post(apiPost, $scope.post)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.post = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Post';
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
            $http.put(apiPost + '/' + $scope.post.id, $scope.post)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Bài viết');
                            $window.location.href = '/Admin/Post';
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
        if ($scope.post.id == null) {
            $http.post(apiPost, $scope.post)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.post = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm Bài viết');
                            $window.location.href = '/Admin/Post/Modify';
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
            $http.put(apiPost + '/' + $scope.post.id, $scope.post)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu Bài viết');
                            $window.location.href = '/Admin/Post/Modify';
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
        $window.location.href = '/Admin/Post';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.post = {
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

    //Get Post
    function GetPost(id) {
        $http.get(apiPost + '/' + $scope.post.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.post = angular.copy(response.data);
                    //$scope.post.timePublished = $filter('date')($scope.post.timePublished, 'HH:mm:ss dd-MM-yyyy');
                    $scope.post.timePublished = new Date($scope.post.timePublished);
                }
                else {
                    $window.location.href = '/Admin/Post';
                }
            }, function error(response) {
                $window.location.href = '/Admin/Post';
            });
    }

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
            $scope.post.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Chọn hình ảnh banner
    $scope.ChooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.post.imageBanner = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Generate Alias
    $scope.GenAlias = function () {
        $scope.post.alias = angular.copy(Alias.genAlias($scope.post.title));
    };

    
}]);