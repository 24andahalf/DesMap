$(window).on("load", function() {

	var objectNames = Object.keys(ipedia);
	var size = objectNames.length;

	// build Main buttons
	
	// have buttons add in data that is its key so we can easily call that later down the code. Yay smart Bill!
	for (var i = 0; i < size; i++) { 
		$('.buttonContainer').append('<div class="button main" id="'+i+'">'+ipedia[objectNames[i]].title+'</div>');
	}
		
	// add Return button and hide it
		$('.returnContainer').append('<div class="button return">Return</div>');
		$('.return').hide();

	// Main button interaction
	$(document).on('click', '.main', function() {
		var thisID = $(this).attr('id');
		var objectChildNames = Object.keys(ipedia[objectNames[thisID]]);
		var sizeChild = objectChildNames.length;
		var thisChild = ipedia[objectNames[thisID]];
		var thisChild = ipedia[objectNames[thisID]]
		$(this).removeClass('main').addClass('open');

		for (var i2 = 0; i2 < size; i2++) { 
			if (thisID != i2){
					$('#'+i2).hide();
				}
		}
		// add sub buttons
		for (var i3 = 1; i3 < sizeChild; i3++) { 
			$('.subButtonContainer').append('<div class="button sub" id="'+thisID+"-"+i3+'">'+ipedia[objectNames[thisID]]['object'+i3].name+'</div>');
			//console.log(ipedia['playerCharacters']['object1'].name);
			//console.log(thisChild.['object'+ii].name);
			
		}
		$('.return').show();
		
	});
	
	
	// Main button inetraction after it was already clicked once and "opened"
	$(document).on('click', '.open', function() {
		$('.open').removeClass('open').addClass('main');
		$('.main').show();
		$('.sub').remove();
		$('.return').hide();
		
	});
	
	// Return button interaction
	$(document).on('click', '.return', function() {
		$('.open').removeClass('open').addClass('main');
		$('.main').show();
		$('.sub').remove();
		$('.return').hide();
		
	});
	
	// Sub button inetractions. Any button "inside" of a main button will have this fire on click
	$(document).on('click', '.sub', function() {
		var thisID = $(this).attr('id');
		var theseIDs = thisID.split("-");
		var objectChildNames = Object.keys(ipedia[objectNames[theseIDs[0]]]);
		// remove any previous content inside the info element
		clearInfo();
		// add new content to the info element
		$('.info')
		
		if( ipedia[objectNames[theseIDs[0]]].title == "PCs" ){
				$('.infoImg').append('<img src="'+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].image+'">');
				$('.infoBasics').html("<p>Name: "+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].name+"</p><p>Age: "+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].age+"</p><p>Height: "+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].height+"</p><p>Weight: "+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].weight+"</p><p>Class: "+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].class+"</p><p>Catchphrase: "+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].catchphrase+"</p>");
				$('.infoExtra').html("<p>"+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].bio+"</p>");
		   } else {
				$('.infoImg').append('<img src="'+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].image+'">');
				$('.infoBasics').html("<p>"+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].name+"</p>");
				$('.infoExtra').empty("<p>"+ipedia[objectNames[theseIDs[0]]]['object'+theseIDs[1]].info+"</p>");
			}
		// "close" the main button that was open
		$('.open').removeClass('open').addClass('main');
		$('.main').show();
		$('.sub').remove();
		$('.return').hide();
		
	});
	
	function clearInfo(){
		$('.infoImg').empty();
		$('.infoBasics').empty();
		$('.infoExtra').empty();
	}
	
});