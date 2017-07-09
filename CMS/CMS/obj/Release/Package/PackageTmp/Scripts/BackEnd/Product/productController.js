admin.controller("productController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Bài viết
    $scope.products = [];
    $scope.product = {};
    $scope.selectedProducts = [];
    var apiProduct = "/API/ProductAPI";
    //Category Product
    $scope.categoryProducts = [];
    $scope.tempCategoryProducts = [];

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
    $scope.categoryProducts = [];


    //---POPUP---
    //Bài viết
    $scope.deleteProduct = false;
    $scope.titleDeleteProduct = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteProduct = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteProduct",
        showTitle: false,
        bindingOptions: {
            visible: "deleteProduct",
        }
    };

    //---CONTROL CONFIG---

    //---LIST---
    //Category Products
    $scope.gridProducts = {
        bindingOptions: {
            dataSource: 'products',
            'columns[3].lookup.dataSource': 'categoryProducts',
            'columns[4].lookup.dataSource': 'statuses',
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
                caption: "Danh mục",
                dataField: "idCategory",
                lookup: {
                    displayExpr: 'title',
                    valueExpr: 'id'
                },
            },
            {//4
                caption: "Trạng thái",
                dataField: "published",
                lookup: {
                    displayExpr: 'text',
                    valueExpr: 'value'
                },
            },
            {//5
                caption: "Nổi bật",
                dataField: "featured",
                dataType: "boolean"
            },
            {//6
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
            fileName: "Danh sách Bài viết",
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
                            $scope.AddProduct();
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
                            $scope.EditProduct();
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
                            $scope.DeleteProduct();
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
                            GetAllProduct();
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
                    $scope.product = angular.copy(e.data);
                    $scope.EditProduct();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedProducts = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Category Product
    $scope.contextMenuProduct = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#product',
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
                        $scope.AddProduct();
                        break;
                    case "edit":
                        $scope.EditProduct();
                        break;
                    case "delete":
                        $scope.DeleteProduct();
                        break;
                }
            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllProduct();
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
    //GetAllProduct
    function GetAllProduct() {
        $http.get('/Product/GetAll')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.products = angular.copy(response.data);
                    } else {

                    }
                },
                function error(response) {

                }
            );
    }
    //Add
    $scope.AddProduct = function () {
        $window.location.href = "/Admin/Product/Modify";
    }
    //Edit
    $scope.EditProduct = function () {
        if ($scope.selectedProducts.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.product = angular.copy($scope.selectedProducts[0]);
            $window.location.href = "/Admin/Product/Modify?idProduct=" + $scope.product.id;
        }
    }
    //Delete
    $scope.DeleteProduct = function () {
        if ($scope.selectedProducts.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteProduct = true;
        }
    }
    $scope.ConfirmDeleteProduct = function () {
        angular.forEach($scope.selectedProducts, function (value, index) {
            $http.delete(apiProduct + '/' + value.id)
                .then(
                    function success(response) {
                        if (response.status == 200) {
                            angular.forEach($scope.products, function (valueProduct, indexProduct) {
                                if (value.id === valueProduct.id) {
                                    $scope.products.splice(indexProduct, 1);
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
        $scope.deleteProduct = false;
    };
    $scope.CancelDeleteProduct = function () {
        $scope.deleteProduct = false;
    };

    //Gen Category Multi Level
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