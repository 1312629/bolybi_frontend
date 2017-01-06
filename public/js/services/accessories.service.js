appServices.factory('accessoriesService', [
  function() {
      
    var serverUrl = 'http://testshoe.gear.host/';
    var apiAdd = 'Api/System/v1/AddItem';
    var apiGet = 'Api/Item/v1/SearchItemByType/Accessories';
      
    
    var listAccessories = [
        {id: "A01", name: "Adidas socks", brand: "Adidas", color: "Colorful", gender: "Both", status: "active", type: "accessories", createdDate: "01/01/2017", category: "accessories", price: "30000", itemMeta: [{id: "IM01", idItem: "S01", metaKey: "image url", metaValue: "http://demandware.edgesuite.net/sits_pod20-adidas/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw8ba43d4b/zoom/H77464_01_standard.jpg?sw=230&sfrm=jpg"}], itemDetail: [{id: "ID01", idItem: "A01", size: "free", num: 10}]},
        {id: "A02", name: "Keychains", brand: "Adidas", color: "Colorful", gender: "Both", status: "active", type: "accessories", createdDate: "01/01/2017", category: "accessories", price: "15000", itemMeta: [{id: "IM02", idItem: "A02", metaKey: "image url", metaValue: "https://fb-s-c-a.akamaihd.net/h-ak-xtp1/v/t1.0-0/p180x540/13321772_617733075062259_1833845713908554497_n.jpg?oh=57155bc5fbb0249a22bcb3940e5974d3&oe=58D74950&__gda__=1492166909_a8347be80f34bd340affbd1e266a52b5"}], itemDetail: [{id: "ID03", idItem: "A02", size: "free", num: 15}]}
    ]

    var service = {
        
        checkAccessories : function(acces1){
            var acces = JSON.parse(JSON.stringify(acces1));
            for (var i = 0; i < acces.ItemDetail.length; i++) {
                if (parseInt(acces.ItemDetail[i].NumberProduct) <= 0) {
                    acces.ItemDetail.splice(i, 1);
                    i--;
                }
            }
            console.log("pass1");
            for (var i = 0; i < acces.ItemMeta.length; i++) {
                if (acces.ItemMeta[i].MetaValue == null || acces.ItemMeta[i].MetaValue.trim().length == 0) {
                    acces.ItemMeta.splice(i, 1);
                    i--;
                }
            }
            console.log("pass2");
            if (acces.ProductName == null || acces.ProductName.trim().length == 0 || acces.Brand == null || acces.Brand.trim().length == 0 || acces.Color == null || acces.Color.trim().length == 0 || acces.Category == null || acces.Category.trim().length == 0 || acces.Price <= 0 || acces.ItemDetail.length == 0 || acces.ItemMeta.length == 0) {
                return false;
            }
            console.log("true");
            return true;
        },
        
        getNewAccessories : function() {
            var newAccessories = {ID: "", ProductName: "", Brand: "", Color: "", Gender: "Both", Status: "New", Type: "Accessories", CreatedDate: "", Category: "Accessories", Price: 0, ItemMeta: [{MetaKey: "image url", MetaValue: ""}, {MetaKey: "image url", MetaValue: ""}, {MetaKey: "image url", MetaValue: ""}, {MetaKey: "image url", MetaValue: ""}], ItemDetail: [{Size: "Free", NumberProduct: 0}]};
            return newAccessories;
        },
        
        getAllAccessories : function(callback) {
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
        },
        
        addNewAccessories : function(acces, callback) {
            var promise = new Promise((fullfill, reject) => {
                $.ajax({
                    url: serverUrl + apiAdd,
                    method: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify(acces),
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
