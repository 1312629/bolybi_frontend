appControllers.controller('svAddAccesController', ['$scope', '$state', 'accessoriesService',
	function($scope, $state, accessoriesService) {
        
        $scope.listGender = [{value: "Both"}, {value: "Male"}, {value: "Female"}];
        $scope.listCate = [{name: "Accessories"}];
        
        $scope.newAccessories = accessoriesService.getNewAccessories();
        
         $scope.reset = function() {
            $scope.newAccessories = accessoriesService.getNewAccessories();
        }
        
        $scope.add = function() {
            if (!accessoriesService.checkAccessories($scope.newAccessories)) {
                window.alert("Incorrect Infomation!");
                return;
            }
            $scope.data = {};
            $scope.data.Item = $scope.newAccessories;
            $scope.data.ListDetail = $scope.newAccessories.ItemDetail;
            $scope.data.ListMeta = $scope.newAccessories.ItemMeta;
            accessoriesService.addNewAccessories($scope.data, function(err, result) {
                if (err) {
                    return window.alert(err);
                }
                window.alert(result.Message);
                if (result.Code != 200) {
                    return;
                }
                $scope.reset();
            });
        }
	}
]);