function astroError(message){
	this.name = "astroError";
	this.message = message;
}

var astro$ = function(){
	this.CONSTANTS = {
		AU: {value: 149597871, units: "km"}
	};
	
	/*todo: discuss moving this to body*/
	this.EARTH = {
		ecl: function(d){ return 23.4393 - 3.563E-7 * d; }	
	};
/*******************************************************************************
 * 	ecl	obliquity of the ecliptic (tilt of earth's axis of rotation)
 *******************************************************************************/
	
	
	//Day 0.0 ar 2000 Jan 0.0. Note hours must be in 24 hour system
	this.toAstralDate(y, m, D, h, min, s){
		var d = 367*y - 7 * Math.floor(( y + Math.floor((m+9)/12) ) / 4) + 275* Math.floor(m/9) + D - 730530;
		var t = (h / 24.0) + (min / (60 * 24)) + (s / (60 * 60 * 24));
		return d + t;
	}

	//gets the astral date from js date, if none provided, returns current date to astral date.
	this.getAstralDate = function(date){
		var setDate = date;
		if(setDate == null || setDate == undefined){
			setDate = new Date();
		}
	
		var year = setDate.getFullYear();
		var month = setDate.getMonth() + 1;
		var day = setDate.getDate();
		var hour = setDate.getHours();
		var minute = setDate.getMinutes();
		var second = setDate.getSeconds();
	
		return this.toAstralDate(year, month, day, hour, minute, second);
	}
	
	/*returns heavenly body*/
	this.body = function(N, i, w, a, e, M){
		var newBody = function(){};
		newBody.orbit = {N: N, i: i, w: w, a: a, e: e, M: M};
		newBody.w1 = function(){ return this.N + this.w; };
		newBody.L = function(){ return this.M + this.w1(); };
		newBody.q = function(){ return this.a * (1 - this.e); };
		newBody.Q = function(){ return this.a * (1 + this.e); };
		newBody.P = function(){ return Math.pow(this.a, 1.5); };
		/*newBody.T = Epoch_of_M - (M(deg)/360_deg) / P  = time of perihelion*/
		return newBody;
	}
/****************************************************************************************
	N	longitude of the ascending node
	i	inclination to the ecliptic
	w	argument of perihelion
	a	semi-major axis, mean distance from Sun (but often given in Earth radii for the Moon)
	e	eccentricity (0=circle, 0-1=ellipse, 1=parabola)
	M	mean anomaly (0 at perihelion; increases uniformly with time)
	w1	longitude of perihelion
	L	mean longitude
	q	perihelion distance
	Q	aphelion distance
	P	orbital period (years if a is in AU)
	T	time of perihelion
	v	true anomaly (angle between position and perihelion)
	E	eccentric anomaly
****************************************************************************************/
	
	this.types = [
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
};

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
