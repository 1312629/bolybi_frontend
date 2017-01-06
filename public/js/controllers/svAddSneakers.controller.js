appControllers.controller('svAddSneakersController', ['$scope', '$state', "sneakersService",
	function($scope, $state, sneakersService) {
        
        $scope.listGender = [{value: "Both"}, {value: "Male"}, {value: "Female"}];
        $scope.listCate = [{name: "Running"}, {name: "Casual"}, {name: "Gym"}, {name: "Basketball"}, {name: "Soccer"}];
        
        $scope.newSneakers = sneakersService.getNewSneakers();
        
        $scope.reset = function() {
            $scope.newSneakers = sneakersService.resetNewSneakers();
        }
        
        $scope.add = function() {
            if (!sneakersService.checkSneakers($scope.newSneakers)) {
                window.alert("Incorrect Infomation!");
                return;
            }
            $scope.data = {};
            $scope.data.Item = $scope.newSneakers;
            $scope.data.ListDetail = $scope.newSneakers.ItemDetail;
            $scope.data.ListMeta = $scope.newSneakers.ItemMeta;
            sneakersService.addNewSneakers($scope.data, function(err, result) {
                if (err) {
                    return window.alert(err);
                }
                window.alert(result.Message);
                if (result.Code != 200) {
                    return;
                }
                $scope.newSneakers = sneakersService.resetNewSneakers();
            });
        }
        
	}
]);