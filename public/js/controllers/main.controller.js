appControllers.controller('mainController', ['$scope', '$state', 'authService', 'cartsService', 'ordersService', 'productsService',
	function($scope, $state, authService, cartsService, ordersService, productsService) {
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
        
        var findItemById = function(id, list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].ID == id) {
                    return list[i];
                }
            }
        }
        
        $scope.listOrders = [];
        var openOrderModal = function() {
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
                    $scope.listProducts[i].index = i;
                }
                ordersService.getListOrders(function(err, result) {
                    console.log(result);
                    if(err) {return window.alert(err)}
                    if (result.Code != 200) {
                        return window.alert(result.Message);
                    }
                    $scope.listOrders = [];
                    for(var i = 0; i < result.Data.length; i++) {
                        if (result.Data[i].Order.ID_Customer == $scope.user.ID) {
                            $scope.listOrders.push(result.Data[i].Order);
                            $scope.listOrders[$scope.listOrders.length - 1].CreatedDate = (new Date($scope.listOrders[$scope.listOrders.length - 1].CreatedDate)).toLocaleDateString();
                            $scope.listOrders[$scope.listOrders.length - 1].EndDate = (new Date($scope.listOrders[$scope.listOrders.length - 1].EndDate)).toLocaleDateString();
                            $scope.listOrders[$scope.listOrders.length - 1].OrderDetail = result.Data[i].ListOrderDetail;
                            for (var j = 0; j < $scope.listOrders[$scope.listOrders.length - 1].OrderDetail.length; j++) {
                                $scope.listOrders[$scope.listOrders.length - 1].OrderDetail[j].Item = findItemById($scope.listOrders[$scope.listOrders.length - 1].OrderDetail[j].ID_Item, $scope.listProducts);
                            }
                        }
                    }
                    $scope.$apply();
                    console.log($scope.listOrders);
                    $('body').addClass('loaded');
                    $('#modalOrder').modal('open');
                })
            })
        }
        
        $scope.login = function() {
            if ($scope.user === null) {
                $state.go("login");
            } else {
                openOrderModal();
                //$('#modalOrder').modal('open');
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
                        $('#modalCart').modal('close');
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