appControllers.controller('svnavigationBarController', ['$scope', '$state', 'authService',
	function($scope, $state, authService) {
        
        /* Check login */
        if (Cookies.get("user") != null) {
            $scope.user = JSON.parse(Cookies.get("user"));
            if ($scope.user.Type == "User") {
                $state.go('main');
            }
            if ($scope.user.photoURL == null) {
                $scope.user.photoURL = "../../images/avatar_default.png";
            }
            var splitString = $scope.user.CreatedDate.split("T");
            $scope.user.CreatedDate = new Date($scope.user.CreatedDate);
            $scope.user.CreatedDate = $scope.user.CreatedDate.toLocaleDateString();
            console.log($scope.user);
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