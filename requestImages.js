const API_KEY = "9e51e7c9bb20854422c5c447702215bf";

function generateFlickrUrl(tag) {
    const baseUrl = "https://api.flickr.com/services/rest/";
    var queryParams = {
        "method": "flickr.photos.search",
        "api_key": API_KEY,
        "tags": tag,
        "format": "json",
        "nojsoncallback": 1
    };

    return baseUrl + this.jsonToQueryParams(queryParams);
}

function jsonToQueryParams(json) {
    var jsonKeys = [],
        retStr = "";

    json = json || {};
    jsonKeys = Object.keys(json);

    // json is empty
    if (!jsonKeys.length) {
        return "";
    }

    jsonKeys.forEach(function (k) {
        var v = json[k];

        retStr += "&" + k + "=" + v;
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
    var url = "https://farm";

    url += photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
    return url;
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