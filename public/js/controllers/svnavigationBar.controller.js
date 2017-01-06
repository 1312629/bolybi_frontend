appControllers.controller('svnavigationBarController', ['$scope', '$state', 'authService',
	function($scope, $state, authService) {
        
        /* Check login */
        if (Cookies.get("user") != null) {
            $scope.user = JSON.parse(Cookies.get("user"));
            if ($scope.user.photoURL === null) {
                $scope.user.photoURL = "../../images/avatar_default.png";
            }
        } else {
            $state.go("login");
        }
        
        /* logout button */
        $scope.logout = function() {
            authService.logout(function() {
                Materialize.toast("Logout!", 3000);
                $state.go('main');
            }, function(err){
                return window.alert(err);
            })
        };
        
        angular.element('.hiddendiv').html("");
        
	}
]);