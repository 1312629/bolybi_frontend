appServices.factory('authService', [
  function() {
  
    var finish = null;
    var noFinish = null;
      
    var serverUrl = 'http://testshoe.gear.host/';
    var apiAdd = 'Api/MyAccount/v1/AddAccount';
    var apiGet = 'Api/MyAccount/v1/GetAccount';
      
    var updateProfile = function(newName, user) {
        console.log("update profile");
        user.updateProfile({
            displayName: newName
            //photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
            //Cookies.set("user", firebase.auth().currentUser);
            $('body').removeClass('loaded');
            service.getAcc(user.uid, 'Active', function(err, result) {
                $('body').addClass('loaded');
                if (err) {
                  return window.alert(err);
                }
                //window.alert(result.Message);

                if (result.Code == 200) {
                    Cookies.set("user", result.Data.Account);
                    var cart = result.Data.Cart;
                    cart.CartDetail = result.Data.CartDetail;
                    Cookies.set("cart", cart);
                } else {
                  Cookies.set('fbUser', user);
                }
                if (finish != null) {
                  finish();
                }
            })
            // Update successful.
        }, function(error) {
            // An error happened.
        });
    }; 
      
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
              console.log(user.uid);
              if (user.displayName === null) {
                  user.displayName = user.email;
                  updateProfile(user.email, user);
              } else {
                  $('body').removeClass('loaded');
                  service.getAcc(user.uid, 'Active', function(err, result) {
                      $('body').addClass('loaded');
                      if (err) {
                          return window.alert(err);
                      }
                      //window.alert(result.Message);
                        
                      if (result.Code == 200) {
                          console.log(result);
                        result.Data.Account.photoURL = user.photoURL;
                        result.Data.Account.CreatedDate = new Date(result.Data.Account.CreatedDate);
                        result.Data.Account.CreatedDate = result.Data.Account.CreatedDate.toLocaleDateString();
                        Cookies.set("user", result.Data.Account);
                        var cart = result.Data.Cart;
                        cart.CartDetail = result.Data.CartDetail;
                        Cookies.set("cart", cart);
                      } else {
                          Cookies.set('fbUser', user);
                      }
                      if (finish != null) {
                          finish();
                      }
                  })
                  //Cookies.set("user", user);
//                  if (finish != null) {
//                      console.log("go finish");
//                      finish();
//                  }
              }
      } else {
          Cookies.remove("user");
          Cookies.remove("cart");
      }
    });
      
    var service = {
        
        getAcc : function(token, status, callback) {
            var promise = new Promise((fullfill, reject) => {
                $.ajax({
                    url: serverUrl + apiGet + "?token=" + token + "&status=" + status,
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
        
        postAcc : function(email, fullname, type, address, phone, token, callback) {
            var newUser = {Email: email, Fullname: fullname, Status: "Active", Type: type, Address: address, Phone: phone, Token: token};
            console.log(newUser);
            var promise = new Promise((fullfill, reject) => {
                $.ajax({
                    url: serverUrl + apiAdd,
                    method: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify(newUser),
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
        
        login : function(email, password, fullfill, reject){
            console.log("Login");
            finish = fullfill;
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
                var token = result.refreshToken;
                console.log(token);
            // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                reject(error.message);
            });
        },
        
        loginWithGG : function(fullfill, reject) {
            var provider = new firebase.auth.GoogleAuthProvider();
            finish = fullfill;
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(token);
            // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                reject(error.message);
            });
        },
        
        loginWithFB : function(fullfill, reject) {
            var provider = new firebase.auth.FacebookAuthProvider();
            finish = fullfill;
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(token);
            // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                reject(error.message);
            });
        },
        
        logout : function(fullfill, reject) {
            console.log("Create Account");
            firebase.auth().signOut().then(function() {
                fullfill();
            }, function(error) {
                reject(error.message);
            });
        },

        create : function(email, password, fullfill, callback) {
            console.log("Create Account");
            finish = fullfill;
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                callback(errorMessage);
                // ...
            });
        }
    };

    return service;
  }
])
