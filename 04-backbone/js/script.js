// ------------------------------------------------------------------------
// Model
// ------------------------------------------------------------------------

Movie = Backbone.Model.extend({
	defaults: {
		title: '## Title missing ##',
		genre: '## Genre missing ##',
		director: '## Director missing ##',
		duration: '## Duration missing ##',
		year: '## Year missing ##',
		description: '## Description missing ##',
		imageFileName: 'missing.jpg'
	}
});

// ------------------------------------------------------------------------
// Collection
// ------------------------------------------------------------------------

MovieCollection = Backbone.Collection.extend({
	model : Movie,
	localStorage: new Backbone.LocalStorage('movies')
});

// ------------------------------------------------------------------------
// Views
// ------------------------------------------------------------------------

MovieView = Backbone.View.extend({
	getHtmlForRender: function(movie) {
		return Handlebars.compile($('#movie-template').html())(movie);
	}
});

MovieDetailsView = Backbone.View.extend({
	render: function(movie) {
		$('#details').html(Handlebars.compile($('#movie-details-template').html())(movie));
	}
});

MovieCollectionView = Backbone.View.extend({
	render: function(collection) {
		var itemView = new MovieView();
		var htmlUnorderedList = '<ul>';
		for (var i = 0; i<collection.length; i++)
			htmlUnorderedList += itemView.getHtmlForRender(collection.at(i));
		htmlUnorderedList += '</ul>';
		$('#list-movies').append(htmlUnorderedList);
	}
});

// ------------------------------------------------------------------------
// Code to show how it works
// ------------------------------------------------------------------------

var film = new Movie(); // new Movie with default values
var collection = new MovieCollection();
var collectionView = new MovieCollectionView();
var detailsView = new MovieDetailsView();

collection.add(film);

$.getJSON('js/moviesData.json').done(function(data) {
	for (var i = 0; i < data.movies.length; i++)
		collection.create(data.movies[i]);
	collectionView.render(collection);
});
		
$('#list-movies').on('click', '.showDetails', function(event) {
	detailsView.render(collection.get($(event.target).attr('id')));
});

