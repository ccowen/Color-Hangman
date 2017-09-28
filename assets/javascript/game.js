$(document).ready(function() {

	var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
	$("#questionColorDiv").css('background-color', randomColor);
	console.log("This is the selected color's hexidecimal code: " + randomColor);

	var wins = 0;
	document.getElementById("score-wins").textContent = wins;

	var remainingPoints = 800
	document.getElementById("points").textContent = remainingPoints; 

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

	var randomColorScoreR = hexToRgb(randomColor).r;
	var randomColorScoreG = hexToRgb(randomColor).g;
	var randomColorScoreB = hexToRgb(randomColor).b;

	console.log("This is the selected color's R value: " + randomColorScoreR);
	console.log("This is the selected color's G value: " + randomColorScoreG);
	console.log("This is the selected color's B value: " + randomColorScoreB);


	$("#selectionColor").on("click", function () {
	
		var selectionColorScoreR = document.getElementById('selectionColorR').value;
		var selectionColorScoreG = document.getElementById('selectionColorG').value;
		var selectionColorScoreB = document.getElementById('selectionColorB').value;

		console.log("This is the selection score for R: " + selectionColorScoreR);
		console.log("This is the selection score for G: " + selectionColorScoreG);
		console.log("This is the selection score for B: " + selectionColorScoreB);

		var guessColor = 'rgb(' + selectionColorScoreR + ', ' + selectionColorScoreG + ', ' +  selectionColorScoreB + ')';
		$("#guessColorDiv").css('background-color', guessColor);

		var absoluteValueR = Math.abs(randomColorScoreR - selectionColorScoreR);
		var absoluteValueG = Math.abs(randomColorScoreG - selectionColorScoreG);
		var absoluteValueB = Math.abs(randomColorScoreB - selectionColorScoreB); 

		console.log("This is the absolute difference of R: " + absoluteValueR);
		console.log("This is the absolute difference of G: " + absoluteValueG);
		console.log("This is the absolute difference of B: " + absoluteValueB);

		var scoreDifferenceRGB = absoluteValueR + absoluteValueG + absoluteValueB;

		console.log("This is the calculated score difference of all colors: " + scoreDifferenceRGB);

		console.log(scoreDifferenceRGB);

		if (scoreDifferenceRGB === 0) {
			alert("You guessed correctly! Great job!")
			wins++;
			document.getElementById("score-wins").textContent = wins;

		}
		else {
			alert("You missed the color by " + scoreDifferenceRGB + " points. Close! Try again.")
			remainingPoints = remainingPoints - scoreDifferenceRGB;
			document.getElementById("points").textContent = remainingPoints; 
		}

		$("#pastGuesses").prepend("<div id=pastGuessesColorDiv>" + "</div>" + guessColor);
		$("#pastGuessesColorDiv").css({'background-color': guessColor, 'width': '50px'});

		$("#minusPoints").append(" - " + scoreDifferenceRGB);



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



	// if scoreDifferenceRGB = 0, win++, board resets

	// subtractt scoreDifferenceRGB from remaining points

	// if score =< 0 points, game over; everything resets */

});



