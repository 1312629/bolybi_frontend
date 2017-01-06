appServices.factory('cartsService', [
  function() {
      var cart = {id: "C001", customer: {}, createdDate: "", status: "", cartDetail: [], totalPrice: 0};
      
      var service = {
          eraseCart : function() {
              cart = {id: "C001", customer: {}, createdDate: "", status: "", cartDetail: [], totalPrice: 0};
              return cart;
          },
          
          getCart : function() {
              return cart;
          },
          
          setCart : function(car) {
            cart = car;  
          },
          
          getInitCartDetail : function() {
              var cartDetail = {id: "", idCart: cart.id, item: {}, size: "", num: 0};
              return cartDetail;
          },
          
          isValidCartDetail : function(cDetail) {
              if (cDetail.item != null && parseInt(cDetail.num) > 0 && cDetail.size != null){
                  return true;
              }
              return false;
          },
          
          /* check if cart detail in cart, return index */
          checkCartDetailInCart : function(cDetail){
              for (var i = 0; i < cart.cartDetail.length; i++) {
                  if (cDetail.item.id == cart.cartDetail[i].item.id && cDetail.size == cart.cartDetail[i].size) {
                      return i;
                  }
              }
              return null;
          },
          
          /* add cart detail into cart */
          addCartDetailIntoCart : function(cDetail) {
              console.log(cDetail);
              if (service.isValidCartDetail(cDetail)) {
                  var index = service.checkCartDetailInCart(cDetail);
                  console.log(index);
                  if (index === null) {
                      cart.cartDetail.push(cDetail);
                  } else {
                      cart.cartDetail[index].num = parseInt(cart.cartDetail[index].num) +  parseInt(cDetail.num);
                  }
                  cart.totalPrice = parseInt(cart.totalPrice) + (parseInt(cDetail.item.price) * parseInt(cDetail.num));
                  Materialize.toast("Add new Item to Cart!", 3000);
                  return cart;
              }
          },
          
          /* remove cart detail out of cart */
          removeCartDetailFromCart : function(index) {
              if (index >= 0 && index < cart.cartDetail.length) {
                  cart.cartDetail.splice(index, 1);
              }
              return cart;
          }
      };
      
      return service;
  }
])
      