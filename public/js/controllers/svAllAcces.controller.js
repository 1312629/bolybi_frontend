appControllers.controller('svAllAccesController', ['$scope', '$state', 'accessoriesService',
	function($scope, $state, accessoriesService) {
        $('body').removeClass('loaded');
        accessoriesService.getAllAccessories(function(err, result){
            if (err) {return window.alert(err);}
            if (result.Code != 200) {
                window.alert(result.Message);
                return;
            }
            $scope.listAccessories = [];
            for (var i = 0; i < result.Data.length; i++) {
                $scope.listAccessories.push(result.Data[i].Item);
                $scope.listAccessories[i].ItemMeta = result.Data[i].ListMeta;
                $scope.listAccessories[i].ItemDetail = result.Data[i].ListDetail;
            }
            console.log($scope.listAccessories);
            $('body').addClass('loaded');
            $scope.$apply();
        })
	}
]);