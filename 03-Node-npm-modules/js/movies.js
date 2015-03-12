(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Director() {
	// Nothing to do here yet
}

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
