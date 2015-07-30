var dataArr = [];
var episode = {}

exports.getRTL = function() {

    for (var i = 0; i < 10; i++) {
        episode.title = i;
        episode.image = i;
        episode.description = i;
        episode.videoUrl = "http://" + i + ".nl/";
        dataArr.push(episode);
    };
    return JSON.stringify(dataArr, null, 4);
}