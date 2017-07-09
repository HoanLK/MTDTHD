admin.controller("categorypostController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Category Post
    $scope.categoryPosts = [];
    $scope.tempCategoryPosts = [];
    $scope.categoryPost = {};
    $scope.selectedCategoryPosts = [];
    var apiCategoryPost = "/API/CategoryPostAPI";

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
    //Bài viết
    $scope.deleteCategoryPost = false;
    $scope.titleDeleteCategoryPost = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteCategoryPost = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteCategoryPost",
        showTitle: false,
        bindingOptions: {
            visible: "deleteCategoryPost",
        }
    };

    //---CONTROL CONFIG---

    //---LIST---
    //Category Posts
    $scope.gridCategoryPosts = {
        bindingOptions: {
            dataSource: 'categoryPosts',
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
            fileName: "Danh sách Danh mục bài viết",
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
                            $scope.AddCategoryPost();
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
                            $scope.EditCategoryPost();
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
                            $scope.DeleteCategoryPost();
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
                            GetAllCategoryPost();
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
                    $scope.categoryPost = angular.copy(e.data);
                    $scope.EditCategoryPost();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedCategoryPosts = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Category Post
    $scope.contextMenuCategoryPost = {
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
                        $scope.AddCategoryPost();
                        break;
                    case "edit":
                        $scope.EditCategoryPost();
                        break;
                    case "delete":
                        $scope.DeleteCategoryPost();
                        break;
                }

            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllCategoryPost();
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
    //Add
    $scope.AddCategoryPost = function () {
        $window.location.href = "/Admin/CategoryPost/Modify";
    }
    //Edit
    $scope.EditCategoryPost = function () {
        if ($scope.selectedCategoryPosts.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.categoryPost = angular.copy($scope.selectedCategoryPosts[0]);
            $window.location.href = "/Admin/CategoryPost/Modify?idCategoryPost=" + $scope.categoryPost.id;
        }
    }
    //Delete
    $scope.DeleteCategoryPost = function () {
        if ($scope.selectedCategoryPosts.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteCategoryPost = true;
        }
    }
    $scope.ConfirmDeleteCategoryPost = function () {
        angular.forEach($scope.selectedCategoryPosts, function (value, index) {
            $http.delete(apiCategoryPost + '/' + value.id)
                .then(
                    function success(response) {
                        if (response.status == 200) {
                            angular.forEach($scope.categoryPosts, function (valueCategoryPost, indexCategoryPost) {
                                if (value.id === valueCategoryPost.id) {
                                    $scope.categoryPosts.splice(indexCategoryPost, 1);
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
        $scope.deleteCategoryPost = false;
    };
    $scope.CancelDeleteCategoryPost = function () {
        $scope.deleteCategoryPost = false;
    };

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

}]);