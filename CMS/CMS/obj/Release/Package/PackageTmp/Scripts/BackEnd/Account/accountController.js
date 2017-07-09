admin.controller("accountController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Account
    $scope.accounts = [];
    $scope.account = {};
    $scope.selectedAccounts = [];
    var apiAccount = "/API/AccountAPI";

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
    //Account
    $scope.deleteAccount = false;
    $scope.titleDeleteAccount = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteAccount = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteAccount",
        showTitle: false,
        bindingOptions: {
            visible: "deleteAccount",
        }
    };

    //---CONTROL CONFIG---

    //---LIST---
    //Category Accounts
    $scope.gridAccounts = {
        bindingOptions: {
            dataSource: 'accounts'
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
            //{//0
            //    alignment: "left",
            //    allowEditing: false,
            //    caption: "ID",
            //    dataField: "string"
            //},
            {//1
                alignment: "left",
                caption: "Email",
                dataField: "email",
                dataType: "string"
            },
            {//2
                caption: "Xác nhận Email",
                dataField: "emailConfirmed",
                dataType: "boolean"
            },
            {//3
                caption: "Bảo mật 2 lớp",
                dataField: "twoFactor",
                dataType: "boolean"
            }
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
            fileName: "Danh sách Account",
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
                            $scope.AddAccount();
                        }
                    }
                },
                //{//Sửa
                //    location: "after",
                //    widget: "dxButton",
                //    options: {
                //        hint: "Sửa",
                //        icon: "edit",
                //        type: "default",
                //        onClick: function () {
                //            $scope.EditAccount();
                //        }
                //    }
                //},
                {//Xóa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Xóa",
                        icon: "trash",
                        type: "danger",
                        onClick: function () {
                            $scope.DeleteAccount();
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
                            GetAllAccount();
                        }
                    }
                }
           )
        },
        //DoubleClick Row
        //onRowClick: function (e) {
        //    var component = e.component;

        //    if (!component.clickCount)
        //        component.clickCount = 1;
        //    else
        //        component.clickCount = component.clickCount + 1;

        //    if (component.clickCount == 1) {
        //        component.lastClickTime = new Date();
        //        setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
        //    }
        //    else if (component.clickCount == 2) {
        //        if (((new Date()) - component.lastClickTime) < 300) {
        //            $scope.account = angular.copy(e.data);
        //            $scope.EditAccount();
        //        }

        //        // Reset your click info
        //        component.clickCount = 0;
        //        component.lastClickTime = 0;
        //    }
        //},
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedAccounts = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Category Account
    $scope.contextMenuAccounts = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#account',
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
                        $scope.AddAccount();
                        break;
                    case "delete":
                        $scope.DeleteAccount();
                        break;
                }
            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllAccount();
    }

    //GetAllAccount
    function GetAllAccount() {
        $http.get('/Admin/AccountUser/GetAll')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.accounts = angular.copy(response.data);
                    } else {

                    }
                },
                function error(response) {

                }
            );
    }
    //Add
    $scope.AddAccount = function () {
        $window.location.href = "/Account/Register";
    }
    //Edit
    $scope.EditAccount = function () {
        if ($scope.selectedAccounts.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.account = angular.copy($scope.selectedAccounts[0]);
            $window.location.href = "/Admin/Account/Modify?idAccount=" + $scope.account.id;
        }
    }
    //Delete
    $scope.DeleteAccount = function () {
        if ($scope.selectedAccounts.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteAccount = true;
        }
    }
    $scope.ConfirmDeleteAccount = function () {
        $scope.account = angular.copy($scope.selectedAccounts[0]);
        $window.location.href = "/Account/Delete/" + $scope.account.id;
        $scope.deleteAccount = false;
    };
    $scope.CancelDeleteAccount = function () {
        $scope.deleteAccount = false;
    };

}]);