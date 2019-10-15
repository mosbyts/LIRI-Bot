require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");

//OMDB - Movies//
//Function to get the requested movie data from axios - OMDB
OMDBFunction = function(movieName){
    var queryOMDB = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryOMDB).then(
        function(OMDBResponse){
            console.log("Movie Title: " + JSON.stringify(OMDBResponse.data.Title) + "\n Production Year: " + OMDBResponse.data.Year + "\n IMDB Rating: " + OMDBResponse.data.imdbRating + "\n Rotten Tomatoes Rating: " + JSON.stringify(OMDBResponse.data.Ratings[1].Value) + "\n Country: " + OMDBResponse.data.Country + "\n Language: " + OMDBResponse.data.Language + "\n Plot: " + OMDBResponse.data.Plot + "\n Actors: " + OMDBResponse.data.Actors);
        }
    );
};

//Spotify - Music//
var spotify = new Spotify(keys.spotify);
//Function to get the requested song data from Spotify
spotifyFunction = function(songName){
    spotify.search({type: 'track', query: songName, limit: 2}).then(
        function(spotifyResponse){
            console.log("Artist(s): " + spotifyResponse.tracks.items[0].artists[0].name + "\n Song Name: " + spotifyResponse.tracks.items[0].name + "\n Link: " + JSON.stringify(spotifyResponse.tracks.items[0].external_urls.spotify) + "\n Album: " + spotifyResponse.tracks.items[0].album.name);
        }
    );
};

//Bands In Town - Concerts//
//Function to get the requested concert data from axios - Bands In Town
BITFunction = function(artistName){
    var queryBIT = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    axios.get(queryBIT).then(
        function(BITResponse){
            console.log("Artist Name: " + JSON.stringify(BITResponse.data[0].lineup) + "\n Venue Name: " + BITResponse.data[0].venue.name + "\n Venue Location: " + BITResponse.data[0].venue.city + "\n Date: " + moment(BITResponse.data[0].datetime).format('MMMM Do YYYY'))
            
        }
    );
};

var fileFunction = function(){
    fs.readFile("random.txt", "utf8", function(err, data){
       var dataArr = data.split(",");
       console.log(dataArr[0] + dataArr[1]);
        if(dataArr[0] == "movie-this"){
            OMDBFunction(dataArr[1]);
        } else if(dataArr[0] == "spotify-this-song"){
            spotifyFunction(dataArr[1]);
        } else if(dataArr[0] == "concert-this"){
            BITFunction(dataArr[1]);
        }
    });
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
    } else if(userInput[2] == "do-what-it-says"){
        fileFunction(userInput2);
    }