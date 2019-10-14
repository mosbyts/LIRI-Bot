require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');

//OMDB - Movies//
//Function to get the requested movie data from axios - OMDB
OMDBFunction = function(movieName){
    var queryOMDB = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryOMDB).then(
        function(OMDBResponse){
            console.log("Movie Title: " + JSON.stringify(OMDBResponse.data[0].Title) + "\n Production Year: " + OMDBResponse.data[0].Year + "\n IMDB Rating: " + OMDBResponse.data[0].imdbRating + "\n Rotten Tomatoes Rating: " + OMDBResponse.data[0].Ratings + "\n Country: " + OMDBResponse.data[0].Country + "\n Language: " + OMDBResponse.data[0].Language + "\n Plot: " + OMDBResponse.data[0].Plot + "\n Actors: " + OMDBResponse.data[0].Actors);
        }
    );
};

//Spotify - Music//
var spotify = new Spotify(keys.spotify);
//Function to get the requested song data from Spotify
spotifyFunction = function(songName){
    spotify.search({type: 'track', query: songName, limit: 2}).then(
        function(spotifyResponse){
            console.log(spotifyResponse.tracks.items);
            console.log("------")
            console.log("Artist(s): " + spotifyResponse.tracks.items.artists.name + "\n Song Name: " + spotifyResponse.tracks.items.name + "\n Link: " + spotifyResponse.tracks.items.preview_url + "\n Album: " + spotifyResponse.tracks.items.album );
        }
    );
};

//Bands In Town - Concerts//
//Function to get the requested concert data from axios - Bands In Town
BITFunction = function(artistName){
    var queryBIT = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    axios.get(queryBIT).then(
        function(BITResponse){
            console.log("Artist Name: " + JSON.stringify(BITResponse.data[0].lineup) + "\n Venue Name: " + BITResponse.data[0].venue.name + "\n Venue Location: " + BITResponse.data[0].venue.city + "\n Date: " + BITResponse.data[0].datetime)
            //console.log(BITResponse);
        }
    );
};

var userInput2 = "";
    for(var x = 3; x < process.argv.length; x++){
        if (process.argv[x]){
        userInput2 += process.argv[x];
        }
    };

var userInput = process.argv;
    if(userInput[2] == "movie-this"){
        OMDBFunction(userInput2);
    } else if(userInput[2] == "spotify-this-song"){
        spotifyFunction(userInput2);
    } else if(userInput[2] == "concert-this"){
        BITFunction(userInput2);
    }