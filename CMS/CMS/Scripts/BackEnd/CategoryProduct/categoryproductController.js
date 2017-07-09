admin.controller("categoryproductController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Category Product
    $scope.categoryProducts = [];
    $scope.tempCategoryProducts = [];
    $scope.categoryProduct = {};
    $scope.selectedCategoryProducts = [];
    var apiCategoryProduct = "/API/CategoryProductAPI";

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


    //---POPUP---
    //Category Product
    $scope.deleteCategoryProduct = false;
    $scope.titleDeleteCategoryProduct = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteCategoryProduct = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteCategoryProduct",
        showTitle: false,
        bindingOptions: {
            visible: "deleteCategoryProduct",
        }
    };

    //---CONTROL CONFIG---

    //---LIST---
    //Category Products
    $scope.gridCategoryProducts = {
        bindingOptions: {
            dataSource: 'categoryProducts',
            'columns[3].lookup.dataSource': 'statuses',
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
            },
            {//2
                alignment: "left",
                caption: "Alias",
                dataField: "alias",
                dataType: "string",
            },
            {//3
                caption: "Trạng thái",
                dataField: "published",
                lookup: {
                    displayExpr: 'text',
                    valueExpr: 'value'
                },
            },
            //{//4
            //    caption: "Là dịch vụ",
            //    dataField: "isService",
            //    dataType: "boolean"
            //},
            {//5
                alignment: "left",
                caption: "Ghi chú",
                dataField: "note",
                dataType: "string"
            },
        ],
        editing: {
            mode: "cell",
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
            fileName: "Danh sách Danh mục Sản phẩm",
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
                            $scope.AddCategoryProduct();
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
                            $scope.EditCategoryProduct();
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
                            $scope.DeleteCategoryProduct();
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
                            GetAllCategoryProduct();
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
                    $scope.categoryProduct = angular.copy(e.data);
                    $scope.EditCategoryProduct();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedCategoryProducts = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Category Product
    $scope.contextMenuCategoryProduct = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#post',
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
                        $scope.AddCategoryProduct();
                        break;
                    case "edit":
                        $scope.EditCategoryProduct();
                        break;
                    case "delete":
                        $scope.DeleteCategoryProduct();
                        break;
                }

            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllCategoryProduct();
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
    //Add
    $scope.AddCategoryProduct = function () {
        $window.location.href = "/Admin/CategoryProduct/Modify";
    }
    //Edit
    $scope.EditCategoryProduct = function () {
        if ($scope.selectedCategoryProducts.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.categoryProduct = angular.copy($scope.selectedCategoryProducts[0]);
            $window.location.href = "/Admin/CategoryProduct/Modify?idCategoryProduct=" + $scope.categoryProduct.id;
        }
    }
    //Delete
    $scope.DeleteCategoryProduct = function () {
        if ($scope.selectedCategoryProducts.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteCategoryProduct = true;
        }
    }
    $scope.ConfirmDeleteCategoryProduct = function () {
        angular.forEach($scope.selectedCategoryProducts, function (value, index) {
            $http.delete(apiCategoryProduct + '/' + value.id)
                .then(
                    function success(response) {
                        if (response.status == 200) {
                            angular.forEach($scope.categoryProducts, function (valueCategoryProduct, indexCategoryProduct) {
                                if (value.id === valueCategoryProduct.id) {
                                    $scope.categoryProducts.splice(indexCategoryProduct, 1);
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
        $scope.deleteCategoryProduct = false;
    };
    $scope.CancelDeleteCategoryProduct = function () {
        $scope.deleteCategoryProduct = false;
    };

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

}]);