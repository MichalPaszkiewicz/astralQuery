/* calculated using http://www.stjarnhimlen.se/comp/ppcomp.html */

function astroError(message){
	this.name = "astroError";
	this.message = message;
}

var astro$ = function(){
	this.CONSTANTS = {
		AU: {value: 149597871, units: "km"}
	};
	
	this.FUNCTIONS = {
		TO_RADIANS: {value: function(deg){ return deg * Math.PI / 180; }, units: "rad"},
		TO_DEGREES: {value: function(rad){return rad * 180 / Math.PI; }, units: "deg"}
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
		newBody.orbit = {_N: N, _i: i, _w: w, _a: a, _e: e, _M: M};
		newBody._get = function(name, d){ return this["_" + name][0] + this["_" + name][1] * d; }
		newBody.w1 = function(d){ return this._get("N", d) + this._get("w", d); };
		newBody.L = function(d){ return this._get("M", d) + this.w1(d); };
		newBody.q = function(d){ return this._get("a", d) * (1 - this._get("e", d)); };/*remember a is earth radii for moon*/
		newBody.Q = function(d){ return this._get("a", d) * (1 + this._get("e", d)); };
		newBody.P = function(d){ return Math.pow(this._get("a", d), 1.5); };
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
		"Sun": {types: ["sun", "star"], body: this.body([0,0],[0,0],[282.9404,4.70935E-5],[1,0],[0.016709,-1.151E-9],[356.0470,0.9856002585])},
		"Moon": {types: ["natural", "satellite", "moon"], body: this.body([125.1228,-0.0529538083],[5.1454,0],[318.0634,0.1643573223],[60.2666,0],[0.054900,0],[115.3654,13.0649929509])},
		"Mercury": {types: ["planet"], body: this.body([48.3313,3.24587E-5],[7.0047,5.00E-8],[29.1241,1.01444E-5],[0.387098,0],[0.205635,5.59E-10],[168.6562,4.0923344368])},
		"Venus": {types: ["planet"], body: this.body([76.6799,2.46590E-5],[3.3946,2.75E-8],[54.8910,1.38374E-5],[0.723330,0],[0.006773,1.302E-9],[48.0052,1.6021302244])}
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
