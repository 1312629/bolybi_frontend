appControllers.controller('productsController', ['$scope', '$state', 'productsService',
	function($scope, $state, productsService) {
        
        $('body').removeClass('loaded');
        
        /* create filters */
        $scope.filters = {};
        if (Cookies.get("type") != null){
            $scope.filters.Type = Cookies.get("type");
        }
        if (Cookies.get("cate") != null) {
            $scope.filters.Category = Cookies.get("cate");
        }
        if (Cookies.get("gender") != null) {
            $scope.filters.Gender = Cookies.get("gender");
        }
        
        var isInList = function(item, list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].val == item) {
                    return true;
                }
            }
            return false;
        }
        
        var createListCondition = function() {
            /* CREATE LIST COLORS FOR SEARCH */
            $scope.colors = [{name: 'No Select', val: ''}];
            var tmp = {};
            for (var i = 0; i < $scope.listProducts.length; i++) {
                if (!isInList($scope.listProducts[i].Color, $scope.colors)) {
                    tmp = {name: $scope.listProducts[i].Color, val: $scope.listProducts[i].Color};
                    $scope.colors.push(tmp);
                }
            }

            /* CREATE LIST BRAND FOR SEARCH */
            $scope.brands = [{name: 'No Select', val: ''}];
            var tmp = {};
            for (var i = 0; i < $scope.listProducts.length; i++) {
                if (!isInList($scope.listProducts[i].Brand, $scope.brands)) {
                    tmp = {name: $scope.listProducts[i].Brand, val: $scope.listProducts[i].Brand};
                    $scope.brands.push(tmp);
                }
            }

            /* CREATE LIST GENDER FOR SEARCH */
            $scope.genders = [{name: 'No Select', val: ''}, {name: 'Male', val: 'Male'}, {name: 'Female', val: 'Female'}, {name: 'Both', val: 'Both'}];

            /* CREATE LIST CATEGORY FOR SEARCH */
            $scope.categories = [{name: 'No Select', val: ''}, {name: 'Running', val: 'Running'}, {name: 'Casual', val: 'Casual'}, {name: 'Gym', val: 'Gym'}, {name: 'Basketball', val: 'Basketball'}, {name: 'Soccer', val: 'Soccer'}];

            /* CREATE LIST GENDER FOR SEARCH */
            $scope.types = [{name: 'No Select', val: ''}, {name: 'Sneakers', val: 'sneakers'}, {name: 'Accessories', val: 'accessories'}];
            
            $scope.$apply();
        }
        
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
            $scope.$apply();
            console.log($scope.listProducts);
            createListCondition();
            $('body').addClass('loaded');
        })
        
        $scope.showDetail = function (index){
            Cookies.set("idShowDetail", index);
            console.log(index);
            $state.go("main.viewProduct");
        }
    }
]);