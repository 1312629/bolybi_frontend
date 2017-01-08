appControllers.controller('svHomeController', ['$scope', '$state', 'ordersService', 'productsService',
	function($scope, $state, ordersService, productsService) {
        $('body').removeClass('loaded');
        //$scope.listOrders = ordersService.getListOrders();
        
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
            }
            $scope.$apply();
            $('body').addClass('loaded');
        })
        
        $('body').removeClass('loaded');
        ordersService.getListOrders(function(err, result) {
            console.log(result);
            if(err) {return window.alert(err)}
            if (result.Code != 200) {
                return window.alert(result.Message);
            }
            $scope.listOrders = [];
            for(var i = 0; i < result.Data; i++) {
                $scope.listOrders.push(result.Data[i].Order);
                $scope.listOrders[i].CreatedDate = (new Date($scope.listOrders[i].CreatedDate)).toLocaleDateString();
            }
            $scope.$apply();
            $('body').addClass('loaded');
        })
	}
]);