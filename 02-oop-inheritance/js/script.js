function Movie() {
	var attributes = [];
	this.set = function(attr,value) { attributes[attr] = value; };
	this.get = function(attr) { return attributes[attr]; };
}

Movie.prototype.play = function() {
	console.log('playing movie');
}

Movie.prototype.stop = function() {
		console.log('stopped movie');	
}
