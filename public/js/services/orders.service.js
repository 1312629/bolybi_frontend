appServices.factory('ordersService', [
    function() {
      
        var serverUrl = 'http://testshoe.gear.host/';
        var apiAdd = 'Api/Order/v1/AddOrder';
        var apiGet = 'Api/Order/v1/GetOrder/';
        var apiGetAll = 'Api/Order/v1/GetAllOrder';
        var apiUpdate = 'Api/Order/v1/UpdateOrder/'
      
        var listOrders = [];

        var service = {
//            getListOrders : function() {
//                return listOrders;
//            },
            addToListOrders: function(order) {
                listOrders.push(order);
            },
            getInitOrder : function() {
                var order = {ID_Customer: -1, CustomerName: "", Address: "", Phone: "", Status: "New", EndDate: "", Discount: 0, Note: "", TotalPrice: 0, OrderDetail: []};
                return order;
            },

            createOrderDetail : function(cartDetail){
                var orDetail = {ID_Item: cartDetail.Item.ID, Item: cartDetail.Item, Size: cartDetail.Size, NumberProduct: cartDetail.NumberProduct, Price: cartDetail.Item.Price};
                return orDetail;
            },
            
            getListOrders : function(callback) {
                var promise = new Promise((fullfill, reject) => {
                    $.ajax({
                        url: serverUrl + apiGetAll,
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
            },
            
            updateOrder : function(id, data, callback) {
                var promise = new Promise((fullfill, reject) => {
                    $.ajax({
                        url: serverUrl + apiUpdate + id,
                        method: 'PUT',
                        contentType: "application/json",
                        data: JSON.stringify(data),
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
            },
            
            addNewOrder : function(order, callback) {
                var promise = new Promise((fullfill, reject) => {
                    $.ajax({
                        url: serverUrl + apiAdd,
                        method: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify(order),
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
            },

            createOrder : function(cart){
                var order = {ID_Customer: -1, CustomerName: "", Address: "", Phone: "", Status: "New", EndDate: "", Discount: 0, Note: "tmp", TotalPrice: cart.TotalPrice, OrderDetail: []};
                for (var i = 0; i < cart.CartDetail.length; i++) {
                    order.OrderDetail.push(service.createOrderDetail(cart.CartDetail[i]));
                }
                return order;
            }
        }

        return service;
    }
])
