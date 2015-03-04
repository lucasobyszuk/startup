function addMsg(msg) {
	$('.greeting').append('<div class="response"><p>'+msg+'</p></div>');
	$('.response').slideDown('slow');
}

function highlightName(name) {
// 10. Create a function to highlight your name in the server response content.
// Call it right after setting the response inside the div.
	var greeting = $('.response:last-child p').html().replace(name,'<span style="text-decoration: underline;">'+name+'</span>');
	$('.response:last-child p').html(greeting);
}

function search(artist) {
	$.ajax({
	url: 'https://api.spotify.com/v1/search',
	type: 'GET',
	dataType: 'json',
	data: { q: artist, type: 'album' }
	})
	.done( function(data) {
		$('.albums').append('<p class="results">results from '+artist+'</p>');
		for (var i = 0; i < data.albums.items.length; i++) {
			(function(album) {
				$.getJSON(album.href).done( function(data) {
					$('.albums').append('<article><img src="'+album.images[0].url+'"><h2>'+album.name+'</h2><h3>'+album.album_type+'</h3><p>'+data.release_date+'</p><a href="'+album.external_urls.spotify+'">Play on Spotify</a></article>');
				})
				.fail(function() {
					console.log('Failed to request information of the album: '+album.name);
					$('.albums').append('<p class="fail">Failed to request information of the album: '+album.name+'</p>');
				});
			})(data.albums.items[i]);
		}
	})
	.fail(function() {
		console.log('Failed to request information of albums to Spotify.');
		$('.albums').append('<p class="fail">Failed to request information of albums to Spotify.</p>');
	});
}

$(document).ready( function() {
	
	$('.greeting').fadeIn(2000, function() {
		$('.alias').focus();
	});

	// Exercise 7: Attach an event to the "alias" button which calls a function that gets a response from http://bootcamp.aws.af.cm/welcome/yourname
	$('.reqGreeting').click( function() {

		var alias = $('.alias').val();
		
		// if the textbox is complete
		if ( alias !== "") {

			$.getJSON('http://bootcamp.aws.af.cm/welcome/'+alias).done( function(data) {
				// display the new message
				addMsg(data.response);
				// Exercise 10
				highlightName(alias);
			})
			.fail(function() {
				addMsg('<span class="fail">Server error</span>');
			});

			$('.alias').val('');
			$('.alias').prop('placeholder','');
		}
		// if the textbox is empty
		else {
			$('.alias').prop('placeholder','Hey! Complete me.');
		};
	});

	// Exercise 11
	search('Rolling Stones');
	// Exercise 12: Add an input type="text", and reuse the code for exercise 11, so the user can perform search for any artist albums
	$('.reqAlbums').click(function() {
		
		var artist = $('.artist').val();

		// if the textbox is complete
		if (artist !== "") {
			
			// Remove old results
			$('.results, .albums article, .albums .fail').remove();

			// Search and display results
			search(artist);

			$('.artist').val('');
			$('.artist').prop('placeholder','');
		}
		else {
			$('.artist').prop('placeholder','Hey! Complete me.');
		}
	});

});

