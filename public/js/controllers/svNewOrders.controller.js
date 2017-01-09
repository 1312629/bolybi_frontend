appControllers.controller('svNewOrdersController', ['$scope', '$state', 'ordersService', 'productsService',
	function($scope, $state, ordersService, productsService) {

        $scope.showDetail = false;
        
        $scope.showForm = function(index) {
            $scope.showDetail = true;
            $scope.selectedIndex = index;
        }
        
        var findItemById = function(id, list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].ID == id) {
                    return list[i];
                }
            }
        }
        var loadOrders = function() {
            $('body').removeClass('loaded');
            productsService.getAllProducts(function(err, result) {       
                console.log(result);
                if(err) {return window.alert(err)}
                if (result.Code != 200) {
                    return window.alert(result.Message);
                }
                /* init listProduct */
                $scope.listProducts =[];
                for (var i = 0; i < result.Data.length; i++) {
                    $scope.listProducts.push(result.Data[i].Item);
                    $scope.listProducts[i].ItemMeta = result.Data[i].ListMeta;
                    $scope.listProducts[i].ItemDetail = result.Data[i].ListDetail;
                    $scope.listProducts[i].index = i;
                }
                ordersService.getListOrders(function(err, result) {
                    console.log(result);
                    if(err) {return window.alert(err)}
                    if (result.Code != 200) {
                        return window.alert(result.Message);
                    }
                    $scope.listOrders = [];
                    for(var i = 0; i < result.Data.length; i++) {
                        if (result.Data[i].Order.Status == "New") {
                            $scope.listOrders.push(result.Data[i].Order);
                            $scope.listOrders[$scope.listOrders.length - 1].CreatedDate = (new Date($scope.listOrders[$scope.listOrders.length - 1].CreatedDate)).toLocaleDateString();
                            $scope.listOrders[$scope.listOrders.length - 1].EndDate = (new Date($scope.listOrders[$scope.listOrders.length - 1].EndDate)).toLocaleDateString();
                            $scope.listOrders[$scope.listOrders.length - 1].OrderDetail = result.Data[i].ListOrderDetail;
                            for (var j = 0; j < $scope.listOrders[$scope.listOrders.length - 1].OrderDetail.length; j++) {
                                $scope.listOrders[$scope.listOrders.length - 1].OrderDetail[j].Item = findItemById($scope.listOrders[$scope.listOrders.length - 1].OrderDetail[j].ID_Item, $scope.listProducts);
                            }
                        }
                    }
                    $scope.$apply();
                    $('body').addClass('loaded');
                })
            })
        };
        
        loadOrders();
        
        $scope.changeStatus = function(index, stat) {
            var r = confirm("Are you sure?");
            if (r == true) {
                if (index < 0 || index >= $scope.listOrders.length) {
                    return window.alert("Error! Please refresh page!");
                }
                $('body').removeClass('loaded');
                var data = {};
                data.Discount = $scope.listOrders[index].Discount;
                data.Status = stat;
                if (stat == 'Finished'){
                    data.EndDate = (new Date()).toLocaleDateString();
                } else {
                    data.EndDate = $scope.listOrders[index].EndDate;
                }
                ordersService.updateOrder($scope.listOrders[index].ID, data, function(err, result) {
                    $('body').removeClass('loaded');
                    if (err) {return window.alert(err);}

                    if (result.Code != 200) {
                        return window.alert(result.Message);
                    }
                    Materialize.toast("Updated Order Status!", 4000);
                    loadOrders();
                })
            }
        }
	}
]);