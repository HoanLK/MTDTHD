admin.controller("documentController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Bài viết
    $scope.documents = [];
    $scope.document = {};
    $scope.selectedDocuments = [];
    var apiDocument = "/API/DocumentAPI";
    //Category Document
    $scope.categoryDocuments = [];
    $scope.tempCategoryDocuments = [];

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
    $scope.categoryDocuments = [];


    //---POPUP---
    //Bài viết
    $scope.deleteDocument = false;
    $scope.titleDeleteDocument = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteDocument = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteDocument",
        showTitle: false,
        bindingOptions: {
            visible: "deleteDocument",
        }
    };

    //---CONTROL CONFIG---

    //---LIST---
    //Category Documents
    $scope.gridDocuments = {
        bindingOptions: {
            dataSource: 'documents',
            'columns[3].lookup.dataSource': 'categoryDocuments',
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
                caption: "Tên tài liệu",
                dataField: "name",
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
                width: 250
            },
            {//3
                caption: "Danh mục",
                dataField: "idCategory",
                lookup: {
                    displayExpr: 'title',
                    valueExpr: 'id'
                },
                width: 200
            },
            {//4
                alignment: "left",
                caption: "Ngày ban hành",
                dataField: "timePublished",
                dataType: "date",
                format: "dd/MM/yyyy",
                customizeText: function (cellInfo) {
                    return cellInfo.valueText;
                },
            },
            {//5
                alignment: "left",
                caption: "Đơn vị",
                dataField: "nameUnit",
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
            fileName: "Danh sách Tài liệu",
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
                            $scope.AddDocument();
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
                            $scope.EditDocument();
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
                            $scope.DeleteDocument();
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
                            GetAllDocument();
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
                    $scope.document = angular.copy(e.data);
                    $scope.EditDocument();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedDocuments = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Document
    $scope.contextMenuDocument = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#document',
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
                        $scope.AddDocument();
                        break;
                    case "edit":
                        $scope.EditDocument();
                        break;
                    case "delete":
                        $scope.DeleteDocument();
                        break;
                }
            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllDocument();
        GetAllCategoryDocument();
    }

    //GetAllCategoryDocument
    function GetAllCategoryDocument() {
        $http.get('/CategoryDocument/GetAll')
            .then(
            function success(response) {
                if (response.status == 200) {
                    $scope.tempCategoryDocuments = angular.copy(response.data);

                    angular.forEach($scope.tempCategoryDocuments, function (value, index) {
                        CategoryMultiLevel(value, 0);
                    });

                } else {

                }
            },
            function error(response) {

            }
            );
    }
    //GetAllDocument
    function GetAllDocument() {
        $http.get(apiDocument)
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.documents = angular.copy(response.data);
                    } else {

                    }
                },
                function error(response) {

                }
            );
    }
    //Add
    $scope.AddDocument = function () {
        $window.location.href = "/Admin/Document/Modify";
    }
    //Edit
    $scope.EditDocument = function () {
        if ($scope.selectedDocuments.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.document = angular.copy($scope.selectedDocuments[0]);
            $window.location.href = "/Admin/Document/Modify?idDocument=" + $scope.document.id;
        }
    }
    //Delete
    $scope.DeleteDocument = function () {
        if ($scope.selectedDocuments.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteDocument = true;
        }
    }
    $scope.ConfirmDeleteDocument = function () {
        angular.forEach($scope.selectedDocuments, function (value, index) {
            $http.delete(apiDocument + '/' + value.id)
                .then(
                    function success(response) {
                        if (response.status == 200) {
                            angular.forEach($scope.documents, function (valueDocument, indexDocument) {
                                if (value.id === valueDocument.id) {
                                    $scope.documents.splice(indexDocument, 1);
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
        $scope.deleteDocument = false;
    };
    $scope.CancelDeleteDocument = function () {
        $scope.deleteDocument = false;
    };

    function CategoryMultiLevel(category, count) {
        if (category.idParentCategory == null || category.idParentCategory == "") {
            $scope.categoryDocuments.push(category);
        } else {
            if ($scope.categoryDocuments.indexOf(category) == -1) {
                count++;
                for (i = 1; i <= count; i++) {
                    category.title = "– " + category.title;
                }
                $scope.categoryDocuments.push(category);
                angular.forEach($scope.tempCategoryDocuments, function (value, index) {
                    if (value.idParentCategory == category.id) {
                        CategoryMultiLevel(value, count);
                    }
                });
            }
        }
    }

}]);