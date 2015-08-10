// FAVORITE SECTION - INTEGRATE WITH RESULTS PAGE JS

var checkCookie = getCookie('favorite');
if (checkCookie) {
	var favorite = checkCookie.split(','),
	    person   = $('.person'),
	    howMany  = '<p class="how-many">You Saved <span>' + favorite.length + '</span> Results</p></span>',
	    divider  = '<span class="divider-line"></span>';

	$('.holder').fadeIn(500).html('<p class="saved-text">Saved<br>Results</p>').append(howMany).append(divider);
	
	$.each(favorite, function(i) {
		$.each(person,function(k) {
			if ($(this).find('.name .id').text() === favorite[i]) {
				$(this).addClass('star-block');
				$(this).append('<span class="saved-result"></span>');
				$(this).find('.saved-result').hide().slice(0,1).show();
				$(this).hide().appendTo($('.holder')).show();
			}
		}); // end each person
	}); // end each favorite
} // end if cookie
