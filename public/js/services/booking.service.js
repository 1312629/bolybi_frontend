appServices.factory('bookingService', [
  function() {
    var serverUrl = 'http://roomsy-booking.herokuapp.com/api/bookings';
    var propertyQuery = 'property=';
    var trash = 'page=0&limit=0';
    var startD = 'startDate=';
    var endD = 'endDate=';
    var apikey = 'apikey=roomsy-booking';

    var service = {

      getBookings : function(propertyId, startDate, endDate, callback){
        console.log("Get bookings");
        var promise = new Promise((fullfill, reject) => {
          $.ajax({
            url: serverUrl + "?" + apikey + "&" + propertyQuery + propertyId + "&" + startD + startDate + "&" + endD + endDate + "&" + trash,
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

      addBooking : function(booking, callback) {
        console.log("Add Booking");
        var promise = new Promise((fullfill, reject) => {
          $.ajax({
            url: serverUrl + "?" + apikey,
						method: 'POST',
						contentType: "application/json",
            data: JSON.stringify(booking),
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
