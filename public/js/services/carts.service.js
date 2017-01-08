appServices.factory('cartsService', [
  function() {
      //var cart = {id: "C001", customer: {}, createdDate: "", status: "", cartDetail: [], totalPrice: 0};
      var cart = null;
      
      var serverUrl = 'http://testshoe.gear.host/';
      var apiGet = 'Api/Cart/v1/GetCartById/';
      var apiUpdate = 'Api/Cart/v1/UpdateCart/';
      
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
                  console.log('cart null');
                  if (Cookies.get('cart') == null) {
                      return;
                  }
                  cart = JSON.parse(Cookies.get('cart'));
                  console.log(cart);
                  service.getCartApi(function(err, result2){
                      console.log(result2);
                      if (err) { return window.alert(err)}
                      if (result2.Code != 200) {
                          return window.alert(result2.Message);
                      }
                      cart = result2.Data.Cart;
                      cart.CartDetail = result2.Data.ListCartDetail;
                      updatePrice();
                      return cart;
                  })
              } else {
                  return cart;
              }
          },
          
          setCart : function(car) {
              if(car.TotalPrice === null) {
                  car.TotalPrice = 0;
              }
              cart = car;
              updatePrice();
          },
          
          getInitCartDetail : function() {
              var cartDetail = {ID: -1, ID_Cart: cart.ID, Item: {}, Size: "", NumberProduct: 0};
              return cartDetail;
          },
          
          isValidCartDetail : function(cDetail) {
              if (cDetail.Item != null && parseInt(cDetail.NumberProduct) > 0 && cDetail.Size != null){
                  console.log("valid");
                  return true;
              }
              console.log("no valid");
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
              var backUp = JSON.parse(JSON.stringify(cart));
              console.log(cDetail);
              if (service.isValidCartDetail(cDetail)) {
                  var index = service.checkCartDetailInCart(cDetail);
                  console.log(index);
                  if (index === null) {
                      cDetail.Price = cDetail.Item.Price;
                      cDetail.ID_Item = cDetail.Item.ID;
                      cart.CartDetail.push(cDetail);
                  } else {
                      cart.CartDetail[index].NumberProduct = parseInt(cart.CartDetail[index].NumberProduct) +  parseInt(cDetail.NumberProduct);
                  }
                  cart.TotalPrice = parseInt(cart.TotalPrice) + (parseInt(cDetail.Price) * parseInt(cDetail.NumberProduct));
                  service.updateCart(function(err, result) {
                      if (err) { return window.alert(err)}
                      
                      if (result.Code != 200) {
                          window.alert(result.Message);
                          cart = backUp;
                      } else {
                          Materialize.toast("Add new Item to Cart!", 3000);
                          service.getCartApi(function(err, result2){
                               if (err) { return window.alert(err)}
                              if (result2.Code != 200) {
                                  return window.alert(result2.Message);
                              }
                              cart = result2.Data.Cart;
                              cart.CartDetail = result2.Data.ListCartDetail;
                              updatePrice();
                          })
                      }
                  })
              }
          },
          
          /* modify cart api */
          updateCart : function(callback) {
            console.log("Update ");
            console.log(cart);
            var requestData = {};
            requestData.Cart = cart;
            requestData.ListCartDetail = cart.CartDetail;
            console.log(requestData.ListCartDetail);
            var promise = new Promise((fullfill, reject) => {
                $.ajax({
                    url: serverUrl + apiUpdate + cart.ID,
                    method: 'PUT',
                    contentType: "application/json",
                    data: JSON.stringify(requestData),
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
          
          getCartApi : function(callback) {
              console.log(serverUrl + apiGet + cart.ID);
            var promise = new Promise((fullfill, reject) => {
                $.ajax({
                    url: serverUrl + apiGet + cart.ID,
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
      