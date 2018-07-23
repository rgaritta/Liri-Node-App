require("dotenv").config();
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];

switch (input) {
    case 'my-tweets':
    getTwitter();
    break;

}


function getTwitter() {
    var screenName = {screen_name: 'rgaritta'};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
        console.log(screenName.screen_name + "'s Last 20 Tweets");
        console.log ('---------------');
        for (var i = 0; i < 20; i++) {
            console.log('Tweet #' + (i+1) + ' (' + tweets[i].created_at + '): ' + tweets[i].text + '\n');
        }
    })
}