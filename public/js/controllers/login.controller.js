appControllers.controller('loginController', ['$scope', '$state', 'authService', 'cartsService',
	function($scope, $state, authService, cartsService) {
        $scope.create = true;
        
        $scope.email = "";
        $scope.password = "";
        
        
        $scope.setCreate = function(bool) {
            $scope.create = bool;
        }
        
        var checkState = function() {
            var user = Cookies.get("user") != null ? JSON.parse(Cookies.get("user")) : null;
            var fbUser = Cookies.get("fbUser") != null ? JSON.parse(Cookies.get("fbUser")) : null;
            if (user == null && fbUser != null) {
                console.log(fbUser);
                // create acc
                $('body').removeClass('loaded');
                authService.postAcc(fbUser.email, fbUser.displayName, "User", "No", "No", fbUser.uid, function(err, result) {
                    $('body').addClass('loaded');
                    if (err) {
                      return window.alert(err);
                    }
                    //window.alert(result.Message);

                    if (result.Code == 200) {
                        Cookies.set("user", result.Data.Account);
                        Cookies.remove("fbUser");
                        if (!$scope.create) {
                            Materialize.toast("Create New Account Succesfully!", 3000);
                        }
                        Materialize.toast("Login Succesfully!", 3000);
                        var cart = result.Data.Cart;
                        cart.CartDetail = result.Data.CartDetail;
                        cartsService.setCart(cart);
                        $state.go("main");
                    } else {
                        Materialize.toast("Cannot Create Account!", 3000);
                        window.alert(result.Message);
                    }
                })
            } else if (user != null) {
                console.log("checkSate");
//                if (!$scope.create) {
//                    Materialize.toast("Create New Account Succesfully!", 3000);
//                }
                Materialize.toast("Login Succesfully!", 3000);
                var cart = JSON.parse(Cookies.get('cart'));
                cartsService.setCart(cart);
                
                $state.go("main");
            }
        }
        
        $scope.login = function() {
            authService.login($scope.email, $scope.password, checkState, function(err){
                return window.alert(err);
            })
        }
        
        $scope.loginGG = function() {
            authService.loginWithGG(checkState, function(err){
                return window.alert(err);
            })
        }
        
        $scope.loginFB = function() {
            authService.loginWithFB(checkState, function(err){
                return window.alert(err);
            })
        }
        
        $scope.signUp = function() {
            authService.create($scope.email, $scope.password, checkState, function(err){
                return window.alert(err);
            })
        }
	}
]);