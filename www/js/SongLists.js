//Function to generate list based on number of songs present
//Passes in an array of each song, the length is used to generate list items

function createSongList(array) {
    var songList = document.createElement('ul');
    for (var i=0; i<array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        songList.appendChild(item);
    }
    return songList;
}