$(document).ready(function() {

	$("#startButton").on("click", function () {
		var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
		$("#questionColorDiv").css('background-color', randomColor);
		console.log(randomColor);
	})

	/* 
	next steps initiate when user guesses a color

	code to save hexidecimal submission

	var selectedColors = array for past selections -- selectionInput
	put latest guess in color div and past guesses div

	$("#selectionInput").on("click", function () {
		push selectionInput to selectedColors;
		$(#guessColorDiv").css('background-color', selectionInput);
		$("#pastGuesses").prepend("<div>" + selectionInput);
		console.log("latest selected color " + selectionInput);
	})

	*/

	// convert hexidecimal to rgb for score calculation
	function hexToRgb(hex) {
	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}

	/* examples
	alert( hexToRgb("#0033ff").g ); // "51";
	alert( hexToRgb("#03f").g ); // "51";
	*/

	var randomColorScoreR = hexToRgb(randomColor).r;
	var randomColorScoreG = hexToRgb(randomColor).g;
	var randomColorScoreB = hexToRgb(randomColor).b;

	var selectionColorScoreR = hexToRgb(selectionInput).r;
	var selectionColorScoreG = hexToRgb(selectionInput).g;
	var selectionColorScoreB = hexToRgb(selectionInput).b;

	var absoluteValueR = Math.abs(randomColorScoreR - selectionColorScoreR);
	var absoluteValueG = Math.abs(randomColorScoreG - selectionColorScoreG);
	var absoluteValueB = Math.abs(randomColorScoreB - selectionColorScoreB);

	var scoreDifferenceRGB = absoluteValueR + absoluteValueG + absoluteValueB;

	// if scoreDifferenceRGB = 0, win++, board resets

	// subtractt scoreDifferenceRGB from remaining points

	// if score =< 0 points, game over; everything resets

});



