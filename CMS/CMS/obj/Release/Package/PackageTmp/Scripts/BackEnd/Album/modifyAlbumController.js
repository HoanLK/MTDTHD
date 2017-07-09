admin.controller("modifyAlbumController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //---VAR---
    //Album
    apiAlbum = "/API/AlbumAPI";
    $scope.album = {};
    //Items
    $scope.items = [];
    $scope.item = {};
    apiItemAlbum = "/API/ItemAlbumAPI";

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

    //Lấy idAlbum từ Url
    $scope.album.id = Url.getParameterByName('idAlbum');

    //---POPUP---
    //Item
    $scope.modifyItem = false;
    $scope.titlePopupModifyItem = "Thêm hình ảnh";
    $scope.popupModifyItem = {
        maxWidth: 600,
        height: "auto",
        contentTemplate: "templateModifyItem",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyItem",
            visible: "modifyItem",
        }
    };
    $scope.deleteItem = false;
    $scope.titleDeleteItem = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteItem = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteItem",
        showTitle: false,
        bindingOptions: {
            visible: "deleteItem",
        }
    };

    //---CONTROL CONFIG---
    //Item
    $scope.controlItem = {
        //TextBox
        title: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "item.title"
            }
        },
        //SelectBox
        //TextArea
        description: {
            height: 150,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "item.description",
            }
        },
        //Button
    }

    Init();

    function Init() {
        //Nếu sửa thì trả về giá trị của Album
        if ($scope.album.id !== null) {
            GetAlbum($scope.album.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //---Albuml---
    //Save
    $scope.Save = function () {
        if ($scope.album.id == null) {
            //Lưu album
            $http.post(apiAlbum, $scope.album)
                .then(
                    function success(response) {
                        $scope.album = angular.copy(response.data);

                        //Lưu items
                        angular.forEach($scope.items, function (value, index) {
                            value.idAlbum = angular.copy($scope.album.id);
                            $http.post(apiItemAlbum, value)
                                .then(function success(response) {
                                    value = angular.copy(response.data);
                                }, function error(response) {});
                        });

                        toastr.success('Thành công', 'Thêm Album');
                        $window.location.href = '/Admin/Album/Modify?idAlbum=' + $scope.album.id;
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Album');
                    }
                );
        }
        else {
            $http.put(apiAlbum + '/' + $scope.album.id, $scope.album)
                .then(
                function success(response) {
                        //Delete Old Items
                        $http.get('/Admin/Album/DeleteItemByAlbum/' + $scope.album.id)
                            .then(function success(response) {
                                if (response.data == "1") {
                                    angular.forEach($scope.items, function (value, index) {
                                        value.idAlbum = angular.copy($scope.album.id);
                                        $http.post(apiItemAlbum, value)
                                            .then(function success(response) {
                                                value = angular.copy(response.data);
                                            }, function error(response) { });
                                    });
                                } else {
                                    toastr.error('Thất bại', 'Lưu ảnh');
                                }
                            }, function error(response) {
                                toastr.error('Thất bại', 'Lưu ảnh');
                            });

                        toastr.success('Thành công', 'Lưu Album');
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Lưu Album');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.album.id == null) {
            $http.post(apiAlbum, $scope.album)
                .then(
                    function success(response) {
                        $scope.album = angular.copy(response.data);

                        //Lưu items
                        angular.forEach($scope.items, function (value, index) {
                            value.idAlbum = angular.copy($scope.album.id);
                            $http.post(apiItemAlbum, value)
                                .then(function success(response) {
                                    value = angular.copy(response.data);
                                }, function error(response) { });
                        });

                        toastr.success('Thành công', 'Thêm Album');
                        $window.location.href = '/Admin/Album';
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Album');
                    }
                );
        }
        else {
            $http.put(apiAlbum + '/' + $scope.album.id, $scope.album)
                .then(
                function success(response) {
                        //Delete Old Items
                        $http.get('/Admin/Album/DeleteItemByAlbum/' + $scope.album.id)
                            .then(function success(response) {
                                if (response.data == "1") {
                                    angular.forEach($scope.items, function (value, index) {
                                        value.idAlbum = angular.copy($scope.album.id);
                                        $http.post(apiItemAlbum, value)
                                            .then(function success(response) {
                                                value = angular.copy(response.data);
                                            }, function error(response) { });
                                    });
                                } else {
                                    toastr.error('Thất bại', 'Lưu ảnh');
                                }
                            }, function error(response) {
                                toastr.error('Thất bại', 'Lưu ảnh');
                            });

                        toastr.success('Thành công', 'Lưu Album');
                        $window.location.href = '/Admin/Album';
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Lưu Album');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.album.id == null) {
            $http.post(apiAlbum, $scope.album)
                .then(
                    function success(response) {
                        $scope.album = angular.copy(response.data);

                        //Lưu items
                        angular.forEach($scope.items, function (value, index) {
                            value.idAlbum = angular.copy($scope.album.id);
                            $http.post(apiItemAlbum, value)
                                .then(function success(response) {
                                    value = angular.copy(response.data);
                                }, function error(response) { });
                        });

                        toastr.success('Thành công', 'Thêm Album');
                        $window.location.href = '/Admin/Album/Modify';
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Album');
                    }
                );
        }
        else {
            $http.put(apiAlbum + '/' + $scope.album.id, $scope.album)
                .then(
                function success(response) {
                        //Delete Old Items
                        $http.get('/Admin/Album/DeleteItemByAlbum/' + $scope.album.id)
                            .then(function success(response) {
                                if (response.data == "1") {
                                    angular.forEach($scope.items, function (value, index) {
                                        value.idAlbum = angular.copy($scope.album.id);
                                        $http.post(apiItemAlbum, value)
                                            .then(function success(response) {
                                                value = angular.copy(response.data);
                                            }, function error(response) { });
                                    });
                                } else {
                                    toastr.error('Thất bại', 'Lưu ảnh');
                                }
                            }, function error(response) {
                                toastr.error('Thất bại', 'Lưu ảnh');
                            });

                        toastr.success('Thành công', 'Lưu Album');
                        $window.location.href = '/Admin/Album/Modify';
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Lưu Album');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/Album';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.album = {
            published: true,
            timeCreated: new Date()
        };
    }

    //Get Album
    function GetAlbum(id) {
        $http.get(apiAlbum + '/' + $scope.album.id)
            .then(function success(response) {
                $scope.album = angular.copy(response.data);
                //Get Items Album
                $http.get(apiItemAlbum + "?att=idAlbum&&value=" + $scope.album.id)
                    .then(function success(response) {
                        $scope.items = angular.copy(response.data);
                    }, function error(response) {
                        toastr.error('Thất bại', 'Lấy danh sách ảnh');
                    });
            }, function error(response) {
                $window.location.href = '/Admin/Album';
            });
    }

    //---Item---
    $scope.AddItem = function () {
        $scope.modifyItem = true;
        $scope.item = {
            colorBackground: '#ffffff',
            colorText: '#000000'
        };
    }
    $scope.SaveItem = function () {
        $scope.modifyItem = false;
        if (angular.isDefined($scope.item.index)){
            $scope.items[$scope.item.index] = angular.copy($scope.item);
        } else {
            $scope.items.push($scope.item);
        }
        $scope.item = {};
    }
    $scope.CancelSaveMenu = function () {
        $scope.modifyItem = false;
        $scope.item = {};
    }
    $scope.EditItem = function (index) {
        $scope.modifyItem = true;
        $scope.item = angular.copy($scope.items[index]);
        $scope.item.index = angular.copy(index);
    }
    $scope.DeleteItem = function (index) {
        $scope.deleteItem = true;
        $scope.item = angular.copy($scope.items[index]);
        $scope.item.index = angular.copy(index);
    }
    $scope.ConfirmDeleteItem = function () {
        $scope.deleteItem = false;
        $scope.items.splice($scope.item.index, 1);
    }
    $scope.CancelDeleteItem = function () {
        $scope.deleteItem = false;
    }

    //Chọn hình ảnh
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.album.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }
    //Chọn hình ảnh Item
    $scope.ChooseImageItem = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.item.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Generate Alias
    $scope.GenAlias = function () {
        $scope.album.alias = angular.copy(Alias.genAlias($scope.album.title));
    };

    
}]);