// Here is the code of exercises 8-12
// I assumed it would have to be here,
// because exercise 7 say "previous code".
// Module order by exercise 7 is "movie.js"
// In "movie.js" is the code of the exercises 1 to 6.

function DownloadableMovie() {
	Movie.call(this); // Call to super-constructor
}

// Create a DownloadableMovie.prototype object that inherits from Movie.prototype
DownloadableMovie.prototype = Object.create(Movie.prototype);
// I could write "new Movie()" instead of "object.create"
// I dislike this option because if Movie constructor had arguments
// we don't have anything to give Movie in this moment.
// These arguments would have to be in the DownloadableMovie constructor. I.e.:
// function DownloadableMovie(args) {
// 	Movie.call(this,args); 
// }


// Set the "constructor" property to refer to DownloadableMovie
// This is necessary because Object.create changed the constructor property
DownloadableMovie.prototype.constructor = DownloadableMovie;

// Add a download method.
DownloadableMovie.prototype.download = function() {
		console.log("Downloading movie");
}

// Mixin object
var Social = {
	share: function(friendName) {
		console.log('Sharing '+this.get('title')+' with '+friendName);

	},

	like: function() {
		console.log('You like '+this.get('title')+' now.')
	}
}

function addMixin (mixin,target) {
	for (var prop in mixin) 
		if (mixin.hasOwnProperty(prop)) 
			target[prop] = mixin[prop];
}

// Add Social properties to Movie
addMixin(Social,Movie.prototype);

// Practice 11: Create an Actor class and create some actors from one of your favorite movies.
function Actor(firstName,lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
	// Some other properties here.
}

// "create some actors"
// I created the actors directly as array elements.
var arrayOfActors = [new Actor('Jim','Carrey'), new Actor('Ricardo','Darin'), new Actor('Will','Smith'), new Actor('Angelina','Jolie')];

// Practice 12: Show how you would add an array of actors to a Movie object.
// It could be:

	var terminator = new Movie();
	terminator.set('title','Terminator');

	// Add array of actors like some other attribute.
	terminator.set('actors',arrayOfActors);

// Another way to achieve this might be adding a array "Actors" as property of "Movie"
// or adding the array as inner var (like attributes) and getActors/setActors methods should be added.

