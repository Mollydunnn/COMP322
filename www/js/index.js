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
      //------------------------------------------------user authentication stuff-Jaimie
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

    firebase.auth().onAuthStateChanged(firebaseUser =>{//hides and shows the buttons accordingly
        if(firebaseUser){
            console.log(firebaseUser);
            //hide sign up and log in button here
            btnLogOut.style.display= "block";
            btnSignUp.style.display= "none";
            btnLogIn.style.display= "none";
            console.log("User is logged in successfully.");
        } else{
            btnLogOut.style.display= "none";
            btnSignUp.style.display= "block";
            btnLogIn.style.display= "block";
            //hide logout button here
            console.log("User is not logged in.");
        }
    });//for testing purposes(run in browser platform with dev tools for debug)

  
//THis is the the function to keep track of the users and to modify 
//ensures the user is saved as a user when they sign up and confirms when they log in that they exist

}()); 



//----------------SongLists.html pulls in names of all songs on Playlist - Emily
//BrandProfile = list of brands (equivalent to 'Playlists')
//BrandProfile[i] would be each playlist, child of this would be songs of playlists
function getSongs_PopPlaylist(Playlist) {
    console.log(typeof(Playlist)); //Playlist represents specific playlist
    console.log(typeof(Playlist.Name));
    console.log(Playlist);
    sessionStorage.setItem("songs" , JSON.stringify(Playlist));
    let doc = document.getElementById('songs-list-container');
    doc.innerHTML += `
        <h2>${Playlist[1]}</h2>
        <a href="currentSong.html">Play</a>
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
                <button onclick="playAudio('${Playlist[i].Song}')"></button>
                <p>${Playlist[i].Artist}<p>
            </li>
            </ul>
            ` /* innerHTML end */
    }
    
}
//--------------------------------Pull in Playlist song and timer by song-Jaimie
var timeleft=60;
function currentSong(song, i){
    let ele=document.getElementById('current-song-container');
    
    //would like to pull in the playlist emily already found in the above code, then I go track by track playing them, q is now that I have it going through the tracks, how do I make it wait til the song is done before moving on(i could do this by just delayin git 60 seconds but I would like it to actualy go off the song)
    //need to save the name and then have this triggered by an onclick from Playlist
    setTimeout(function(){
        var count=59;
        var timer= setInterval(function(){
            
            document.getElementById('time').innerHTML=count;
            count--;
            if(count<=0){
                clearInterval(timer);
            }
          }, 1000);
    ele.innerHTML = `<div id= "CurrentSong">
    <img src= "${song.Image}">
    <h4 id= "song">${song.Name}</h4>
    <h5 id= "artist">${song.Artist}</h5>
    <ul id="SongControls">
        <li><p id="songNo">Song No.<br>${song.Number}</p></li>
        <li><audio id="audio" autoplay src=${song.Song}></audio></li>
        <li><span id="time">60</span></li>
        <li><p id="drinkCount">Drink Count<br>${song.Number}</p></li> 
    </ul>
</div>`
}, 60000*(i-2));
}

//------------------------------------------------Search Stuff -Jaimie
function getSearchResults(search, playlist){
    console.log(playlist);
    console.log(search);
    //now pull the info from DB and iterate through playlists to compare names wiht searchbar valie, then catipult it to the getSongs_PopPlaylist to pull in that page with the correct info
    for(let i=0; i< playlist.length; i++){
        console.log(playlist[i].ID);
        let playlistName= JSON.stringify(playlist[i].Name);
        if(search===playlistName){
            console.log(playlist[i].Name);
            return JSON.stringify(playlist[i].Name);
            //passes that playlist to the funciton to display its info on the page
    }
    }
    
}


//---------------------------------------------------