appServices.factory('customersService', [
  function() {
    var serverUrl = "http://roomsy-customer.herokuapp.com/api/customers";
    var propertyQuery = 'property=';
    var trash = 'isFull=true&skip=0&limit=0';
    var startD = 'startDate=';
    var endD = 'endDate=';
    var name = 'name=';

    var service = {

      getCustomers : function(propertyId, keywords, callback){
        console.log("Get Customers");
        var promise = new Promise((fullfill, reject) => {
          $.ajax({
            url: serverUrl + "?" + propertyQuery + propertyId + "&" + name + keywords + "&" + trash,
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

      deleteCustomer : function(customerId, callback){
        console.log("Delete Customer");
        var promise = new Promise((fullfill, reject) => {
          $.ajax({
            url: serverUrl + "/" + customerId,
						method: 'DELETE',
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

      addCustomer : function(propertyId, customer, callback){
        console.log("Add Customer");
        var promise = new Promise((fullfill, reject) => {
          var xsrf = $.param({property: propertyId, name: customer.name, email: customer.email, phone: customer.phone});
          $.ajax({
            url: serverUrl,
            method: 'POST',
    		    data: xsrf,
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

      updateCustomer : function(customer, callback){
        console.log("Update Customer");
        var promise = new Promise((fullfill, reject) => {
          var xsrf = $.param({name: customer.name, email: customer.email, phone: customer.phone});
          $.ajax({
            url: serverUrl + "/" + customer._id,
            method: 'PUT',
    		    data: xsrf,
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

      getCustomer : function(customerId, callback){
        console.log("Get Customer");
        var promise = new Promise((fullfill, reject) => {
          $.ajax({
            url: serverUrl + "/" + customerId,
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
