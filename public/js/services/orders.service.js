appServices.factory('ordersService', [
  function() {
      
      var listOrders = [];

    var service = {
        getListOrders : function() {
            return listOrders;
        },
        addToListOrders: function(order) {
            listOrders.push(order);
        },
        getInitOrder : function() {
            var order = {id: "O001", customer: {}, receiverName: "", address: "", phone: "", status: "Pending", createdDate: (new Date()).toLocaleString, endDate: "", discount: 0, note: "", totalPrice: "", orderDetail: []};
            return order;
        },
        
        createOrderDetail : function(cartDetail){
            var orDetail = {id: cartDetail.id, idOrder: "", item: cartDetail.item, size: cartDetail.size, num: cartDetail.num, price: cartDetail.item.price};
            return orDetail;
        },
        
        createOrder : function(cart){
            var order = {id: "O001", customer: {}, receiverName: "", address: "", phone: "", status: "Pending", createdDate: (new Date()).toLocaleString, endDate: "", discount: 0, note: "", totalPrice: cart.totalPrice, orderDetail: []};
            for (var i = 0; i < cart.cartDetail.length; i++) {
                order.orderDetail.push(service.createOrderDetail(cart.cartDetail[i]));
                order.orderDetail[i].idOrder = order.id;
            }
            return order;
        }
    }

    return service;
  }
])
