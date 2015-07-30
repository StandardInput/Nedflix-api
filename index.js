var request = require('request');
dataArr = [];
// var episode = {}

/*
* Api paths
*/
var RTL_BASE_API = "http://rtl.nl/system/s4m/vfd/version=2/fmt=progressive/output=json";
var RTL_FETCH_PATH = "";


exports.getRTL = function(type) {
    switch(type) {
        case "catchup": 
            RTL_FETCH_PATH = "/d=a3t/fun=catchup"; 
            break;
        case "az":
            RTL_FETCH_PATH = "/d=a3t/fun=az"; 
            break;
    }
    return request(RTL_BASE_API + RTL_FETCH_PATH, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body) // Show the HTML for the Google homepage.
        for (var i = 0; i < 10; i++) {
            episode.title = i;
            episode.smallImage = i;
            episode.largeImage = i;
            episode.description = i;
            episode.videoUrl = "http://" + i + ".nl/";
            dataArr.push(episode);
        };
        JSON.stringify(dataArr, null, 4);
      }
    });

}

exports.getRTLEpisodes = function(id, callback) {
    RTL_FETCH_PATH = "/d=a3t/ak=" + id;
    request(RTL_BASE_API + RTL_FETCH_PATH, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        json = JSON.parse(response.body);
        for (var i = 0; i < json.episodes.length; i++) {
            episodeData = json.episodes[i];
            
            episode = {}
            episode.name = episodeData.name;
            episode.description = episodeData.synopsis;
            episode.smallImage = i;
            episode.largeImage = i;
            episode.videoUrl = "http://" + i + ".nl/";
            
            dataArr.push(episode);
        };
        callback(JSON.stringify(dataArr, null, 4));
      }
    });

}

exports.getRTLVideo = function(id) {

}