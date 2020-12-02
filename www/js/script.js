  // Your web app's Firebase configuration
  const app = document.querySelector('.countdown-timer');
  var firebaseConfig = {
    apiKey: "AIzaSyAMAJd3prCsJjPkR6xcSiv5EB7jSFLLu48",
    authDomain: "comp322-jmkek.firebaseapp.com",
    databaseURL: "https://comp322-jmkek.firebaseio.com",
    projectId: "comp322-jmkek",
    storageBucket: "comp322-jmkek.appspot.com",
    messagingSenderId: "904116987452",
    appId: "1:904116987452:web:cb9975b4e0a2ac2fd54539"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//Don't know below stuff to....
function playAudio() {
    //initial url relative to WWW directory - then built for Android
    var $audioURL = buildURL("media/audio/egypt.mp3");
    var $audio = new Media($audioURL, null, errorReport);
    $audio.play();
    alert("playing audio...have fun!");
    }
    //build url for android
function buildURL(file) {
    if (device.platform.toLowerCase() === "android") {
    var $androidFile = "/android_asset/www/" + file;
    return $androidFile;
    }
    }
    //return any error message from media playback
function errorReport(error) {
    alert("Error with Audio - " + JSON.stringify(error));
    }


//here(all below are user authentication functions)
    function newUser(){
        email = document.getElementById("createEmail").value;
        password = document.getElementById("createPassword").value;
        name = document.getElementById("createName").value;
    
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            var user = firebase.auth().currentUser;
            
            userref.child(user.uid).set({
                // "user": user.value,
                "fullname": name,
                "saveditems": null,
                "email": email
                // "cartitems": cart.value
            });
        }, function(error) {
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    
}
function logIn(){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}


function startTimer(duration, display) {
    var timer;
    timer = duration;
    var minutes, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    if (this.document.title == 'Cart'){
        oneMinute = 60,
        display = document.querySelector('#time');
    startTimer(oneMinute, display);
    }
};

