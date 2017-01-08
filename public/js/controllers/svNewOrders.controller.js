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
                for(var i = 0; i < result.Data; i++) {
                    if (result.Data[i].Order.Status == "New") {
                         $scope.listOrders.push(result.Data[i].Order);
                        $scope.listOrders[i].CreatedDate = (new Date($scope.listOrders[i].CreatedDate)).toLocaleDateString();
                        $scope.listOrders[i].OrderDetail = result.Data[i].ListOrderDetail;
                        for (var j = 0; j < $scope.listOrder[i].OrderDetail.length; j++) {
                            $scope.listOrder[i].OrderDetail[j].Item = findItemById($scope.listOrder[i].OrderDetail[j].ID_Item, $scope.listProducts);
                        }
                    }
                }
                $scope.$apply();
                $('body').addClass('loaded');
            })
        })
        
	}
]);