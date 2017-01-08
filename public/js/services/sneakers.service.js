appServices.factory('sneakersService', [
  function() {
     
    var serverUrl = 'http://testshoe.gear.host/';
    var apiAdd = 'Api/System/v1/AddItem';
    var apiGet = 'Api/Item/v1/SearchItemByType/Sneakers';

//    var service = {
//
//      getBookings : function(propertyId, startDate, endDate, callback){
//        console.log("Get bookings");
//        var promise = new Promise((fullfill, reject) => {
//          $.ajax({
//            url: serverUrl + "?" + apikey + "&" + propertyQuery + propertyId + "&" + startD + startDate + "&" + endD + endDate + "&" + trash,
//						method: 'GET',
//						contentType: "application/json",
//						success: fullfill,
//						error: reject
//          })
//        });
//        promise.then(
//					function(result) { callback(null, result) },
//					function(xhr, textStatus, errorThrown) { // xhr - XMLHttpRequest
//						callback(xhr.responseJSON, null)
//					}
//				);
//      },
//
//      addBooking : function(booking, callback) {
//        console.log("Add Booking");
//        var promise = new Promise((fullfill, reject) => {
//          $.ajax({
//            url: serverUrl + "?" + apikey,
//						method: 'POST',
//						contentType: "application/json",
//            data: JSON.stringify(booking),
//						success: fullfill,
//						error: reject
//          })
//        });
//        promise.then(
//					function(result) { callback(null, result) },
//					function(xhr, textStatus, errorThrown) { // xhr - XMLHttpRequest
//						callback(xhr.responseJSON, null)
//					}
//				);
//      }
//    }
      
    
    var listSneakers = [
        {id: "S01", name: "Y3 Qasa High", brand: "Nike", color: "Black", gender: "Female", status: "active", type: "sneakers", createdDate: "01/01/2017", category: "Casual", price: "3000000", itemMeta: [{id: "IM01", idItem: "S01", metaKey: "image url", metaValue: "http://cdn.niketalk.com/f/f5/f5bfac85_tumblr_n54pakhsWe1sj5dypo1_1280.jpeg"}], itemDetail: [{id: "ID01", idItem: "S01", size: "36", num: 10}, {id: "ID02", idItem: "S01", size: "37", num: 5}, {id: "ID03", idItem: "S01", size: "38", num: 8}, {id: "ID04", idItem: "S01", size: "39", num: 3}, {id: "ID05", idItem: "S01", size: "40", num: 12}, {id: "ID07", idItem: "S02", size: "41", num: 5}, {id: "ID08", idItem: "S02", size: "42", num: 8}, {id: "ID09", idItem: "S02", size: "43", num: 3}, {id: "ID10", idItem: "S02", size: "44", num: 12}]},
        {id: "S02", name: "UltraBoost", brand: "Adidas", color: "Blue", gender: "Male", status: "active", type: "sneakers", createdDate: "01/01/2017", category: "Gym", price: "3500000", itemMeta: [{id: "IM02", idItem: "S02", metaKey: "image url", metaValue: "http://images.solecollector.com/complex/image/upload/c_fill,q_95,w_1100/adidas-ultra-boost-og_vfaqi4.jpg"}], itemDetail: [{id: "ID01", idItem: "S01", size: "36", num: 10}, {id: "ID02", idItem: "S01", size: "37", num: 5}, {id: "ID03", idItem: "S01", size: "38", num: 8}, {id: "ID04", idItem: "S01", size: "39", num: 3}, {id: "ID06", idItem: "S02", size: "40", num: 10}, {id: "ID07", idItem: "S02", size: "41", num: 5}, {id: "ID08", idItem: "S02", size: "42", num: 8}, {id: "ID09", idItem: "S02", size: "43", num: 3}, {id: "ID10", idItem: "S02", size: "44", num: 12}]}
    ];
      
    var newSneakers = {id: "", name: "", brand: "", color: "", gender: "Both", status: "", type: "Sneakers", createdDate: "", category: "", price: "", itemMeta: [{metaKey: "image url", metaValue: ""}, {metaKey: "image url", metaValue: ""}, {metaKey: "image url", metaValue: ""}, {metaKey: "image url", metaValue: ""}], itemDetail: [{size: "36", num: 0}, {size: "37", num: 0}, {size: "38", num: 0}, {size: "39", num: 0}, {size: "40", num: 0}, {size: "41", num: 0}, {size: "42", num: 0}, {size: "43", num: 0}, {size: "44", num: 0}]};

    var service = {
        resetNewSneakers : function() {
            newSneakers = {ID: "", ProductName: "", Brand: "", Color: "", Gender: "Both", Status: "New", Type: "Sneakers", CreatedDate: "", Category: "", Price: 0, ItemMeta: [{MetaKey: "image url", MetaValue: ""}, {MetaKey: "image url", MetaValue: ""}, {MetaKey: "image url", MetaValue: ""}, {MetaKey: "image url", MetaValue: ""}], ItemDetail: [{Size: "36", NumberProduct: 0}, {Size: "37", NumberProduct: 0}, {Size: "38", NumberProduct: 0}, {Size: "39", NumberProduct: 0}, {Size: "40", NumberProduct: 0}, {Size: "41", NumberProduct: 0}, {Size: "42", NumberProduct: 0}, {Size: "43", NumberProduct: 0}, {Size: "44", NumberProduct: 0}]};
            return newSneakers;
        },
        
        checkSneakers : function(sneakers1){
            var sneakers = JSON.parse(JSON.stringify(sneakers1));
            console.log(sneakers);
            for (var i = 0; i < sneakers.ItemDetail.length; i++) {
                if (parseInt(sneakers.ItemDetail[i].NumberProduct) <= 0) {
                    sneakers.ItemDetail.splice(i, 1);
                    i--;
                }
            }
            console.log("pass1");
            for (var i = 0; i < sneakers.ItemMeta.length; i++) {
                if (sneakers.ItemMeta[i].MetaValue == null || sneakers.ItemMeta[i].MetaValue.trim().length == 0) {
                    sneakers.ItemMeta.splice(i, 1);
                    i--;
                }
            }
            console.log("pass2");
            if (sneakers.ProductName == null || sneakers.ProductName.trim().length == 0 || sneakers.Brand == null || sneakers.Brand.trim().length == 0 || sneakers.Color == null || sneakers.Color.trim().length == 0 || sneakers.Category == null || sneakers.Category.trim().length == 0 || sneakers.Price <= 0 || sneakers.ItemDetail.length == 0 || sneakers.ItemMeta.length == 0) {
                return false;
            }
            console.log("true");
            return true;
        },
        
        addNewSneakers : function(sneakers, callback) {
            listSneakers.push(sneakers);
            
            var promise = new Promise((fullfill, reject) => {
                $.ajax({
                    url: serverUrl + apiAdd,
                    method: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify(sneakers),
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
        
        getAllSneakers : function(callback) {
            var promise = new Promise((fullfill, reject) => {
                console.log(serverUrl + apiGet);
                $.ajax({
                    url: serverUrl + apiGet,
                    method: 'GET',
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
        getNewSneakers : function() {
            return service.resetNewSneakers();
        }
    }
    
    return service;
  }
])
