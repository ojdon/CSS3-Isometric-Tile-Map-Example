var tileID      = ["floor", "leftWall", "rightWall"];
var colorID     = ["AAC", "E22", "2AE", "2A2", "F94"]; //Initial colors
var shadowID    = ["99B", "D11", "19D", "191", "E83"]; //Matching shadow colors
var currentTile = 0, currentColor = 0;

$('<div class="cursor"></div>').appendTo('body'); //Add cursor

var $cursor = $('.cursor');

function updatePreview() { //Update the preview tile
	var $preview = $('.preview');
	if($preview.is(':has(.tile)')) {
		$(".preview .tile:last-child").remove();
	}
	if(currentTile === 1) {
		$preview.append('<div class="tile '+ tileID[currentTile] + '" style="display: block; position: relative; background: #' + shadowID[currentColor] +';"></div>');
	} else {
		$preview.append('<div class="tile '+ tileID[currentTile] + '" style="display: block; position: relative; background: #' + colorID[currentColor] +';"></div>');
	}
}

updatePreview(); //Init "Update Preview" method

var transformCursor = function($el, rotate, skewX, skewY) {
	$el.css({
		"-webkit-transform": "rotate("+rotate+"deg) skew("+skewX+"deg, "+skewY+"deg)",
		"-webkit-transform": "rotate("+rotate+"deg) skew("+skewX+"deg, "+skewY+"deg)",
		"-moz-transform"   : "rotate("+rotate+"deg) skew("+skewX+"deg, "+skewY+"deg)",
		"-o-transform"     : "rotate("+rotate+"deg) skew("+skewX+"deg, "+skewY+"deg)",
		"-ms-transform"    : "rotate("+rotate+"deg) skew("+skewX+"deg, "+skewY+"deg)",
		"transform"        : "rotate("+rotate+"deg) skew("+skewX+"deg, "+skewY+"deg)"
	})
};

function updateCursor() { //Method to change cursor shape to match current tile
	if(currentTile === 1) {
		transformCursor($cursor, -15, -15, -15);
	} else if(currentTile === 2) {
		transformCursor($cursor, 15, 15, 15);
	} else {
		transformCursor($cursor, -45, 15, 15);
	}
}

$cursor.on('click', function(e) { //OnClick method (Place Tile)
	if(currentTile === 1) { //If left wall apply shadow color
		$('<div class="tile '+ tileID[currentTile] + '" style="background: #' + shadowID[currentColor] +'; left:' + (e.pageX - 32) + 'px; top:' + (e.pageY - 32)+ 'px;"></div>').appendTo('body');
	} else {
		$('<div class="tile '+ tileID[currentTile] + '" style="background: #' + colorID[currentColor] +'; left:' + (e.pageX - 32) + 'px; top:' + (e.pageY - 32)+ 'px;"></div>').appendTo('body');
	}
});

$(function(){
	var $tileInfo = $('.tileInfo'), $colorInfo = $('.colorInfo');

	$tileInfo.html("<p>Tile: "+ tileID[currentTile] +"</p>"); //Set tile label

	$(".tileNext").on('click', function(e) { //Cycle through available tiles
		if(currentTile < tileID.length - 1) {
			currentTile++;
		} else {
			currentTile = 0;
		}
		updateCursor();
		updatePreview();
		$tileInfo.html("<p>Tile: "+ tileID[currentTile] +"</p>");
	});
	$(".tilePrevious").on('click', function(e) { //Cycle back through available tiles
		console.log(currentTile);
		if(currentTile > 0) {
			currentTile--;
		} else {
			currentTile = tileID.length - 1;
		}
		updateCursor();
		updatePreview();
		$tileInfo.html("<p>Tile: "+ tileID[currentTile] +"</p>");
	});

	$colorInfo.html("<p>Color: #"+ colorID[currentColor] +"</p>"); //Set color label
	$(".colorNext").on('click', function(e) { //Cycle through available colors
		if(currentColor < colorID.length - 1) { 
			currentColor++;
		} else {
			currentColor = 0;
		}
		updateCursor();
		updatePreview();
		$colorInfo.html("<p>Color: #"+ colorID[currentColor] +"</p>");
	});
	$(".colorPrevious").on('click', function(e) { //Cycle back through available colors
		if(currentColor > 0) {
			currentColor--;
		} else {
			currentColor = colorID.length - 1;
		}
		updateCursor();
		updatePreview();
		$colorInfo.html("<p>Color: #"+ colorID[currentColor] +"</p>");
	});
});

$(document).bind('mousemove', function(e){ //Cursor should follow mouse position (Subtracting origin)
    $cursor.css({
       left:  e.pageX - 32,
       top:   e.pageY - 32
    });
});