admin.controller("itemitemMenuController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Menu
    $scope.menus = [];
    var apiMenu = "/API/MenuAPI";
    //ItemMenu
    $scope.itemMenus = [];
    $scope.itemMenu = {};
    $scope.selectedItemMenus = [];
    var apiItemMenu = "/API/ItemMenuAPI";
    //Type
    $scope.typeItems = [
        {
            text: "Bài viết",
            value: 1
        },
        {
            text: "Sản phẩm",
            value: 2
        },
        {
            text: "Danh sách bài viết",
            value: 3
        },
        {
            text: "Danh sách sản phẩm",
            value: 4
        },
        {
            text: "Danh sách danh mục bài viết",
            value: 5
        },
        {
            text: "Danh sách danh mục sản phẩm",
            value: 6
        },
        {
            text: "Liên kết",
            value: 7
        },
    ];
    $scope.components = [];

    //---POPUP---
    //ItemMenu
    $scope.modifyItemMenu = false;
    $scope.titlePopupModifyItemMenu = "Thêm Item Menu";
    $scope.popupModifyItemMenu = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateModifyItemMenu",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyItemMenu",
            visible: "modifyItemMenu",
        }
    };
    $scope.deleteItemMenu = false;
    $scope.titleDeleteItemMenu = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteItemMenu = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteItemMenu",
        showTitle: false,
        bindingOptions: {
            visible: "deleteItemMenu",
        }
    };

    //---CONTROL CONFIG---
    //ItemMenu
    $scope.controlItemMenu = {
        //TextBox
        title: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "itemMenu.title"
            }
        },
        //SelectBox
        idMenu: {
            displayExpr: "name",
            valueExpr: "id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "Chọn ...",
            bindingOptions: {
                items: "menus",
                value: "itemMenu.idMenu"
            }
        },
        idType: {
            displayExpr: "text",
            valueExpr: "value",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "Chọn ...",
            bindingOptions: {
                items: "typeItems",
                value: "itemMenu.idType"
            },
            onSelectionChanged: function (i) {
                GetComponentByType(i.selectedItem.value);
            }
        },
        idComponent: {
            displayExpr: "title",
            valueExpr: "id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "Chọn ...",
            bindingOptions: {
                items: "components",
                value: "itemMenu.idComponent",
            }
        },
        //TextArea
        //Button
    }

    //---LIST---
    //ItemMenus
    $scope.gridItemMenus = {
        bindingOptions: {
            dataSource: 'itemMenus',
            'columns[2].lookup.dataSource': 'menus',
            'columns[3].lookup.dataSource': 'typeItems',
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
                caption: "Tiêu đề",
                dataField: "title",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
                width: 300
            },
            {//2
                caption: "Menu",
                dataField: "idMenu",
                lookup: {
                    displayExpr: 'name',
                    valueExpr: 'id'
                },
            },
            {//3
                caption: "Loại item",
                dataField: "idType",
                lookup: {
                    displayExpr: 'text',
                    valueExpr: 'value'
                },
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
            fileName: "Danh sách Item Menu",
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
            contextItemMenuEnabled: true,
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
                            $scope.AddItemMenu();
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
                            $scope.EditItemMenu();
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
                            $scope.DeleteItemMenu();
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
                    $scope.EditItemMenu();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedItemMenus = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextItemMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //ItemMenu
    $scope.contextMenuItemMenu = {
        dataSource: itemContextItemMenus,
        width: 100,
        target: '#itemMenu',
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
                        $scope.AddItemMenu();
                        break;
                    case "edit":
                        $scope.EditItemMenu();
                        break;
                    case "delete":
                        $scope.DeleteItemMenu();
                        break;
                }
            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllMenu();
        GetAllItemMenu();
    }

    //GetAllMenu
    function GetAllMenu() {
        $http.get(apiMenu)
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

    //GetAllItemMenu
    function GetAllItemMenu() {
        $http.get('/API/ItemMenuAPI')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.itemMenus = angular.copy(response.data);
                    } else {

                    }
                },
                function error(response) {

                }
            );
    }
    //Add
    $scope.AddItemMenu = function () {
        $scope.itemMenu = {};

        $scope.titlePopupModifyItemMenu = "Thêm ItemMenu";
        $scope.modifyItemMenu = true;
    }
    //Edit
    $scope.EditItemMenu = function () {
        if ($scope.selectedItemMenus.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.itemMenu = angular.copy($scope.selectedItemMenus[0]);
            $scope.titlePopupModifyItemMenu = "Sửa ItemMenu";
            $scope.modifyItemMenu = true;
        }
    }
    //Save
    $scope.SaveItemMenu = function (e) {
        //Thêm
        if (!angular.isDefined($scope.itemMenu.id)) {
            $http.post(apiItemMenu, $scope.itemMenu)
                .then(function (response) {
                    if (response.status == 201) {
                        GetAllItemMenu();
                        toastr.success("Thành công", "Thêm");
                        $scope.modifyItemMenu = false;
                    } else {
                        toastr.error("Thất bại", "Thêm");
                    }
                });
        }
        //Sửa
        else {
            $http.put(apiItemMenu + "/" + $scope.itemMenu.id, $scope.itemMenu)
                .then(function (response) {
                    if (response.status == 204) {
                        GetAllItemMenu();
                        toastr.success("Thành công", "Sửa");
                        $scope.modifyItemMenu = false;
                    } else {
                        toastr.error("Thất bại", "Sửa");
                    }
                });
        }
    };
    $scope.CancelSaveItemMenu = function () {
        $scope.modifyItemMenu = false;
    }
    //Delete
    $scope.DeleteItemMenu = function () {
        if ($scope.selectedItemMenus.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteItemMenu = true;
        }
    }
    $scope.ConfirmDeleteItemMenu = function () {
        angular.forEach($scope.selectedItemMenus, function (value, index) {
            $http.delete(apiItemMenu + '/' + value.id)
                .then(
                    function success(response) {
                        if (response.status == 200) {
                            angular.forEach($scope.itemMenus, function (valueItemMenu, indexItemMenu) {
                                if (value.id === valueItemMenu.id) {
                                    $scope.itemMenus.splice(indexItemMenu, 1);
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
    $scope.CancelDeleteItemMenu = function () {
        $scope.deleteItemMenu = false;
    };


    function GetComponentByType(id) {
        switch (id) {
            case 1:
                $http.get('/Admin/Post/GetList')
                    .then(function success(response) {
                        $scope.components = angular.copy(response.data);
                    }, function error(response) {
                        toastr.error("Thất bại", "Lấy danh sách bài viết");
                    });
                break;
            case 2:
                $http.get('/Admin/Product/GetList')
                    .then(function success(response) {
                        $scope.components = angular.copy(response.data);
                    }, function error(response) {
                        toastr.error("Thất bại", "Lấy danh sách sản phẩm");
                    });
                break;
            case 3:
                $http.get('/Admin/CategoryPost/GetList')
                    .then(function success(response) {
                        $scope.components = angular.copy(response.data);
                    }, function error(response) {
                        toastr.error("Thất bại", "Lấy danh sách danh mục bài viết");
                    });
                break;
            case 4:
                $http.get('/Admin/CategoryProduct/GetList')
                    .then(function success(response) {
                        $scope.components = angular.copy(response.data);
                    }, function error(response) {
                        toastr.error("Thất bại", "Lấy danh sách danh mục sản phẩm");
                    });
                break;
            case 5:
                $http.get('/Admin/CategoryPost/GetList')
                    .then(function success(response) {
                        $scope.components = angular.copy(response.data);
                    }, function error(response) {
                        toastr.error("Thất bại", "Lấy danh sách danh mục bài viết");
                    });
                break;
            case 6:
                $http.get('/Admin/CategoryProduct/GetList')
                    .then(function success(response) {
                        $scope.components = angular.copy(response.data);
                    }, function error(response) {
                        toastr.error("Thất bại", "Lấy danh sách danh mục sản phẩm");
                    });
                break;
            default:
        }
    }

}]);