$(window).on("load", function() {
	
	

	/* Events */
	
	$('.map').mousemove(function(e){
		currPos = $('.map').position();
		var x = e.pageX - currPos.left;
		var y = e.pageY - currPos.top;
		$('.location').html("X: " + x.toFixed(2) + "<br> Y: " + y.toFixed(2)); 
	});
		
	$('.map').click(function(evt){
		if(evt.ctrlKey && devActive == true){
			newPOIs++;
			var newID = morphToThree(POIobjs.length);
			POIobjs.push({
				POIid: 		"A"+newID,		
				hoverText: 	$('#inputHoverText').val(),
				popupText: 	$('#inputPopupText').val(),
				popupHeaderImage: "robe",
				x:			evt.pageX - currPos.left - 10,
				y:			evt.pageY - currPos.top - 10
			});
				$('#inputHoverText').val("");
				$('#inputPopupText').val("");
			POIarray.push( new PointOfInterest(POIobjs[POIobjs.length-1].POIid, POIobjs[POIobjs.length-1].hoverText, POIobjs[POIobjs.length-1].popupText, POIobjs[POIobjs.length-1].popupHeaderImage, POIobjs[POIobjs.length-1].x, POIobjs[POIobjs.length-1].y) );

			var classes = [' all',' some',' none'];
			var realArrowView = currArrowView - 1;
			if(realArrowView < 0){
			   realArrowView = 2;
			   }
			$('#A'+morphToThree(newID)).addClass(classes[realArrowView]);

		   }
		directArrows();
	});
		
	$(document).on("mouseenter", ".POI", function() {
		var thisChild = $(this).children('.child');

		$(this).children('img').attr("src","images/mapIcon-POI-focused.svg");
		var currArrow = $(this).children('.arrowFrom');
		TweenMax.set(thisChild, { display: "block" });
		thisChild.first().text(POIobjs[parseInt(this.id.slice(-3))].hoverText);
		TweenMax.to(thisChild, 0.5, { opacity: 1 });
		TweenMax.to(currArrow, 0.5, { opacity: 1 });
	});
		
	$(document).on("mouseleave", ".POI", function() {
		var thisChild = $(this).children('.child');		
		if(!$(this).hasClass('active')){
				$(this).children('img').attr("src","images/mapIcon-POI.svg");   
		   }

		TweenMax.to(thisChild, 0.5, { opacity: 0, onComplete: function(){
			TweenMax.set(thisChild, { display: "none" });
		} });
		var currArrow = $(this).children('.arrowFrom');
		TweenMax.to(currArrow, 0.5, { opacity: 0.5 });
	});

	$(document).on('click', '.POI', function() {
			$('.POI').removeClass('active').removeClass('beforeActive');
			$('.ntPOI').removeClass('active');
			$(this).addClass('active');
			if($(this).prev().is("div")){
			   $(this).prev().addClass('beforeActive');
			}
			/* This also needs to be reset in Nav button clicks too! */

			var currID = this.id;

			showPopUp(currID);
			navCheck(currID.slice(-3));
			navToPOI();
			activeUpdate();

	});
		
	$(document).on("mouseenter", ".ntPOI", function() {
		var thisChild = $(this).children('.child');
		$(this).children('img').attr("src","images/mapIcon-ntPOI-focused.svg");
		TweenMax.set(thisChild, { display: "block" });
		thisChild.first().text(ntPOIobjs[parseInt(this.id.slice(-3))].hoverText);
		TweenMax.to(thisChild, 0.5, { opacity: 1 });
	});
		
	$(document).on("mouseleave", ".ntPOI", function() {
		var thisChild = $(this).children('.child');		

		if(!$(this).hasClass('active')){
				$(this).children('img').attr("src","images/mapIcon-ntPOI.svg");   
		   }
		TweenMax.to(thisChild, 0.5, { opacity: 0, onComplete: function(){
			TweenMax.set(thisChild, { display: "none" });
		} });
	});

	$(document).on('click', '.ntPOI', function() {
			$('.POI').removeClass('active').removeClass('beforeActive');
			$('.ntPOI').removeClass('active')
			$(this).addClass('active');

			var currID = this.id;

			showPopUp(currID);
			navToNTPOI();
			activeUpdate();

	});
		
	$('.button').click(function(){
		if(newPOIs > 0){

			var poiText = [newPOIs];

			for ( var i = 0; i < newPOIs; i++) { 
				var thisText = "";
				thisText += ",<br>";
				thisText += "{<br>";
				thisText += "POIid: 				\""+POIobjs[parseInt(POIobjs.length - (newPOIs - i))].POIid +"\",<br>";
				thisText += "hoverText: 			\""+POIobjs[parseInt(POIobjs.length - (newPOIs - i))].hoverText+"\",<br>";
				thisText += "popupText: 			\""+POIobjs[parseInt(POIobjs.length - (newPOIs - i))].popupText+"\",<br>";
				thisText += "popupHeaderImage:	\"robe\",<br>";
				thisText += "x:					"+POIobjs[parseInt(POIobjs.length - (newPOIs - i))].x+",<br>";
				thisText += "y:					"+POIobjs[parseInt(POIobjs.length - (newPOIs - i))].y+"<br>";
				thisText += "}";  

				poiText[i] = thisText;
			}
			childWindow = window.open('','childWindow','location=yes, menubar=yes, toolbar=yes');

			childWindow.document.open();
			childWindow.document.title = "BigMap - New POIs";          

			childWindow.document.write('<html><head></head><body>');

			for ( var ii = 0; ii < newPOIs; ii++) {
				childWindow.document.write('<p>'+poiText[ii]+'<p>');

			}
			childWindow.document.write('</body></html>');

		 } 

	});
		
	$('.nav').click(function(){
		var currActive = $('.active').attr('id').slice(-3);
		var newActive; 
		if($('.active').hasClass('POI')){
			if($(this).hasClass('Left')){
					if(currActive > 0){
						newActive = parseInt(currActive) - 1;
					   } 
			   } else {
				   if(currActive < $('.POI').length-1){
						newActive = parseInt(currActive) + 1;	
					  }
			   }
			var newActiveString = morphToThree(newActive);
			navCheck(newActiveString);
			$('.POI').removeClass('active').removeClass('beforeActive');
			$('#A'+newActiveString).addClass('active');
			showPopUp($('.active').attr('id'));
			someChecker(newActive);
		} else if($('.active').hasClass('ntPOI')){
			if($(this).hasClass('Left')){
					if(currActive > 0){
						newActive = parseInt(currActive) - 1;
					   } else { 
						newActive = $('.ntPOI').length-1;
					   }
			   } else {
				   if(currActive < $('.ntPOI').length-1){
						newActive = parseInt(currActive) + 1;	
					  } else { 
						newActive = 0;	
					  }
			   }
			var newActiveString = morphToThree(newActive);
			//navCheck(newActiveString);
			$('.ntPOI').removeClass('active');
			$('#B'+newActiveString).addClass('active');
			showPopUp($('.active').attr('id'));
		 }			
			activeUpdate();
	});
		
			
	$('.arrowAdjust').click(function(){
		if(currArrowView > 2){
		   currArrowView = 0;
		   }
		var classes = [' all',' some',' none'];
		  $('.POI').each(function(){
			  for (i = 0; i < classes.length; i++) { 
				$(this).removeClass(classes[i]);
				$(this).removeClass('beforeActive');  
			  }

			  $(this).addClass(classes[currArrowView]);

		  });

		var currActive = $('.active').attr('id').slice(-3);


		someChecker(parseInt(currActive));
		currArrowView++  


	});	
		
		
	$(document).on("click", ".gotoAndSee" , function() {
		var chosenPOIID = $(this).data('gotoid');
		var chosenPOIPOS = $('#'+chosenPOIID).position();
		var windowWidth = parseInt(window.innerWidth * .79);
		var windowHeight = window.innerHeight;
		//var currPos = $('#'+currID).position();
		var gotoLeft = chosenPOIPOS.left * -1;
		var gotoTop = chosenPOIPOS.top * -1;
		var panToX = adjustIfOutside(gotoLeft, windowWidth, "width");
		var panToY = adjustIfOutside(gotoTop, windowHeight, "height");
		TweenMax.to($('.map'), 0.75, { x: panToX, y: panToY, ease: Power2.easeInOut, onComplete: function(){
			TweenMax.to($('#'+chosenPOIID), 0.5, { y: -50, ease: Power2.easeOut, onComplete: function(){
				TweenMax.to($('#'+chosenPOIID), 0.5, { y: 0, ease: Bounce.easeOut, onComplete: function(){
					gotoPOI($('.active').attr("id"));
				}});
			 }}) ;
		}});
	}); 
	
	init();
	
});
		
	
/* Variables */
	
	var draggable;
	var devActive = false;

	var POIarray = [];
	var ntPOIarray = [];

	var currPos = $('.map').position();

	var newPOIs = 0;
	
	var currArrowView = 0
	
/* Classes */

class ntPointOfInterest{
		constructor(i, h, p, hi, x, y){
			this.ntPOIid = i;
			this.hoverText = h;
			this.popupHeaderImage = hi;
			this.popupText = p;

			$('.map').append('<div class="ntPOI" id="'+i+'"><img src="images/mapIcon-ntPOI.svg"><div class="child"></div></div>');
			$('#'+i).css({left: x, top: y });
		}
	}
	class PointOfInterest{
		constructor(i, h, p, hi, x, y){
			this.POIid = i;
			this.hoverText = h;
			this.popupHeaderImage = hi;
			this.popupText = p;

			$('<div class="POI" id="'+i+'"><img src="images/mapIcon-POI.svg"><div class="child"></div><div class="arrowFrom"><img src="images/arrow.svg"></div></div>').insertBefore('#B000');
			$('#'+i).css({left: x, top: y });
		}

		toot(){
		}
	}	
	
	
/* Functions */		

function navToNTPOI(){
	$('.nav').removeClass('disable');
}

function navToPOI(){
}

function activeUpdate(){

	if($('.active').hasClass('POI')){
		$('.POI').children('img').attr("src","images/mapIcon-POI.svg");
		$('.active').children('img').attr("src","images/mapIcon-POI-focused.svg");

	} else if($('.active').hasClass('ntPOI')){
		$('.ntPOI').children('img').attr("src","images/mapIcon-ntPOI.svg");
		$('.active').children('img').attr("src","images/mapIcon-ntPOI-focused.svg");
	}

}

function getSize() {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var mapWidth = $('img').width();
	var mapHeight = $('img').height();

	var newMinX, newMinY, newMaxX, newMaxY;

	newMinX = windowWidth * .79 - mapWidth; 
	newMinY = windowHeight - mapHeight;
	newMaxX = 0
	newMaxY = 0	

	draggable[0].applyBounds({minX: newMinX, minY: newMinY, maxX: newMaxX, maxY: newMaxY} );
}

function init(){

	
	for ( var ii = 0; ii < ntPOIobjs.length; ii++) { 
		ntPOIarray[ii] = new ntPointOfInterest(ntPOIobjs[ii].ntPOIid, ntPOIobjs[ii].hoverText, ntPOIobjs[ii].popupText, ntPOIobjs[ii].popupHeaderImage, ntPOIobjs[ii].x, ntPOIobjs[ii].y);
	}
	

	for ( var i = 0; i < POIobjs.length; i++) { 
		POIarray[i] = new PointOfInterest(POIobjs[i].POIid, POIobjs[i].hoverText, POIobjs[i].popupText, POIobjs[i].popupHeaderImage, POIobjs[i].x, POIobjs[i].y);
	}

	
	draggable = Draggable.create($('.map'));
	directArrows();
	getSize();
	$('#A000').click();
	$('.arrowAdjust').click();	

}

function onKonamiCode(cb) {
  var input = '';
  var key = '38384040373937396665';
  document.addEventListener('keydown', function (e) {
	input += ("" + e.keyCode);
	if (input === key) {
	  return cb();
	}
	if (!key.indexOf(input)) return;
	input = ("" + e.keyCode);
  });
}

onKonamiCode(function () {
	alert('Dev mode activated');
	$('.devTools').css('display', 'block');
	devActive = true;
});

function getDistanceToNext(x1, x2, y1, y2){
	var a = x1 - x2;
	var b = y1 - y2;

	var c = Math.sqrt( a*a + b*b );

	return c;
}

function directArrows(){

	for ( var i = 0; i < $('.POI').length - 1; i++) { 
		var currNumString = morphToThree(i);

		$('#A'+currNumString).children('.arrowFrom').css('display', 'block');

		var currPos = $('#A'+currNumString).position();
		var nextPos = $('#A'+currNumString).next(".POI").position();
		var angleToNext = Math.atan2(nextPos.top - currPos.top, nextPos.left - currPos.left) * 180 / Math.PI;
		var distanceToNext = getDistanceToNext(currPos.left,nextPos.left,currPos.top,nextPos.top ); 

		var currArrow = $('#A'+currNumString).children('.arrowFrom');

		currArrow.css('width', distanceToNext - 20+'px');	
		currArrow.css('display', 'block');
		currArrow.css('transform', 'rotate('+angleToNext+'deg');
		currArrow.css('transform-origin', '-10px 7.5px');

	}
	var finalNum = $('.POI').length - 1;
	var finalNumString = morphToThree(finalNum);
	$('#A'+ finalNumString).children('.arrowFrom').css('display', 'none');

}	


function showPopUp(currID){
	var ntOrPOI = currID.substring(0, 1);
	if (ntOrPOI === 'A'){
		var currObj = POIobjs[parseInt(currID.slice(-3))];
		} else if(ntOrPOI === 'B'){
		var currObj = ntPOIobjs[parseInt(currID.slice(-3))];
	}
	TweenMax.from($('.popupText'), 0.5, { opacity: 0, top: 25 });
	TweenMax.from($('.popupHeader'), 0.5, { opacity: 0, onStart: function(){
		$('.popupHeader').find('img').attr("src", "images/"+currObj.popupHeaderImage+".svg");
		//$(this).children('img').attr("src","images/mapIcon-POI-focused.svg");
		$('.nav').addClass('blocked');
	}, onComplete: function(){
		$('.nav').removeClass('blocked');
	} });
	$('.popupText').html(currObj.hoverText+"<br><br>"+currObj.popupText);

	gotoPOI(currID);

}	

function navCheck(newActive){
	$('.nav').removeClass('disable');
	if(newActive == 0){
	   $('.Left').addClass('disable');
	   }else if(newActive == $('.POI').length - 1){
		$('.Right').addClass('disable');
	}
}	

function morphToThree(currNum){
	var currNumString = currNum.toString();
	for (i = currNumString.length; i < 3; i++) { 
		currNumString =  + "0"+currNumString; /*+ currNumString*/;
	}
	return currNumString;

}	

function someChecker(newActive){
	if($('.active').hasClass('some')){

		if(newActive != 0) {
			var prevActive = newActive - 1;
			$('#A'+morphToThree(prevActive)).addClass('beforeActive');
		}
   }
}	



function accentPOI(){
	var windowWidth = window.innerWidth * .79;
	var windowHeight = window.innerHeight;
	//var currPos = $('#'+currID).position();
	var gotoLeft = chosenPOIX
	var gotoTop = chosenPOIY
	var panToX = adjustIfOutside(gotoLeft, windowWidth, "width");
	var panToY = adjustIfOutside(gotoTop, windowHeight, "height");
	TweenMax.to($('.map'), 0.75, { x: panToX, y: panToY, ease: Power2.easeInOut });

	var currID = $('.active').attr("id");
	setTimeout(gotoPOI, 2000, currID);

}	


function adjustIfOutside(currPos, windowMeasurement, widthOrHeight){
	console.log(currPos+" position, "+windowMeasurement +" measurement of "+ widthOrHeight);
	if (widthOrHeight === "width"){
		if (currPos + (windowMeasurement * 1/2) >0){
			return 0;
		} else if (currPos + (windowMeasurement * 1/2) <0 && currPos + (windowMeasurement * 1/2) > ($('.map').width() * -1) + windowMeasurement){
		//} else if ( currPos > ( $('.map').width() - windowMeasurement ) ) {
			console.log("current position "+currPos);
			console.log("Map width, and negatuive map width "+$('.map').width()+"  "+($('.map').width() * -1));
			console.log("Window measurement is "+windowMeasurement)
			
			//return ($('.map').width() * -1) + windowMeasurement;
			return currPos + (windowMeasurement * 1/2);
		} else {
			return ($('.map').width() * -1) + windowMeasurement;
		}		
	} else {
		if (currPos + (windowMeasurement * 1/2) >0){
			return 0;
		} else if (currPos*-1 > ($('.map').width() - windowMeasurement)) {
			return ($('.map').height() * -1) + windowMeasurement;
		} else {
			return currPos + (windowMeasurement * 1/2);	
		}	
	}

};	

function gotoPOI(currID){

	var windowWidth = parseInt(window.innerWidth * .79);
	var windowHeight = window.innerHeight;
	var currPos = $('#'+currID).position();
	var currPosLeft = currPos.left * -1
	var currPosTop = currPos.top * -1
	var panToX = adjustIfOutside(currPosLeft, windowWidth, "width");
	var panToY = adjustIfOutside(currPosTop, windowHeight, "height");
	console.log(panToX +"X "+panToY +"Y is our new location");
	TweenMax.to($('.map'), 0.75, { x: panToX, y: panToY, ease: Power2.easeInOut });
}
