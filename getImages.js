/**
  * This library performs a call to a (in our class, Flickr) photo API and return an array of
  * photo objects. Each object is required to have 2 properties: img, title
  */

'use strict';

/**
  * Takes a JSON object and converts it into a query parameter string. For example:
  * { "h": "w" } converts into "&h=w".
  * @param {object} json
  * @returns {string}
  */
function jsonToQueryParamString(json) {
    var retStr = "",
        prop;

    json = json || {};

    for (prop in json) {
        if (json.hasOwnProperty(prop)) {
            retStr += "&" + prop + "=" + json[prop];
        }
    }

    // replace leading & with a ?
    retStr = retStr.replace("&", "?");

    return retStr;
}

/**
  * Add a simple template replacement function to String. Accepts an object and replaces template
  * strings with the parameter object's values.
  *
  * A String's template replacement variables should look like {x} where x is an existing property
  * in the provided object. 
  * ex: "hello {x}!" applied with object { "x": "world" } will produce "hello world!"
  *
  * @params {object} object
  * @returns {string}
  */
String.prototype.template = function (object) {
    var strings = [],
        templateStrings = [],
        finalStr = "",
        i;

    // Divide up this string based on the {templateStrings}
    strings = this.split(/\{[^}]+\}/);
    templateStrings = this.match(/[^{\}]+(?=})/g);

    for (i = 0; i < strings.length; i++) {
        finalStr += strings[i];

        // Replace the templateStrings with values from object
        if (templateStrings[i]) {

            // Get the value from provided object
            if (object.hasOwnProperty(templateStrings[i])) {
                finalStr += object[templateStrings[i]];
            }
        }
    }

    return finalStr;
}

/**
  * Requests a url and read its response using a callback function.
  * @params {string} url
  * @params {function} callback
  */
function getAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.response);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

/**
  * Promisify getAsync function.
  * @params {string} url
  * @return {object} A promise containing the response data
  */
function promiseGetAsync(url) {
    return new Promise(function (resolve, reject, error) {
        return getAsync(url, function (data) {
            resolve(data);
        });
    });
}

/**
  * Given a search tag, returns Flickr API's appropriate url.
  * @param {string} tag
  * @returns {string}
  */
function getFlickrUrl(tag) {
    var json = {
        "method": "flickr.photos.search",
        "api_key": "9e51e7c9bb20854422c5c447702215bf",
        "tags": tag,
        "format": "json",
        "nojsoncallback": 1
    };

    return "https://api.flickr.com/services/rest/" + jsonToQueryParamString(json);
}

/**
  * Given a tag, returns an array of photo objects using Flickr's API.
  * @params {string} tag
  * @return {object} A promise containing an array of photo objects
  */
function promiseGetFlickrPhotos(tag) {
    const flickrTemplate = {
        "img": "https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg",
        "title": "{title}"
    };

    var url,
        photoArr = [];

    // Generate Flickr URL using tag
    url = getFlickrUrl(tag);

    // Request from Flickr's API
    return promiseGetAsync(url).then(function (response) {
        // It comes back as a string I think (working offline is rough!)
        response = JSON.parse(response);

        response.photos.photo.forEach(function (flickrObject) {
            photoArr.push({
                "img": flickrTemplate.img.template(flickrObject),
                "title": flickrTemplate.title.template(flickrObject)
            });
        });

        return photoArr;
    });
}