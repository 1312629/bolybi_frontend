appServices.factory('cartsService', [
  function() {
      //var cart = {id: "C001", customer: {}, createdDate: "", status: "", cartDetail: [], totalPrice: 0};
      var cart = null;
      
      var updatePrice = function() {
          cart.TotalPrice = 0;
          for (var i = 0; i < cart.CartDetail.length; i++) {
              cart.TotalPrice = parseInt(cart.TotalPrice) + (parseInt(cart.CartDetail[i].Item.Price) * parseInt(cart.CartDetail[i].Item.NumberProduct));
          }
      }
      
      var service = {
          eraseCart : function() {
              //cart = {id: "C001", customer: {}, createdDate: "", status: "", cartDetail: [], totalPrice: 0};
              cart.CartDetail = [];
              cart.TotalPrice = 0;
              return cart;
          },
          
          getCart : function() {
              if (cart == null) {
                  cart = JSON.parse(Cookies.get('cart'));
              }
              updatePrice();
              return cart;
          },
          
          setCart : function(car) {
              if(car.TotalPrice === null) {
                  car.TotalPrice = 0;
              }
              cart = car;
              updatePrice();
          },
          
          getInitCartDetail : function() {
              var cartDetail = {ID: "", IdCart: cart.ID, Item: {}, Size: "", NumberProduct: 0};
              return cartDetail;
          },
          
          isValidCartDetail : function(cDetail) {
              if (cDetail.Item != null && parseInt(cDetail.NumberProduct) > 0 && cDetail.Size != null){
                  return true;
              }
              return false;
          },
          
          /* check if cart detail in cart, return index */
          checkCartDetailInCart : function(cDetail){
              for (var i = 0; i < cart.CartDetail.length; i++) {
                  if (cDetail.Item.ID == cart.CartDetail[i].Item.ID && cDetail.Size == cart.CartDetail[i].Size) {
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
                      cart.CartDetail.push(cDetail);
                  } else {
                      cart.CartDetail[index].num = parseInt(cart.cartDetail[index].num) +  parseInt(cDetail.num);
                  }
                  cart.TotalPrice = parseInt(cart.totalPrice) + (parseInt(cDetail.item.price) * parseInt(cDetail.num));
                  Materialize.toast("Add new Item to Cart!", 3000);
                  return cart;
              }
          },
          
          /* remove cart detail out of cart */
          removeCartDetailFromCart : function(index) {
              if (index >= 0 && index < cart.CartDetail.length) {
                  cart.CartDetail.splice(index, 1);
              }
              return cart;
          }
      };
      
      return service;
  }
])
      