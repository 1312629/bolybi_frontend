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
            if ($scope.user.Type == "Admin") {
                $state.go('server');
            }
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
                Cookies.remove('cart');
                cartsService.setCart(null);
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
            cartsService.removeCartDetailFromCart(index, function(err, result) {
                if (err) {return window.alert(err);}
                if (result.Code != 200) {
                    return window.alert(result.Message);
                }
                Materialize.toast("Removed Item from Cart!", 3000);
                cartsService.setCart(null);
                $scope.cart = cartsService.getCart();
                $('#modalCart').modal('close');
            });
        }
        
        $scope.btnOrderClick = function(){
            if ($scope.cart.CartDetail.length > 0) {
                $scope.isOrder = true;
                $scope.order = ordersService.createOrder($scope.cart);
                $scope.order.Customer = $scope.user;
                $scope.order.ID_Customer = $scope.user.ID;
            } else {
                Materialize.toast("The cart is empty! Cannot create new Order!", 3000);
            }    
        }
        
        $scope.btnSubmitClick = function() {
            if ($scope.order.Phone == null || $scope.order.Address == null || $scope.order.CustomerName == null) {
                window.alert("Please fill all required input!");
            } else {
                var request = {};
                request.Order = $scope.order;
                request.ListOrderDetail = $scope.order.OrderDetail;
                console.log(JSON.stringify(request));
                ordersService.addNewOrder(request, function(err, result) {
                    if (err) {return window.alert(err);}
                    
                    if (result.Code != 200) {
                        window.alert(result.Message);
                        Materialize.toast("Cannot Create Order!", 5000);
                        $scope.isOrder = false;
                    } else {
                        Materialize.toast("Added new Order!", 5000);
                        $scope.order = ordersService.getInitOrder();
                        $scope.isOrder = false;
                    }
                });
            }
        }
        
        $scope.emptyCart = function() {
            var r = confirm("Are you sure?");
            if (r == true) {
                if ($scope.cart.CartDetail.length > 0) {
                    cartsService.eraseCart(function(err, result) {
                        if (err) { return window.alert(err)}
                        if (result.Code != 200) {
                            window.alert(result.Message);
                        } else {
                            Materialize.toast("Erased All Item In Cart!", 3000);
                            cartsService.setCart(null);
                            $scope.cart = cartsService.getCart();
                        }
                    });
                } else {
                    Materialize.toast("Erased All Item In Cart!", 3000);
                }
            }
        }
	}
]);