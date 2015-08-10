// create our url structure and gather other items for card slider
	var searchResults = '/search/resultsJSON/' + state + '/' + lastName + '/' + firstName,
			headCount     = 0,
			output        = '',
			checkCity,
			state;

	// grab the data via getJSON and...
	$.getJSON(searchResults, function(json) {
		var person = json;
		$.each(person, function(i) {
			checkCity  = person[i].priorAddresses,
			state      = person[i].state[0];
			
			headCount++;
			
			$('.card-slider ul').append(
				'<li class="preview-card noselect">' +
				'<h2>' + person[i].first_name + ' ' + person[i].last_name + '</h2>' +
				'<p class="card-age">Age ' + person[i].age + '</p>' +
				prior(checkCity, state) +
				'<span class="id">' + person[i].person_id + '</span>' +
			 	'<button>save for later</button>' +
			 	'<i class="checky"> <img src="/assets/themes/deboot/img/results/icon-checky.png" </li>' + 
			 	'</li>'
			);

			// create quick way to check for verified results and display the checky icon
			var firstCardInitial = person[i].first_name.charAt(0),
					lastCardName     = person[i].last_name,
					firstInitial     = window.firstName.charAt(0),
					lastName         = window.lastName;
			  	
			if (firstInitial === firstCardInitial && lastName === lastCardName) {
				var checky = $('.preview-card .checky');
				$(checky[i]).show();
			}
				
			// calulate width for our card slider
			var howMany    = $('.preview-card').length,
					howWide    = $('.preview-card').width() + 42,
					totalWidth = howMany * howWide;

			$('.card-slider').css({'width' : totalWidth + '%'});

		}); // end each
	}).done(function() {
		cardEvents();
	}); // end getJSON

	// create way to get proper states array
	// and return first 3 cites 
	function prior(checkCity, state) {
		var cities = [];
		$(checkCity).each(function(k) {
			if(checkCity[k].city.length) {
				cities.push('<p class="card-locations">' + checkCity[k].city + ', ' + checkCity[k].state + '</p>');
			}
		});
		cities.splice(3, cities.length);
		return cities.join('');
	} // end prior()

	// create function to handle card events once 
	// getJSON is done
	function cardEvents() {
		var tracker   = 0,
				width     = $(document).width(),
				scrollNum = width < 480 ? '17em' : '75.9%';

		$('#cards-preview').addClass('pad-it');
		$('.cards-wrap').addClass('open-wrap');
		$('.card-slider').delay(500).fadeIn(500);
			
		$('.arrow-left').fadeOut();

		// scroll right
		$('.arrow-right').on('click', function() {
			tracker += 4;
			if (tracker >= 0) $('.arrow-left, .reset').fadeIn();
			if (tracker >= headCount - 4) $(this).fadeOut();
			$('.card-slider').animate({'left' : '-=' + scrollNum});
		});

		// scroll left
		$('.arrow-left').on('click', function() {
			tracker -= 4;
			if (tracker <= 0) $('.arrow-left, .reset').fadeOut();
			if (tracker >= 0) $('.arrow-right').fadeIn();
			$('.card-slider').animate({'left' : '+=' + scrollNum});
		});

		// reset back to position left: 0
		$('.reset').on('click', function() {
			tracker = 0;
			$('.arrow-left, .reset').fadeOut();
			$('.arrow-right').fadeIn();
			$('.card-slider').animate({'left':'0'});
		});

		// hover states for cards
		$('.preview-card').on('mouseenter', function() {
			$(this).addClass('open shadow');
		});
		$('.preview-card').on('mouseleave', function() {
			$(this).removeClass('open shadow');
		});

		// click a person card
		$('.preview-card').on('click', function() {
			$(this).toggleClass('bg favorite');
			$(this).children('.preview-card button').toggleClass('button-solid');
			if ($(this).hasClass('bg')) {
				$(this).children('.preview-card button').text('saved!');
			} else {
				$(this).children('.preview-card button').text('save for later');
			}
		});

		// swipe events
		$('.preview-card').swipe( {
      swipe: function(event, direction) {
    		if (direction === 'left') {
    			tracker += 4;
    			$('.card-slider').animate({'left' : '-=' + scrollNum});
      	}
      	else if (direction === 'right') {
      		if (tracker > 0) {
      			tracker -= 4;
      			$('.card-slider').animate({'left' : '+=' + scrollNum});
      		}
      	}
      }
    });
	} // end cardEvents()
