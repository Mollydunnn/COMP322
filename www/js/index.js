/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
/*document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}*/
  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyAMAJd3prCsJjPkR6xcSiv5EB7jSFLLu48",
    authDomain: "comp322-jmkek.firebaseapp.com",
    databaseURL: "https://comp322-jmkek.firebaseio.com",
    projectId: "comp322-jmkek",
    storageBucket: "comp322-jmkek.appspot.com",
    messagingSenderId: "904116987452",
    appId: "1:904116987452:web:cb9975b4e0a2ac2fd54539"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  var rootRef = firebase.database().ref();
  const storageRef = firebase.storage().ref();
  const txtemail = document.getElementById('email');
  const txtpassword = document.getElementById('password');
  const btnlogIn = document.getElementById('logIn');
  const btnsignUp = document.getElementById('signUp');
  const btnlogOut = document.getElementById('logOut');

//Don't know below stuff to....
/*function playAudio() {
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
*/


//here(all below are user authentication functions)
btnlogIn.addEventListener('click', e=> {
    const email = txtemail.value;
    const password = txtpassword.value; 
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password); //send it off to firebase authentication
    promise.catch(e => console.log(e.message));//if there is a user it'll log it in, if not we catch the error here
});

btnsignUp.addEventListener('click', e=> {
    //TODO: CHECK FOR A REAL EMAIL
    const email = txtemail.value;
    const password = txtpassword.value; 
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password); //send it off to firebase authentication
    promise.catch(e => console.log(e.message));//if there is a user it'll log it in, if not we catch the error here
});

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        console.log(firebaseUser);
        btnlogOut.remove('hide');
    } else{
        console.log("User has not signed up.");
        btnlogOut.classList.add('hide');
    }
});

btnlogOut.addEventListener('click', e=>{
    firebase.auth().signOut();
});
//THis is the the function to keep track of the users and to modify 
//ensures the user is saved as a user when they sign up and confirms when they log in that they exist


function playPlease(){
    var audio = document.getElementById("audio");
    audio.play();
}