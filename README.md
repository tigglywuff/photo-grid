# photo-grid

# Overview
This photo-grid app accepts search word(s) and displays a grid of image results coming from Flickr's API. Each image can be enlarged by clicking on its thumbnail. From here you may either click the left and right arrows on-screen to navigate to other images, or use your keyboard's left and right arrows. Exit lightbox view by clicking outside the image or hit escape.

By default, the page is loaded with search string "frenchie puppies". Feel free to search for a different keyword to begin.

A working sample has been hosted here: http://rainetan.com/photo-grid/

# File Summary

| File Name | Summary |
|-----------|---------|
|generateGrid.js|Contains functions used to render the photo-grid and lightbox on the page.|
|getImages.js|Includes all functions involved in requesting images from the Flickr API.|
|index.html|The main file containing the photo-grid app.|
|main.css|All styles for this photo-grid app.|

# Challenges Faced
Navigation Arrows
- I spent a large portion of my time trying to place the left and right navigation arrows. Initially I tried placing them both inside just outside the side of the image, vertically aligned to the middle. The problem I had with this approach is that different image dimensions would cause the arrows to move as the user navigates back and forth.
- Finally, after having grown a new level of appreciation for UI/UX designers, I decided to keep the arrows at the bottom of the page.

Creating an Aesthetically Pleasing Grid
- Since images from Flickr come in all shapes and sizes, my initial grid was quite messy and had either inconsistent proportions or mutilated aspect ratios.
- I opted to crop the images into squares.
