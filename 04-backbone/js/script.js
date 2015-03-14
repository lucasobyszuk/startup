var data = {
	"movies": [
		{
			"title": "Gladiator",
			"genre": "Action, Drama",
			"director": "Ridley Scott",
			"duration": "155 minutes",
			"year": "2000",
			"description": "When a Roman general is betrayed and his family murdered by an emperor's corrupt son, he comes to Rome as a gladiator to seek revenge.",
			"imageFileName": "gladiator.jpg"
		},

		{
			"title": "Edge Of Tomorrow",
			"genre": "Action, Sci-Fi",
			"director": "Doug Liman",
			"duration": "113 minutes",
			"year": "2014",
			"description": "A military officer is brought into an alien war against an extraterrestrial enemy who can reset the day and know the future. When this officer is enabled with the same power, he teams up with a Special Forces warrior to try and end the war.",
			"imageFileName": "edgeoftomorrow.jpg"
		},

		{
			"title": "Resident Evil 2",
			"genre": " Action, Horror, Sci-Fi",
			"director": "Alexander Witt",
			"duration": "94 minutes",
			"year": "2004",
			"description": "Alice awakes in Raccoon City, only to find it has become infested with zombies and monsters. With the help of Jill Valentine and Carlos Olivera, Alice must find a way out of the city before it is destroyed by a nuclear missile.",
			"imageFileName": "residentevil2.jpg"

		},

		{
			"title": "The Hangover",
			"genre": "Comedy",
			"director": "Todd Phillips",
			"duration": "100 minutes",
			"year": "2009",
			"description": "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
			"imageFileName": "thehangover.jpg"
		}
	]
}

$(document).ready(function() {
	// Render first movie in 'data'
	var template = $('#movie-template').html();
	var html = Handlebars.compile(template);
	$('#details').append(html(data.movies[0]));

	// Render list of movies
	template = $('#list-movies-template').html();
	html = Handlebars.compile(template);
	$('#list-movies').append(html(data));
});