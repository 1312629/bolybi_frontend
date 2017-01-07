appControllers.controller('mainController', ['$scope', '$state', 'authService', 'cartsService', 'ordersService',
	function($scope, $state, authService, cartsService, ordersService) {
        angular.element(document).ready(function(){
            angular.element('.parallax').parallax();
            angular.element('.modal').modal();
        })
        
        $scope.user = Cookies.get("user") != null ? JSON.parse(Cookies.get("user")) : null;
        console.log($scope.user);
        $scope.isOrder = false;
        
        $scope.listCate = [{name: "Running"}, {name: "Casual"}, {name: "Gym"}, {name: "Basketball"}, {name: "Soccer"}];
        
        if ($scope.user === null) {
            $scope.displayName = "Login";
            $scope.isLogin = false;
        } else {
            $scope.displayName = $scope.user.FullName;
            $scope.isLogin = true;
        }
        
        $scope.login = function() {
            if ($scope.user === null) {
                $state.go("login");
            }
        };
        
        $scope.logout = function() {
            authService.logout(function() {
                Materialize.toast("Logout!", 3000);
                $state.reload();
            }, function(err){
                return window.alert(err);
            })
        };
        
        $scope.cart = cartsService.getCart();
        
        $scope.btnCartClick = function() {
            angular.element('#modalCart').modal('open');
            $scope.cart = cartsService.getCart();
        };
        
        $scope.addFilters = function(type, cate, gender){
            Cookies.remove('type');
            Cookies.remove('cate');
            Cookies.remove('gender');
            if (type != null) {
                Cookies.set('type', type);
            }
            if (cate != null) {
                Cookies.set('cate', cate);
            }
            if (gender != null) {
                Cookies.set('gender', gender);
            }
            $state.reload();
            $state.go("main.products");
        }
        
        $scope.btnRemoveClick = function(index){
            $scope.cart = cartsService.removeCartDetailFromCart(index);
            Materialize.toast("Removed Item from Cart!", 3000);
        }
        
        $scope.btnOrderClick = function(){
            if ($scope.cart.CartDetail.length > 0) {
                $scope.isOrder = true;
                $scope.order = ordersService.createOrder($scope.cart);
                $scope.order.customer = $scope.user;
            } else {
                Materialize.toast("The cart is empty! Cannot create new Order!", 3000);
            }    
        }
        
        $scope.btnSubmitClick = function() {
            if ($scope.order.phone == null || $scope.order.address == null || $scope.order.receiver == null) {
                window.alert("Please fill all required input!");
            } else {
                ordersService.addToListOrders($scope.order);
                Materialize.toast("Added new Order!", 5000);
                $scope.order = ordersService.getInitOrder();
                $scope.isOrder = false;
            }
        }
        
        $scope.emptyCart = function() {
            var r = confirm("Are you sure?");
            if (r == true) {
                $scope.cart = cartsService.eraseCart();
            }
        }
	}
]);