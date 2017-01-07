appControllers.controller('homeController', ['$scope', '$state',
	function($scope, $state) {
        $('body').addClass('loaded');
        
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
            $state.go("main.products");
        }
	 }
]);
