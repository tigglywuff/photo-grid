const API_KEY = "9e51e7c9bb20854422c5c447702215bf";

function generateFlickrUrl(tag) {
    var queryParams = {
        "method": "flickr.photos.search",
        "api_key": API_KEY,
        "tags": tag,
        "format": "json",
        "nojsoncallback": 1
    };

    return "https://api.flickr.com/services/rest/" + this.jsonToQueryParams(queryParams);
}

function jsonToQueryParams(json) {
    var retStr = "";

    json = json || {};

    Object.keys(json).forEach(function (k) {
        retStr += "&" + k + "=" + json[k];;
    });

    // replace leading & with a ?
    retStr = retStr.replace("&", "?");

    return retStr;
}

function getAsync(url, cb) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            cb(xmlHttp.response);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

/**
  * @param photo {object}
  */
function photoToUrl(photo) {
    return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
}

function main() {
    var url = generateFlickrUrl("puppies");
    getAsync(url, function (x) {
        x = JSON.parse(x);

        x.photos.photo.forEach(function (photo) {
            var element = document.createElement("img");
            element.setAttribute("src", photoToUrl(photo));
            element.setAttribute("class", "square");

            document.body.appendChild(element);
        });
        
    });
}

main();