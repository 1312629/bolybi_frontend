appControllers.controller('loginController', ['$scope', '$state', 'authService',
	function($scope, $state, authService) {
        $scope.create = true;
        
        $scope.email = "";
        $scope.password = "";
        
        
        $scope.setCreate = function(bool) {
            $scope.create = bool;
        }
        
        var checkState = function() {
            var user = Cookies.get("user") != null ? JSON.parse(Cookies.get("user")) : null;
            if (user == null) {
                return;
            } else {
                console.log("checkSate");
                if (!$scope.create) {
                    Materialize.toast("Create New Account Succesfully!", 3000);
                }
                Materialize.toast("Login Succesfully!", 3000);
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