var request = require('request');
dataArr = [];
// var episode = {}

/*
* Api paths
*/
var NPO_BASE_API = "http://apps-api.uitzendinggemist.nl"
var RTL_BASE_API = "http://rtl.nl/system/s4m/vfd/version=2/fmt=progressive/output=json";
var RTL_FETCH_PATH = "";


/*
* NPO:
*/
exports.getNPO = function(callback) {
    return request(NPO_BASE_API + "/series.json", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        json = JSON.parse(response.body);

        for (var i = 0; i < json.length; i++) {
            npo = json[i];
            
            npoArr = {}
            npoArr.id = npo.nebo_id;
            npoArr.name = npo.name;
            npoArr.description = npo.description;
            npoArr.proglogo = npo.image;
            npoArr.poster = npo.image;
            
            dataArr.push(npoArr);
        };
        callback(JSON.stringify(dataArr, null, 4));
      }
    });
}


/*
* RTL XL:
*/
exports.getRTL = function(type, callback) {
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
        json = JSON.parse(response.body);
        PROGLOGO_BASE_URL = json.meta.proglogo_base_url;
        POSTER_BASE_URL = json.meta.poster_base_url;

        for (var i = 0; i < json.abstracts.length; i++) {
            abstracts = json.abstracts[i];
            
            rtlArr = {}
            rtlArr.id = abstracts.key;
            rtlArr.name = abstracts.name;
            rtlArr.description = abstracts.synopsis;
            rtlArr.proglogo = PROGLOGO_BASE_URL + abstracts.proglogo;
            rtlArr.poster = POSTER_BASE_URL + abstracts.coverurl;
            
            dataArr.push(rtlArr);
        };
        callback(JSON.stringify(dataArr, null, 4));
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


