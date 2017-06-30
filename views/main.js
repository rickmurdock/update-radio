'use strict';

const API = "http://api.soundcloud.com/tracks";
const CLIENTID = "8538a1744a7fdaa59981232897501e04";
var marqueeText = document.querySelector('marquee');
var resultsSection = document.querySelector(".results");
var tracks;

document.querySelector('.submitBtn').addEventListener("click", function() {
    let artist = document.querySelector('#artistSearch').value
    getMusic(artist);
});  

document.querySelector('.results').addEventListener("click", function(e) {
    console.log("ALBUM PRESSED");
    var selectedId = e.target.id.replace("artwork-", "");
    console.log('====', selectedId);
    document.querySelector("audio").src = document.querySelector("#track-" + selectedId).title + "?client_id=" + CLIENTID;
    marqueeText.innerHTML = document.querySelector('#title-' + selectedId).innerHTML;
});

// document.querySelector('#addFav').addEventListener("click", function(e) {
//     console.log("FAV PRESSED");
//     var selectedId = e.target.id;
//     console.log('====', selectedId);
//     console.log(savTitle);
//     console.log('saved band ', savBand);
// });

document.querySelector("#artistSearch").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.querySelector(".submitBtn").click();
    }
});

document.querySelector('.search').addEventListener("submit", function() {
    event.preventDefault();
});  

function getMusic(artist) {

    resultsSection.innerHTML = "";
    let url = API + "?client_id=" + CLIENTID + "&q=%22" + artist + "%22";

    fetch(url).then(function(response) {
    // handle HTTP response
        response.json().then(function(data) {  
            console.log("Here is the data:", data);
            // var tracks = data.results;
            tracks = data //.results;
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                createTrack(data, i);
            }
        });
    }, function(error) {
    // handle network error
    console.log('Fetch Error :-S', err); 
    });
}

function createTrack(tracks, i) {
    let artwork;
    let band;
    let newDiv;
    let title;
    let favBtn;
    
    newDiv = document.createElement('div');
    newDiv.className = 'track';
    newDiv.id = 'track-' + i;
    newDiv.title = tracks[i].stream_url;
    resultsSection.appendChild(newDiv);

    artwork = document.createElement('img');
    if (tracks[i].artwork_url != null) {
        artwork.src = tracks[i].artwork_url;
    } else {
        artwork.src ="noImage.png";
    }
    artwork.id = 'artwork-' + i;
    artwork.className = 'artwork'
    newDiv.appendChild(artwork);

    favBtn = document.createElement('button');
    favBtn.innerHTML = 'add to favorites';
    favBtn.id = i;
    favBtn.className = 'favBtn';
    favBtn.addEventListener("click", addFavoriteSong);
    newDiv.appendChild(favBtn);


    title = document.createElement('p');
    title.innerHTML = tracks[i].title;
    title.id = 'title-' + i;
    newDiv.appendChild(title);

    band = document.createElement('p');
    band.innerHTML = tracks[i].user.username;
    band.id = 'band-' + i;
    band.className = 'band';
    newDiv.appendChild(band);
}

function addFavoriteSong (event) {
    event.preventDefault();
    event.target.disabled = true;
    var selectedId = event.target.id;
    var tracksData = tracks[selectedId];
    console.log('tracksData: ', tracksData);
    axios.post('/favorites', tracksData).then(function(addedSong) {
        return addedSong.data;
    });
}