admin.controller("videoController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Video
    $scope.videos = [];
    $scope.video = {};
    $scope.selectedVideos = [];
    var apiVideo = "/API/VideoAPI";

    //---POPUP---
    //Video
    $scope.deleteVideo = false;
    $scope.titleDeleteVideo = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteVideo = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteVideo",
        showTitle: false,
        bindingOptions: {
            visible: "deleteVideo",
        }
    };

    //---CONTROL CONFIG---


    //---LIST---
    //Videos
    $scope.gridVideos = {
        bindingOptions: {
            dataSource: 'videos',
        },
        allowColumnResizing: true,
        columnAutoWidth: true,
        columnChooser: {
            emptyPanelText: "Kéo và thả cột muốn ẩn vào đây",
            enabled: true,
            mode: "select",
            title: "Lựa chọn cột"
        },
        columnFixing: {
            enabled: true,
            texts: {
                fix: "Cố định cột",
                leftPosition: "Bên trái",
                rightPosition: "Bên phải",
                unfix: "Hủy cố định"
            }
        },
        columns: [
            {//0
                alignment: "left",
                allowEditing: false,
                caption: "ID",
                dataField: "id",
                fixed: true,
                fixedPosition: "left",
                width: 90
            },
            {//1
                alignment: "left",
                caption: "Tên video",
                dataField: "title",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
                width: 250
            },
            {//2
                alignment: "left",
                caption: "Mô tả",
                dataField: "description",
                dataType: "string",
            },
        ],
        editing: {
            mode: "popup",
            allowAdding: false,
            allowDeleting: false,
            allowUpdating: false,
            texts: {
                addRow: "Thêm",
                cancelAllChanges: "Không thay đổi",
                cancelRowChanges: "Hủy",
                confirmDeleteMessage: "Bạn có chắc chắn muốn xóa?",
                deleteRow: "Xóa",
                editRow: "Sửa",
                saveAllChanges: "Lưu thay đổi",
                saveRowChanges: "Lưu",
                undeleteRow: "Không xóa",
                validationCancelChanges: "Hủy thay đổi"
            }
        },
        export: {
            allowExportSelectedData: true,
            enabled: true,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách Video",
            texts: {
                exportAll: "Xuất toàn bộ Dữ liệu",
                exportSelectedRows: "Xuất dữ liệu đang chọn",
                exportTo: "Trích xuất"
            }
        },
        filterRow: {
            applyFilterText: "Áp dụng bộ lọc",
            betweenEndText: "Kết thúc",
            betweenStartText: "Bắt đầu",
            resetOperationText: "Thiết lập lại",
            showAllText: "(Tất cả)",
            visible: true
        },
        grouping: {
            contextVideoEnabled: true,
            expandMode: "rowClick",
            texts: {
                groupByThisColumn: "Nhóm theo Cột này",
                groupContinuedMessage: "Tiếp tục từ trang trước",
                groupContinuesMessage: "Tiếp tục trên các trang tiếp theo",
                ungroup: "Bỏ nhóm",
                ungroupAll: "Bỏ tất cả nhóm"
            }
        },
        groupPanel: {
            emptyPanelText: "Kéo một cột vào đây để nhóm theo cột đó",
            visible: false
        },
        headerFilter: {
            texts: {
                cancel: "Hủy",
                emptyValue: "(Trống)",
                ok: "Đồng ý"
            },
            visible: true
        },
        hoverStateEnabled: true,
        loadPanel: {
            enabled: true,
            text: "Đang tải ..."
        },
        noDataText: "Không có dữ liệu",
        pager: {
            infoText: "Trang {0} của {1}",
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            enabled: true,
            pageIndex: 0,
            pageSize: 50
        },
        remoteOperations: {
            grouping: false,
            summary: false
        },
        rowAlternationEnabled: false,
        scrolling: {
            preloadEnabled: true
        },
        searchPanel: {
            placeholder: "Tìm kiếm ..."
        },
        selection: {
            mode: "multiple",
            showCheckBoxesMode: "onClick"
        },
        showBorders: true,
        showRowLines: true,
        sorting: {
            ascendingText: "Sắp xếp Tăng dần",
            clearText: "Xóa Sắp xếp",
            descendingText: "Sắp xếp Giảm dần"
        },
        summary: {
            texts: {
                count: "{0}",
                sum: "{0}"
            },
            groupItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ],
            totalItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ]
        },
        wordWrapEnabled: false,
        //METHOD
        //Toolbar
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {//Thêm
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Thêm",
                        icon: "add",
                        type: "success",
                        onClick: function () {
                            $scope.AddVideo();
                        }
                    }
                },
                {//Sửa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Sửa",
                        icon: "edit",
                        type: "default",
                        onClick: function () {
                            $scope.EditVideo();
                        }
                    }
                },
                {//Xóa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Xóa",
                        icon: "trash",
                        type: "danger",
                        onClick: function () {
                            $scope.DeleteVideo();
                        }
                    }
                },
                {//Load lại
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Load lại Dữ liệu",
                        icon: "refresh",
                        onClick: function () {
                            GetAllPost();
                        }
                    }
                }
           )
        },
        //DoubleClick Row
        onRowClick: function (e) {
            var component = e.component;

            if (!component.clickCount)
                component.clickCount = 1;
            else
                component.clickCount = component.clickCount + 1;

            if (component.clickCount == 1) {
                component.lastClickTime = new Date();
                setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
            }
            else if (component.clickCount == 2) {
                if (((new Date()) - component.lastClickTime) < 300) {
                    $scope.post = angular.copy(e.data);
                    $scope.EditVideo();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedVideos = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextVideos = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Video
    $scope.contextMenuVideo = {
        dataSource: itemContextVideos,
        width: 100,
        target: '#video',
        itemTemplate: function (itemData, itemIndex, itemElement) {
            var template = $('<div></div>');
            if (itemData.icon) {
                template.append('<span class="' + itemData.icon + '"><span>');
            }
            template.append(itemData.text);
            return template;
        },
        onItemClick: function (e) {
            if (!e.itemData.items) {
                switch (e.itemData.value) {
                    case "add":
                        $scope.AddVideo();
                        break;
                    case "edit":
                        $scope.EditVideo();
                        break;
                    case "delete":
                        $scope.DeleteVideo();
                        break;
                }
            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllVideo();
    }

    //GetAllVideo
    function GetAllVideo() {
        $http.get('/API/VideoAPI')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.videos = angular.copy(response.data);
                    } else {

                    }
                },
                function error(response) {

                }
            );
    }
    //Add
    $scope.AddVideo = function () {
        $window.location.href = "/Admin/Video/Modify";
    }
    //Edit
    $scope.EditVideo = function () {
        if ($scope.selectedVideos.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.video = angular.copy($scope.selectedVideos[0]);
            $window.location.href = "/Admin/Video/Modify?idVideo=" + $scope.video.id;
        }
    }
    //Delete
    $scope.DeleteVideo = function () {
        if ($scope.selectedVideos.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteVideo = true;
        }
    }
    $scope.ConfirmDeleteVideo = function () {
        angular.forEach($scope.selectedVideos, function (value, index) {
            $http.delete(apiVideo + '/' + value.id)
                .then(
                    function success(response) {
                        if (response.status == 200) {
                            angular.forEach($scope.videos, function (valueVideo, indexVideo) {
                                if (value.id === valueVideo.id) {
                                    $scope.videos.splice(indexVideo, 1);
                                }
                            });
                        } else {
                            toastr.error("Thất bại", "Xóa");
                        }
                    },
                    function error(response) {
                        toastr.error("Thất bại", "Xóa");
                    }
                );
        });
        toastr.success("Thành công", "Xóa");
        $scope.deletePost = false;
    };
    $scope.CancelDeleteVideo = function () {
        $scope.deleteVideo = false;
    };

}]);