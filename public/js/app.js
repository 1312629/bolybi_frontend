$.loadScript = function (url, callback) {
    $.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: false
    });
};

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_TLWgmsY1HUGHBoZwpEDgoKCzJBnpF40",
    authDomain: "bolybi-c3eec.firebaseapp.com",
    databaseURL: "https://bolybi-c3eec.firebaseio.com",
    storageBucket: "bolybi-c3eec.appspot.com",
    messagingSenderId: "883078439332"
};
firebase.initializeApp(config);

$.loadScript('js/app.module.js');
$.loadScript('js/services.module.js');
$.loadScript('js/controllers.module.js');