function Movie() {
	var attributes = [];
	this.Event = [];
	this.set = function(attr,value) { attributes[attr] = value; };
	this.get = function(attr) { return attributes[attr]; };
}

Movie.prototype.play = function() {
	console.log('Playing movie.');
	this.triggerEvent('playing');
}

Movie.prototype.stop = function() {
		console.log('Stopped movie.');
		this.triggerEvent('stopped');	
}

Movie.prototype.suscribe = function(event,callback) {
	this.Event[event] = callback;
}

Movie.prototype.triggerEvent = function(event) {
	if (this.Event[event] != undefined)
		this.Event[event](this);
}

function MovieObserver(movie) {
	
	// If the attribute "title" was not set, it will print "undefined".
	movie.suscribe('playing', function(movie) {
		 console.log(movie.get("title")+" is playing now.");
	});

	movie.suscribe('stopped', function(movie) {
		console.log(movie.get("title")+" is stopped now.");
	});
}