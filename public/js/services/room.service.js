appServices.factory('roomServices', [
  function() {
    var serverUrl = 'http://roomsy-rooms.herokuapp.com/api/';
    var roomTypeUrl = 'roomtypes';
    var roomUrl = 'rooms';
    var propertyQuery = 'propertyId=';
    var apikey = 'apikey=roomsy-rooms';
    var clean = 'CLEAN';

    var service = {

      getRooms: function(propertyId, callback) {
				console.log("Get Rooms");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomUrl + "?" + apikey + "&" + propertyQuery + propertyId,
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

      getRoom: function(roomId, callback) {
        console.log("Get Room");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomUrl + "/" + roomId + "?" + apikey,
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

      getRoomTypes: function(propertyId, callback) {
				console.log("Get Room Types");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomTypeUrl + "?" + apikey + "&" + propertyQuery + propertyId,
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

      addRoomType: function(newRoomType, callback) {
				console.log("Add Room Type");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomTypeUrl + "?" + apikey,
						method: 'POST',
						contentType: "application/json",
            data: JSON.stringify(newRoomType),
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

      updateRoomType: function(newRoomType, callback) {
				console.log("Update Room Type");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomTypeUrl + "/" + newRoomType._id + "?" + apikey,
						method: 'PUT',
						contentType: "application/json",
            data: JSON.stringify(newRoomType),
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

      deleteRoomtype: function(roomTypeId, callback) {
				console.log("Delete Room Type");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomTypeUrl + "/" + roomTypeId + "?" + apikey,
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

      getRoomtype: function(roomTypeId, callback) {
				console.log("get Room Type");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomTypeUrl + "/" + roomTypeId + "?" + apikey,
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

      updateRoom: function(newRoom, callback) {
				console.log("Update Room");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomUrl + "/" + newRoom._id + "?" + apikey,
						method: 'PUT',
						contentType: "application/json",
            data: JSON.stringify(newRoom),
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

      deleteRoom: function(roomId, callback) {
				console.log("Delete Room");
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomUrl + "/" + roomId + "?" + apikey,
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

      addRoom: function(newRoom, callback) {
				console.log("Add Room");
        console.log(JSON.stringify(newRoom));
        var xsrf = $.param({propertyId: newRoom.propertyId, type: newRoom.type, status: newRoom.status, name: newRoom.name});
				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: serverUrl + roomUrl + "?" + apikey,
						method: 'POST',
						contentType: "application/x-www-form-urlencoded",
            data: xsrf,
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
    };
    return service;
  }
])
