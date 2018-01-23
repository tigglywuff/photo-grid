'use strict';

function showLightbox(index) {

    var lbContent = document.getElementById("lightbox-content");
    var lbImg = lbContent.getElementsByTagName("img")[0];
    var lbTitle = lbContent.getElementsByTagName("p")[0];

    // var lbImg = document.getElementById("lightbox-img");
    lbImg.setAttribute("src", pgphotos[index].img);
    lbImg.setAttribute("photoId", index);
    document.getElementById("lightbox").style.display = "block";

    lbTitle.innerHTML = pgphotos[index].title;
}

function hideLightbox() {
    document.getElementById("lightbox").style.display = "none";
    console.log("hide");
}

function nav(direction) {
    var currIndex = parseInt(document.getElementById("lightbox-img").getAttribute("photoId"));
    currIndex += direction;

    // Can't exceed bounds
    if (currIndex < 0) {
        currIndex = pgphotos.length - 1;
    } else if (currIndex >= pgphotos.length) {
        currIndex = 0;
    }

    showLightbox(currIndex);
}


function renderGrid(photos) {
    var i;

	// Clear out the existing grid
	document.getElementById("grid").innerHTML = "";

    for (i = 0; i < photos.length; i++) {
        var element = document.createElement("img");

        element.setAttribute("src", photos[i].img);
        element.setAttribute("class", "square");

        element.setAttribute("onclick", "showLightbox(" + i + ")");

        document.getElementById("grid").appendChild(element);
    }

	photos.forEach(function (photo) {
        var element = document.createElement("img");

        element.setAttribute("src", photo.img);
        element.setAttribute("class", "square");

        element.setAttribute("onclick", "showLightbox(" + i + ")");

        document.getElementById("grid").appendChild(element);
    });

}

var pgphotos = [];

function search() {
	var searchString = document.getElementById("input").value;

	return promiseGetFlickrPhotos(searchString).then(function (photos) {
        pgphotos = photos;
		renderGrid(photos);
	});
}