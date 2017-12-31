$(document).ready(function(){
	var colors = ["#blueviolet", "#yellow", "#hotpink", "#mediumspringgreen"];
	var rgbColors = ["rgb(138, 43, 226)", "rgb(255, 255, 0)", "rgb(255, 105, 180)", "rgb(0, 250, 154)"];
	var brightColors = ["#6E22B4", "#ffff99", "#cc5490", "#00c87b"];
	var sounds = [new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"), new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"), new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"), new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")];
	var gameColors = [];
	var min = 0;
	var max = 3;
	var count = 0;
	var level = 0;
	var randomNumber;
	var rgbColor;
	
	
	$("#strict button").click(function(){
		if($(".colors").hasClass("easy")){
			$(".colors").removeClass("easy");
			$(this).css("backgroundColor", "white");
		}else{
			$(this).css("backgroundColor", "red");
			$(".colors").addClass("easy");
		}
	});
	$("#on").click(function(){
		generateMoves();
	});
	$("#off").click(function(){
		clearGame();
		console.log("off clicked");
	});
	$("#blueviolet").click(function(){
			mathes("#blueviolet");
	});
	$("#yellow").click(function(){
		mathes("#yellow");
	});
	$("#hotpink").click(function(){
		mathes("#hotpink");
	});
	$("#mediumspringgreen").click(function(){
		mathes("#mediumspringgreen");
	});
	function generateMoves(){
		randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));
			rgbColor = rgbColors[randomNumber];
			gameColors.push(rgbColor);
			console.log("gameColors " + gameColors);
			showMoves();
	}
	function showMoves(){
	console.log("inside showMoves function ");
		var i = 0;
		var moves = setInterval(function(){
			var index = rgbColors.indexOf(gameColors[i]);
			var colorName = colors[index]
			console.log("colorName: " + colorName);
			var bg = $(colorName).css('backgroundColor');//store original bg
			
			$(colorName).css("backgroundColor", brightColors[index]);
			sounds[index].play();
			setTimeout(function(){
				$(colorName).css("backgroundColor", bg);
			}, 500);
			i++;
			if(i >= gameColors.length){
				clearInterval(moves);
			}
		}, 1000);
	}
	function mathes(col){
		var bg = $(col).css('backgroundColor');
		console.log("bg from violet:" + bg);
		var index = rgbColors.indexOf(bg);
		console.log("index :" + index);
		if($(col).css("backgroundColor") == gameColors[count]){
			$(col).css("backgroundColor", brightColors[index]);
			sounds[index].play();
			setTimeout(function(){
				$(col).css("background", rgbColors[index]);
			}, 500);
			//sound.play();
			count = count + 1;
			if(count >= gameColors.length && count < 20){
				level++;
				$("#level").text(level);
				setTimeout(function(){
					count = 0;
					generateMoves();
				}, 2700);
			}
			if(count == 20){
				alert("You won the game!");
				clearGame();
			}
		}else{
			console.log("else");
			console.log("gameColors: " + gameColors);
			if($(".colors").hasClass("easy")){
				console.log("if");
				count = 0;
				console.log("bg from else:" + bg);
				$(col).css("background", "red");
				//sound.play();
				setTimeout(function(){
				console.log("else settimeout bg");
						$(col).css("background", bg);
						
				}, 300);
				setTimeout(function(){
				console.log("else settimeout showMoves()");
						showMoves();
				}, 400);
			}else{
				console.log("if else");
				$(col).css("background", "red");
				//sound.play();
				setTimeout(function(){
				console.log("else settimeout clear()");
						clearGame();
				}, 700);
			}
		}	
	}
	function clearGame(){
		gameColors = [];
		count = 0;
		level = 0;
		$("#level").text(level);
		$("#blueviolet").css("background", "blueviolet");
		$("#yellow").css("background", "yellow");
		$("#hotpink").css("background", "hotpink");
		$("#mediumspringgreen").css("background", "mediumspringgreen");
	}

});