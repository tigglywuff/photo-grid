'use strict';

/* Array of photo objects to be stored in global space. Needs to be available so that nav and render
functions correctly. */
var pgphotos = [];

/**
 * Renders the lightbox for a specific photo index
 * @params {int} index
 */
function showLightbox(index) {
    var lbImg = document.getElementById("lightbox-img"),
        lbTitle = document.getElementById("lightbox-title"),
        lbElements = document.getElementsByClassName("lightbox");

    lbImg.setAttribute("src", pgphotos[index].img);
    lbImg.setAttribute("photoId", index);

    lbTitle.innerHTML = pgphotos[index].title;

    // Show all .lightbox elements
    for (var i = 0; i < lbElements.length; i++) {
        lbElements[i].style.display = "block";
    }
}

/**
  * Hides the lightbox
  */
function hideLightbox() {
    var lbElements = document.getElementsByClassName("lightbox");

    for (var i = 0; i < lbElements.length; i++) {
        lbElements[i].style.display = "none";
    }
}

/**
  * Renders a different photo based on how many indices to traverse in the pgphotos array. Accepts
  * both positive and negative numbers. Intended to be used with 1 and -1. If any larger magnitude
  * numbers are specified, should function accordingly EXCEPT in the case where a bound is exceeded.
  * @param {int} direction
  */
function nav(direction) {
    // Get the currIndex. Note: nav should only be called after one has already been opened
    var currIndex = parseInt(document.getElementById("lightbox-img").getAttribute("photoId"));

    currIndex += direction;

    // Can't exceed bounds
    if (currIndex < 0) {
        currIndex = pgphotos.length - 1;
    } else if (currIndex >= pgphotos.length) {
        currIndex = 0;
    }

    // Re-render lightbox for the new index
    showLightbox(currIndex);
}

/**
  * Renders the photo grid given an array of photo objects.
  * @params {array.object} photos An array of photo objects.
  */
function renderGrid(photos) {
    var i;

	// Clear out the existing grid
    var grid = document.getElementById("grid");
    if (grid) {
        grid.innerHTML = "";
    }

    // Add each photo to div#grid
    for (i = 0; i < photos.length; i++) {
        var element = document.createElement("img");

        element.setAttribute("src", photos[i].img);
        element.setAttribute("class", "square");
        element.setAttribute("onclick", "showLightbox(" + i + ")");

        document.getElementById("grid").appendChild(element);
    }
}

/**
  * Searches for photos then renders the photo grid with them.
  * @params {string} string Optionally specify a string to search for. When not specified, uses the
  *                         value from the input field on the UI.
  */
function search(string) {
    var inputElement = document.getElementById("input"),
	    searchString = string || inputElement.value;

	return promiseGetFlickrPhotos(searchString).then(function (photos) {
        pgphotos = photos;

        // Clear the input field
        inputElement.value = "";

        // Render photos
		renderGrid(photos);
	});
}

// Include a default set of images when the page loads
search("frenchie puppies");