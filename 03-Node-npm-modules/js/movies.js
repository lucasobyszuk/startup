(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Director(name) {
	this.name = name;
	this.quotes = [];
}

Director.prototype.speak = function() {
	if (this.quotes.length > 0) {
		console.log(this.name + ' says:');
		for (var i = 0; i < this.quotes.length ; i++)
			console.log(this.quotes[i]);
	}
	else {
		console.log(this.name + 'has no quotes :S');
	}
	return this.quotes;
};

Director.prototype.set = function(attr,value) {
	this[attr] = value;
};

Director.prototype.get = function(attr) {
	return this[attr];
};

module.exports = Director;
},{}],2:[function(require,module,exports){
var Director = require('./director.js');

function Movie() {
	var attributes = [];
	this.set = function(attr,value) { attributes[attr] = value; };
	this.get = function(attr) { return attributes[attr]; };
}

Movie.prototype.play = function() {
	console.log('Playing movie.');
}

Movie.prototype.stop = function() {
		console.log('Stopped movie.');
}

module.exports = Movie;
},{"./director.js":1}]},{},[2]);
