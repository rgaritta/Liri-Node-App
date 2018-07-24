require("dotenv").config();
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var key = '';

startApp(input);

function startApp(input) {
    switch (input) {
        case 'my-tweets':
            getTwitter();
            break;

        case 'movie-this':
            if (key == '') {
                 key = process.argv[3];
            }
            if (!process.argv[3] && key == '') {
                key = 'Mr. Nobody';
            }
            var queryURL = "http://www.omdbapi.com/?t=" + key + "&y=&plot=short&apikey=trilogy";
            getMovie(queryURL);
            break;

        case 'do-what-it-says':
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (!error) {
                    inputArr = data.split(', ');
                    input = inputArr[0];
                    key = inputArr[1];
                    console.log(key);
                    startApp(input);
                }
            })

            break;

    }
}


function getTwitter() {
    var screenName = { screen_name: 'rgaritta' };
    client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
        if (!error) {
            console.log(screenName.screen_name + "'s Last 20 Tweets");
            console.log('---------------');
            for (var i = 0; i < 20; i++) {
                console.log('Tweet #' + (i + 1) + ' (' + tweets[i].created_at + '): ' + tweets[i].text + '\n');
            }
        }
    })
}

function getMovie(queryURL) {
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var title = "Title: " + JSON.parse(body).Title; console.log(title);
            var year = "Year: " + JSON.parse(body).Year; console.log(year);
            var ratingIMDB = "IMDB Rating: " + JSON.parse(body).Ratings[0].Value; console.log(ratingIMDB);
            var country = "Country: " + JSON.parse(body).Country; console.log(country);
            var language = "Language: " + JSON.parse(body).Language; console.log(language);
            var plot = "Plot: " + JSON.parse(body).Plot; console.log(plot);
            var actors = "Actors: " + JSON.parse(body).Actors; console.log(actors);
        }
    });
}