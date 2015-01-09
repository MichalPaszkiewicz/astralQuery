function astroError(message){
	this.name = "astroError";
	this.message = message;
}

var astro$ = function(){
	/*returns a body*/
	this.body = function(){
		this.weight;
	}
	
	this.types = []

	var typesList = [
		"natural",
		"artificial",
		"satellite", /*use 'natural' or 'artificial' with 'satellite'.*/
		"moon",
		"star",
		"sun",
		"planet",
		"asteroid",
		"comet",
		"meteoroid",
		"dwarf",
		"neutron",
		"blackhole"
	];
	
	this.addType = function(){
	
	}

	this.items = {
		"Moon": {types: ["natural", "satellite", "moon"]},
		"ISS": {types: ["artificial", "satellite"]},
		"Sun": {types: ["sun", "star"]},
	};

	/*gets or sets values*/
	this.getOrSet = function(arg1, arg2){
		if(typeof(arg2) == "function"){ }
		else if(typeof(arg2) == "string"){ }
		else if(typeof(arg2) == "object"){ }
		else{ throw new astroError("Second argument invalid"); }
	}

	/*for getting particular value of heavenly body*/
	this.getValue = function(body, value){ return "value in body"; }	

	return this;
}

function a$(){
	var defaults = {};

	var args = arguments;
	
	/*checking amount of arguments for what should happen*/
	switch(args.length){
		/*if no arguments, return help?*/
		case 0:	return "Help information: ";

		/*One argument: clearly querying*/
		case 1: return "ok";

		/*Two arguments: setting or getting values or calling function*/
		case 2: return astro$.getOrSet(args[0], args[1]);
		default: return "lol";		
	}
};
