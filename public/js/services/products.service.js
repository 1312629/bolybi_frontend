appServices.factory('productsService', [
    function() {
     
        var serverUrl = 'http://testshoe.gear.host/';
        var apiGet = 'Api/System/v1/GetAllItem';
      
        var service = {
            getAllProducts : function(callback) {
                var promise = new Promise((fullfill, reject) => {
                    $.ajax({
                        url: serverUrl + apiGet,
                        method: 'GET',
                        contentType: "application/json",
                        success: fullfill,
                        error: reject
                    })
                });
                promise.then(
                    function(result) { callback(null, result) },
                    function(xhr, textStatus, errorThrown) { // xhr - XMLHttpRequest
                        callback(xhr.responseJSON, null)
                    }
                );
            }
        }
        
        return service;
    }
])