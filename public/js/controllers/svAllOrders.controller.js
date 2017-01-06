appControllers.controller('svAllOrdersController', ['$scope', '$state', 'ordersService',
	function($scope, $state, ordersService) {
        $scope.listOrders = ordersService.getListOrders();
        $scope.showDetail = false;
        
        $scope.showForm = function(index) {
            $scope.showDetail = true;
            $scope.selectedIndex = index;
        }
	}
]);