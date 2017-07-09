admin.controller("menuController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Menu
    $scope.menus = [];
    $scope.menu = {};
    $scope.selectedMenus = [];
    var apiMenu = "/API/MenuAPI";

    //---POPUP---
    //Menu
    $scope.modifyMenu = false;
    $scope.titlePopupModifyMenu = "Thêm menu";
    $scope.popupModifyMenu = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateModifyMenu",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyMenu",
            visible: "modifyMenu",
        }
    };
    $scope.deleteMenu = false;
    $scope.titleDeleteMenu = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteMenu = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteMenu",
        showTitle: false,
        bindingOptions: {
            visible: "deleteMenu",
        }
    };

    //---CONTROL CONFIG---
    //Menu
    $scope.controlMenu = {
        //TextBox
        name: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "menu.name"
            }
        },
        //SelectBox
        //TextArea
        note: {
            height: 100,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "menu.note",
            }
        },
        //Button
    }

    //---LIST---
    //Menus
    $scope.gridMenus = {
        bindingOptions: {
            dataSource: 'menus',
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
                caption: "Tên menu",
                dataField: "name",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
                width: 250
            },
            {//2
                alignment: "left",
                caption: "Ghi chú",
                dataField: "note",
                dataType: "string"
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
            fileName: "Danh sách Menu",
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
            contextMenuEnabled: true,
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
                            $scope.AddMenu();
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
                            $scope.EditMenu();
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
                            $scope.DeleteMenu();
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
                    $scope.EditMenu();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedMenus = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Menu
    $scope.contextMenuMenu = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#menu',
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
                        $scope.AddMenu();
                        break;
                    case "edit":
                        $scope.EditMenu();
                        break;
                    case "delete":
                        $scope.DeleteMenu();
                        break;
                }
            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllMenu();
    }

    //GetAllMenu
    function GetAllMenu() {
        $http.get('/API/MenuAPI')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.menus = angular.copy(response.data);
                    } else {

                    }
                },
                function error(response) {

                }
            );
    }
    //Add
    $scope.AddMenu = function () {
        $scope.menu = {};

        $scope.titlePopupModifyMenu = "Thêm Menu";
        $scope.modifyMenu = true;
    }
    //Edit
    $scope.EditMenu = function () {
        if ($scope.selectedMenus.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.menu = angular.copy($scope.selectedMenus[0]);
            $scope.titlePopupModifyMenu = "Sửa Menu";
            $scope.modifyMenu = true;
        }
    }
    //Save
    $scope.SaveMenu = function (e) {
        //Thêm
        if (!angular.isDefined($scope.menu.id)) {
            $http.post(apiMenu, $scope.menu)
                .then(function (response) {
                    if (response.status == 201) {
                        GetAllMenu();
                        toastr.success("Thành công", "Thêm");
                        $scope.modifyMenu = false;
                    } else {
                        toastr.error("Thất bại", "Thêm");
                    }
                });
        }
        //Sửa
        else {
            $http.put(apiMenu + "/" + $scope.menu.id, $scope.menu)
                .then(function (response) {
                    if (response.status == 204) {
                        GetAllMenu();
                        toastr.success("Thành công", "Sửa");
                        $scope.modifyMenu = false;
                    } else {
                        toastr.error("Thất bại", "Sửa");
                    }
                });
        }
    };
    $scope.CancelSaveMenu = function () {
        $scope.modifyMenu = false;
    }
    //Delete
    $scope.DeleteMenu = function () {
        if ($scope.selectedMenus.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteMenu = true;
        }
    }
    $scope.ConfirmDeleteMenu = function () {
        angular.forEach($scope.selectedMenus, function (value, index) {
            $http.delete(apiMenu + '/' + value.id)
                .then(
                    function success(response) {
                        if (response.status == 200) {
                            angular.forEach($scope.menus, function (valueMenu, indexMenu) {
                                if (value.id === valueMenu.id) {
                                    $scope.menus.splice(indexMenu, 1);
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
    $scope.CancelDeleteMenu = function () {
        $scope.deleteMenu = false;
    };

}]);