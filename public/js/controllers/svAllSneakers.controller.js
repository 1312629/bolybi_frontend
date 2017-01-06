appControllers.controller('svAllSneakersController', ['$scope', '$state', 'sneakersService',
	function($scope, $state, sneakersService) {
        sneakersService.getAllSneakers(function(err, result){
            if (err) {return window.alert(err);}
            if (result.Code != 200) {
                window.alert(result.Message);
                return;
            }
            $scope.listSneakers = [];
            for (var i = 0; i < result.Data.length; i++) {
                $scope.listSneakers.push(result.Data[i].Item);
                $scope.listSneakers[i].ItemMeta = result.Data[i].ListMeta;
                $scope.listSneakers[i].ItemDetail = result.Data[i].ListDetail;
            }
            console.log($scope.listSneakers);
        })
	}
]);