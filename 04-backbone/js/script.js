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
	},
	render: function(movie) {
		$('#list-movies ul').prepend(this.getHtmlForRender(movie));
		$('#list-movies li:first-child').effect( "bounce", { times: 4 }, "slow" );
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
// Code for exercise 5
// ------------------------------------------------------------------------

function emptyTextBoxs() {
	$('input[type="text"]').val('');
	$('textarea').val('');
	$('select').empty();
}

// Add movie
$('#add').click(function() {
	if ($('.add').css('display') !== 'none') {
		$('.add').slideUp('fast');
		emptyTextBoxs();
	}
	else if ( ($('.edit').css('display') === 'none') && ($('.remove').css('display') === 'none')) {
		$('.add').slideDown('fast');
	}
});

$('.add .confirm').click(function() {
	$('div.add').slideUp('fast');

	var movie = new Movie({
		title: $('.add .title').val() || '## Title missing ##',
		genre: $('.add .genre').val() || '## Genre missing ##',
		director: $('.add .director').val() || '## Director missing ##',
		duration: $('.add .duration').val() || '## Duration missing ##',
		year: $('.add .year').val() || '## Year missing ##',
		description: $('.add .description').val() || '## Description missing ##',
		imageFileName: 'missing.jpg'
	});

	collection.add(movie);
	var movieView = new MovieView();
	movieView.render(movie);
	emptyTextBoxs();
});

// Remove movie
$('#remove').click(function() {
	if ($('.remove').css('display')!=='none') {
		$('.remove').slideUp('fast');
		emptyTextBoxs();
	}
	else if ( ($('.edit').css('display') === 'none') && ($('.add').css('display') === 'none')) {
		$('.remove').slideDown('fast');
		for (var i = 0; i < collection.length ; i++)
			$('select.remove').append('<option value="'+collection.models[i].cid+'">'+collection.models[i].attributes.title+'</option>');
	}
});

$('.remove .confirm').click(function() {
	$('div.remove').slideUp('fast');
	var e = document.getElementById("select-remove");
	var movieCID = e.options[e.selectedIndex].value;
	if ((movieCID.length !== undefined) && (movieCID !== '')) {
		$('li.'+movieCID+'.listItem').fadeOut('slow', function() {
			$('li.'+movieCID+'.listItem').remove();
		});

	if (movieCID === movieInDetailsCID)
		$('.movie').remove();

	}
	collection.remove(collection.get(movieCID));
	emptyTextBoxs();
});

// Edit movie
$('#edit').click(function() {
	if ($('.edit').css('display')!=='none') {
		$('.edit').slideUp('fast');
		emptyTextBoxs();
	}
	else if ( ($('.remove').css('display') === 'none') && ($('.add').css('display') === 'none')) {
		$('.edit').slideDown('fast');
		for (var i = 0; i < collection.length ; i++)
			$('#select-edit').append('<option value="'+collection.models[i].cid+'">'+collection.models[i].attributes.title+'</option>');
	}
});

var movieEditingCID = null;
var movieEditingModel = null;

$('#selected').click(function() {
	var e = document.getElementById("select-edit");
	movieEditingCID = e.options[e.selectedIndex].value;
	movieEditingModel = collection.get(movieEditingCID);
	$('.edit .title').val(movieEditingModel.attributes.title || '## Title missing ##');
	$('.edit .director').val(movieEditingModel.attributes.director || '## Director missing ##');
	$('.edit .year').val(movieEditingModel.attributes.year || '## Year missing ##');
	$('.edit .duration').val(movieEditingModel.attributes.duration || '## Duration missing ##');
	$('.edit .genre').val(movieEditingModel.attributes.genre || '## Genre missing ##');
	$('.edit .description').val(movieEditingModel.attributes.description || '## Description missing ##');
});

$('.edit .confirm').click(function() {
	$('div.edit').slideUp('fast');
	
	movieEditingModel.set({
		title: $('.edit .title').val() || '## Title missing ##',
		director: $('.edit .director').val() || '## Director missing ##',
		year: $('.edit .year').val() || '## Year missing ##',
		duration: $('.edit .duration').val() || '## Duration missing ##',
		genre: $('.edit .genre').val() || '## Genre missing ##',
		description: $('.edit .description').val() || '## Description missing ##'
	});

	if ((movieEditingCID.length !== undefined) && (movieEditingCID !== '')) {
		$('li.'+movieEditingCID+'.listItem').fadeOut('slow', function() {
			$('li.'+movieEditingCID+'.listItem').remove();
		});
	}

	if (movieEditingModel instanceof Movie) {
		var movieView = new MovieView();
		movieView.render(movieEditingModel);
	}
	
	// If was the edited movie showing in the details view, update it.
	if (movieEditingCID === movieInDetailsCID)
		detailsView.render(movieEditingModel);

	movieEditingCID = null;
	movieEditingModel = null;
	emptyTextBoxs();
});



// ------------------------------------------------------------------------
// Code to show how it works
// ------------------------------------------------------------------------

var collection = new MovieCollection();
var collectionView = new MovieCollectionView();
var detailsView = new MovieDetailsView();
var movieInDetailsCID;

$.getJSON('js/moviesData.json').done(function(data) {
	for (var i = 0; i < data.movies.length; i++)
		collection.create(data.movies[i]);

	collection.add(new Movie({})); // Add new movie with default values
	collectionView.render(collection);
});
		
$('#list-movies').on('click', '.showDetails', function(event) {
	detailsView.render(collection.get($(event.target).attr('id')));
	movieInDetailsCID = $(event.target).attr('id');
});

// ------------------------------------------------------------------------
// Code to change styles
// ------------------------------------------------------------------------

$('#list-movies').on('mouseover', '.showDetails', function(event) {
	var target = '.' + $(event.target).attr('id');
	$('#list-movies span'+target).css('font-weight', 'bold');
});

$('#list-movies').on('mouseleave', '.showDetails', function(event) {
	var target = '.' + $(event.target).attr('id');
	$('#list-movies span'+target).css('font-weight', '500');
});