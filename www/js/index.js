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
      const database = firebase.database();
      const rootRef = firebase.database().ref();
      const storageRef = firebase.storage().ref();
      const txtEmail = document.getElementById('txtEmail');
      const txtPassword = document.getElementById('txtPassword');
      const btnLogIn = document.getElementById('btnLogIn');
      const btnSignUp = document.getElementById('btnSignUp');
      const btnLogOut = document.getElementById('btnLogOut');
    
      //here(all below are user authentication functions)
    btnLogIn.addEventListener('click', e=> {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));//if there is a user it'll log it in, if not we catch the error here
        document.getElementById('txtEmail').value = '';
        document.getElementById('txtPassword').value = '';
    });

    btnSignUp.addEventListener('click', e=> {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password); //send it off to firebase authentication
        promise.catch(e => console.log(e.message));//if there is a user it'll log it in, if not we catch the error here
        document.getElementById('txtEmail').value = '';
        document.getElementById('txtPassword').value = '';
    });

    btnLogOut.addEventListener('click', e=>{
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            console.log(firebaseUser);
            console.log("User is logged in successfully.");
            //btnlogOut.remove('hide');
        } else{
            console.log("User is not logged in.");
            //btnlogOut.classList.add('hide');
        }
    });

    /*function startTimer(duration, display) {
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
}*/




//THis is the the function to keep track of the users and to modify 
//ensures the user is saved as a user when they sign up and confirms when they log in that they exist

});

document.addEventListener("deviceready", function() {
    var oneMinute = 60;
    display = document.querySelector('#time');
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


//This function is for fetching the PopPlaylist and its associated songs
function getPopPlaylist() {
    var songData=[];
    firebase.database().ref("/Playlists/PopPlaylist").on('value', function(snap) {
        snap.forEach(function(childNodes) {
            songData.append(childNodes.val().Name); //song name
            songData.append(childNodes.val().Artist); //artist name
            songData.append(childNodes.val().Image); //image file string
            songData.append(childNodes.val().Song); //mp3 file string
        });
        
    });
    return songData; //returns the list to be used in the getSongs function
}

//Function to be used to generate HTML elements
function createSongList(songs) {
    document.createElement('h2').createTextNode("Today's Pop Hits");
    var songList = document.createElement('ul');
    // 0=name, 1=artist, 2=image, 3=mp3
    for (var i=0; i<songs.length; i+=4) { //increment in 4s
        var list_item = document.createElement('li');
        list_item.appendChild(document.createElement('img').createTextNode('songs/'+songs[i+2])); //image url in img element
        list_item.appendChild(document.createElement('h3').createTextNode(songs[i])); //song name in h3 element
        list_item.appendChild(document.createElement('button')); //needs to play the sound
        list_item.appendChild(document.createElement('p').createTextNode(songs[i+1])); //artist name in p element
        item.appendChild(list_item); //adds this list item to the ul element
    }
    return songList; //returns ul element, containing all list items as children
}
