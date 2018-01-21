'use strict';

function renderGrid(photos) {

	// Clear out the existing grid
	document.getElementById("grid").innerHTML = "";

	photos.forEach(function (photo) {
        var element = document.createElement("img");

        element.setAttribute("src", photo.img);
        element.setAttribute("class", "square");

        document.getElementById("grid").appendChild(element);
    });

}

function search() {
	var searchString = document.getElementById("input").value;

	return promiseGetFlickrPhotos(searchString).then(function (photos) {
		renderGrid(photos);
	});
}