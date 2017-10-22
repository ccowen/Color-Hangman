$(document).ready(function() {

	//  reset function -------------------------------------------------
	function reset(){

		remainingPoints = 800
		document.getElementById("points").textContent = remainingPoints;

		pastGuessesArray = [];

		guess = 0;

		document.getElementById("form").reset();

		document.getElementById("guessColorDiv").style.background = "white";

		$("#pastGuesses").empty();

		$("#minusPoints").empty();

		$("#messageBoard").empty();

		// random color picker and variables 

		randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
		$("#questionColorDiv").css('background-color', randomColor);
		console.log("This is the random color's hexidecimal code: " + randomColor);

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

		randomColorScoreR = hexToRgb(randomColor).r;
		randomColorScoreG = hexToRgb(randomColor).g;
		randomColorScoreB = hexToRgb(randomColor).b;

		console.log("This is the random color's R value: " + randomColorScoreR);
		console.log("This is the random color's G value: " + randomColorScoreG);
		console.log("This is the random color's B value: " + randomColorScoreB);

	}

	// ----------------------- win point and guess variables ------------

	var wins = 0;
	document.getElementById("score-wins").textContent = wins;

	var remainingPoints = 800
	document.getElementById("points").textContent = remainingPoints; 

	var pastGuessesArray = [];

	var guess = 0;

	// ---------------- random color picker and variables ---------------------

	var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
	$("#questionColorDiv").css('background-color', randomColor);
	console.log("This is the random color's hexidecimal code: " + randomColor);


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

	console.log("This is the random color's R value: " + randomColorScoreR);
	console.log("This is the random color's G value: " + randomColorScoreG);
	console.log("This is the random color's B value: " + randomColorScoreB);


	// ------------------ function on guess submission ------------------------------
	$("#selectionColorButton").on("click", function () {

		guess++;
	
		// store selection
		var selectionColorScoreR = document.getElementById('selectionColorR').value;
		var selectionColorScoreG = document.getElementById('selectionColorG').value;
		var selectionColorScoreB = document.getElementById('selectionColorB').value;

		console.log("This is the selection score for R: " + selectionColorScoreR);
		console.log("This is the selection score for G: " + selectionColorScoreG);
		console.log("This is the selection score for B: " + selectionColorScoreB);

		// make rgb value, add color to div
		var guessColor = 'rgb(' + selectionColorScoreR + ', ' + selectionColorScoreG + ', ' +  selectionColorScoreB + ')';
		$("#guessColorDiv").css('background-color', guessColor);

		// scoring
		var absoluteValueR = Math.abs(randomColorScoreR - selectionColorScoreR);
		var absoluteValueG = Math.abs(randomColorScoreG - selectionColorScoreG);
		var absoluteValueB = Math.abs(randomColorScoreB - selectionColorScoreB); 

		console.log("This is the absolute difference of R: " + absoluteValueR);
		console.log("This is the absolute difference of G: " + absoluteValueG);
		console.log("This is the absolute difference of B: " + absoluteValueB);

		var scoreDifferenceRGB = absoluteValueR + absoluteValueG + absoluteValueB;

		console.log("This is the calculated score difference of all colors: " + scoreDifferenceRGB);

		// how score affects stuff
		if (pastGuessesArray.includes(guessColor) === true) {
			$("#messageBoard").prepend("<p> (" + guess + ") You already guessed that color. Try a different color!</p>");
		}
		else if (scoreDifferenceRGB === 0) {
			alert("You guessed correctly! Great job!")
			wins++;
			document.getElementById("score-wins").textContent = wins;
			reset();
		}
		else {
			// guessColor stuff for document

			$("#pastGuesses").prepend("<p id='pastGuessesColorText'>" + guessColor + "</p>");

			$("#pastGuesses").prepend("<div id='pastGuessesColorDiv'</div>");

			$("#pastGuessesColorDiv").css({'background-color': guessColor});

			pastGuessesArray.push(guessColor);

			//minus point record
			$("#minusPoints").append(" - " + scoreDifferenceRGB);

			$("#messageBoard").prepend("<p> (" + guess + ") You missed the color by " + scoreDifferenceRGB + " points. Close! Try again.</p>")
			remainingPoints = remainingPoints - scoreDifferenceRGB;
			document.getElementById("points").textContent = remainingPoints;
			if (remainingPoints <= 0) {
				alert("You ran out of points for this color. Try another color!")
				reset();
			}
		}

	})

});



