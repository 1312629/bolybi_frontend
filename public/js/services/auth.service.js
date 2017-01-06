appServices.factory('authService', [
  function() {
  
    var finish = null;
      
    var updateProfile = function(newName, user) {
        console.log("update profile");
        user.updateProfile({
            displayName: newName
            //photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
            Cookies.set("user", firebase.auth().currentUser);
            if (finish != null) {
                finish();
            }
            // Update successful.
        }, function(error) {
            // An error happened.
        });
    }; 
      
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log(user.getToken());
          if (user.displayName === null) {
              user.displayName = user.email;
              updateProfile(user.email, user);
          } else {
              Cookies.set("user", user);
              if (finish != null) {
                  console.log("go finish");
                  finish();
              }
          }
      } else {
          Cookies.remove("user");
      }
    });
      
    var service = {
        login : function(email, password, fullfill, callback){
            console.log("Login");
            finish = fullfill;
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                callback(errorMessage);
              // ...
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
