admin.controller("modifyVideoController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, $sce, Alias, Url) {
    //---VAR---
    //Video
    apiVideo = "/API/VideoAPI";
    $scope.video = {};
    //Items
    $scope.items = [];
    $scope.item = {};
    apiItemVideo = "/API/ItemVideoAPI";

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

    //Lấy idVideo từ Url
    $scope.video.id = Url.getParameterByName('idVideo');

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
        //Nếu sửa thì trả về giá trị của Video
        if ($scope.video.id !== null) {
            GetVideo($scope.video.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //---Video---
    //Save
    $scope.Save = function () {
        if ($scope.video.id == null) {
            //Lưu video
            $http.post(apiVideo, $scope.video)
                .then(
                    function success(response) {
                        $scope.video = angular.copy(response.data);
                        toastr.success('Thành công', 'Thêm Video');
                        $window.location.href = '/Admin/Video/Modify?idVideo=' + $scope.video.id;
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Video');
                    }
                );
        }
        else {
            $http.put(apiVideo + '/' + $scope.video.id, $scope.video)
                .then(
                function success(response) {
                        toastr.success('Thành công', 'Lưu Video');
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Lưu Video');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/Video';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.video = {
            published: true,
            featured: false
        };
    }

    //Get Video
    function GetVideo(id) {
        $http.get(apiVideo + '/' + $scope.video.id)
            .then(function success(response) {
                $scope.video = angular.copy(response.data);
            }, function error(response) {
                $window.location.href = '/Admin/Video';
            });
    }


    //Chọn hình ảnh
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.video.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


    //Generate Alias
    $scope.GenAlias = function () {
        $scope.video.alias = angular.copy(Alias.genAlias($scope.video.title));
    };

    
}]);