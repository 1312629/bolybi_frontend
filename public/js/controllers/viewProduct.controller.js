appControllers.controller('viewProductController', ['$scope', '$state', '$timeout', 'productsService', 'cartsService',
	function($scope, $state, $timeout, productsService, cartsService) {
        
        if (Cookies.get("idShowDetail") == null) {
            $state.go("main.products");
        }
        
        var index = parseInt(Cookies.get("idShowDetail"));
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
            }
            $scope.thisProduct = $scope.listProducts[index];
            
            $scope.cartDetail = cartsService.getInitCartDetail();
            $scope.cartDetail.item = $scope.thisProduct;
            $scope.cartDetail.num = 0;
            $scope.cartDetail.size = $scope.thisProduct.ItemDetail[0].Size;
            
            $scope.$apply();
            console.log($scope.thisProduct);
            
            $timeout(function(){
                $('select').material_select();
                $('.caret').html("");
                $('.materialboxed').materialbox();
            }, 500);
            $('body').addClass('loaded');
        })
        
        $scope.selectedIndexImg = 0;
        $scope.selectedIndexSize = "0";
        window.sc = $scope.selectedIndexImg;
        
//        $scope.cartDetail = cartsService.getInitCartDetail();
//        $scope.cartDetail.item = $scope.thisProduct;
//        $scope.cartDetail.num = 0;
//        $scope.cartDetail.size = $scope.thisProduct.ItemDetail[0].Size;
        
        $scope.changeImg = function(index) {
            $scope.selectedIndexImg = index;
        }
        
        $scope.addToCart = function() {
            if (Cookies.get("user") == null) {
                window.alert("Please login first to use Cart!");
                $state.go("login");
            }
            cartsService.addCartDetailIntoCart($scope.cartDetail);
        }
	}
]);