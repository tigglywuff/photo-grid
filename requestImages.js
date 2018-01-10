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

/**
  * Used to check why some images I saw were broken, seems like a flickr issue though.
  */
function photoToSite(photo) {
    return "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id + "/";
}

function main() {
    var url = generateFlickrUrl("frenchies");
    getAsync(url, function (x) {
        x = JSON.parse(x);

        x.photos.photo.forEach(function (photo) {
            var element = document.createElement("img");
            element.setAttribute("src", photoToUrl(photo));
            element.setAttribute("class", "square");
            element.setAttribute("onclick", "showLightbox()");

            document.getElementById("grid").appendChild(element);
        });
        
    });
}

function showLightbox() {
    var elements = document.getElementsByClassName("lightbox"),
        i;
    for (i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
    }
}

function hideLightbox() {
    var elements = document.getElementsByClassName("lightbox"),
        i;
    for (i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

main();