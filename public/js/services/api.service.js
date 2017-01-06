appServices.factory('apiService', ['$http', 
	function($http) {

		var apiLogic = {
			
			getSelf: function(callback) {

				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: '/api/users/self',
						method: 'GET',
						success: fullfill,
						error: reject
					})
				});

				promise.then(
					function(result) { callback(null, result) },
					function(xhr, textStatus, errorThrown) { // xhr - XMLHttpRequest 
						callback(xhr, null);
					}
				);
			}
		};

		return apiLogic;
	}
]);