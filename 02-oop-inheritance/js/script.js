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