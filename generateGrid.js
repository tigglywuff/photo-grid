'use strict';

var pgphotos = [];

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

function hideLightbox() {
    var lbElements = document.getElementsByClassName("lightbox");

    for (var i = 0; i < lbElements.length; i++) {
        lbElements[i].style.display = "none";
    }
}

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

function search(string) {
    var inputElement = document.getElementById("input");
	var searchString = string || inputElement.value;

	return promiseGetFlickrPhotos(searchString).then(function (photos) {
        pgphotos = photos;
        inputElement.value = "";
		renderGrid(photos);
	});
}

// Include a default set of images when the page loads
search("frenchie puppies");