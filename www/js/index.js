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
(function(){
    const config = {
        apiKey: "AIzaSyAMAJd3prCsJjPkR6xcSiv5EB7jSFLLu48",
        authDomain: "comp322-jmkek.firebaseapp.com",
        databaseURL: "https://comp322-jmkek.firebaseio.com",
        projectId: "comp322-jmkek",
        storageBucket: "comp322-jmkek.appspot.com",
        messagingSenderId: "904116987452",
        appId: "1:904116987452:web:cb9975b4e0a2ac2fd54539"
      };
      firebase.initializeApp(config);
      //const database = firebase.database();
      //const rootRef = firebase.database().ref();
      const storageRef = firebase.storage().ref();
      const txtEmail = document.getElementById('txtEmail');
      const txtPassword = document.getElementById('txtPassword');
      const btnLogIn = document.getElementById('btnLogIn');
      const btnSignUp = document.getElementById('btnSignUp');
      const btnLogOut = document.getElementById('btnLogOut');

      //here(all below are user authentication functions)
    btnLogIn.addEventListener('click', e=> { //CONSOLE ERROR "Uncaught TypeError: Cannot read property 'addEventListener' of null"
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);
        //promise.catch(e => console.log(e.message));//if there is a user it'll log it in, if not we catch the error here
        document.getElementById('txtEmail').value = '';
        document.getElementById('txtPassword').value = '';
    });

    btnSignUp.addEventListener('click', e=> {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password); //send it off to firebase authentication
        //promise.catch(e => console.log(e.message));//if there is a user it'll log it in, if not we catch the error here
        document.getElementById('txtEmail').value = '';
        document.getElementById('txtPassword').value = '';
    });

    btnLogOut.addEventListener('click', e=>{
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            //console.log(firebaseUser);
            //console.log("User is logged in successfully.");
            //btnlogOut.remove('hide');
        } else{
            //console.log("User is not logged in.");
            //btnlogOut.classList.add('hide');
        }
    });



//THis is the the function to keep track of the users and to modify 
//ensures the user is saved as a user when they sign up and confirms when they log in that they exist

}()); //CONSOLE ERROR "Uncaught TypeError: Cannot read property 'addEventListener' of null"

/*storageRef.child('img/LogoTransparent.png').getDownloadURL().then(function(url) {
    var img = document.getElementById('mylogo');
    img.src = url;
}, function(error) {});*/

document.addEventListener("deviceready", function() {
    var oneMinute = 60;
    var display = document.querySelector('#time');
    startTimer(oneMinute, display);
}, false);

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
   
}

/*function currentlyPlaying(){
    let ele = document.getElementById("product-page-container");
    ele.innerHTML = ``
}*/
/*
    
//THis is the the function to keep track of the users and to modify 
//ensures the user is saved as a user when they sign up and confirms when they log in that they exist
*/


// Function to get a playlist based on the button clicked, using the ID number
function saveID() {
    var id_number = this.value;
    localStorage["key"] = id_number;
}

// Function to get the songs associated with a given playlist
function getSongs(Playlist) {
    console.log(typeof(Playlist)); //Playlist represents specific playlist
    console.log(typeof(Playlist.Name));
    let doc = document.getElementById('songs-list-container');
    doc.innerHTML += `
        <h2>${Playlist[1]}</h2>
        `
    //Playlist[0]=ID, Playlist[1]=Name, Playlist[2:]=Songs
    for (var i=2; i<Playlist.length; i++) {
        console.log(typeof(Playlist[i])); //these will be the songs
        var number = JSON.stringify(Playlist[i].Number); //Number attribute of each song
        console.log(number);
        doc.innerHTML += /* innerHTML begin */ ` 
            <ul>
            <li>
                <img src="img/${Playlist[i].Image}">
                <h3>${Playlist[i].Name}</h3>
                <button onclick="playAudio('${Playlist[i].Song}')">></button>
                <p>${Playlist[i].Artist}<p>
            </li>
            </ul>
            ` /* innerHTML end */
    }
}