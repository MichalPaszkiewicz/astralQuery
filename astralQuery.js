/* calculated using http://www.stjarnhimlen.se/comp/ppcomp.html */

function astroError(message){
	this.name = "astroError";
	this.message = message;
}
Array.prototype.countWhere = function(xAndY){
	var count = 0;
	for(var i = 0; i < this.length; i++)
	{
		if(xAndY(this[i])){
			count++;
		}
	}
	return count;
}

Array.prototype.contains = function(xAndY){
	for(var i = 0; i < this.length; i++){
		if(xAndY(this[i])){
			return true;
		}
	}
	return false;
}

var astro$$$ = function(){
	this.FUNCTIONS = {
		TO_RADIANS: function(deg){ return deg * Math.PI / 180; },
		TO_DEGREES: function(rad){return rad * 180 / Math.PI; }
	};
	
	this.CONSTANTS = {
		AU: {value: 149597871, units: "km"}
	};
	
	/*todo: discuss moving this to body*/
	this.EARTH = {
		ecl: function(d){ return 23.4393 - 3.563E-7 * d; }	
	};
	
	return this;
}

var astro$$ = new astro$$$();

var astro$ = function(){

/*******************************************************************************
 * 	ecl	obliquity of the ecliptic (tilt of earth's axis of rotation)
 *******************************************************************************/
	
	//Day 0.0 ar 2000 Jan 0.0. Note hours must be in 24 hour system
	this.toAstralDate = function(y, m, D, h, min, s){
		var d = 367*y - 7 * Math.floor(( y + Math.floor((m+9)/12) ) / 4) + 275* Math.floor(m/9) + D - 730530;
		var t = (h / 24.0) + (min / (60 * 24)) + (s / (60 * 60 * 24));
		return d + t;
	};

	//gets the astral date from js date, if none provided, returns current date to astral date.
	this.getAstralDate = function(date){
		var setDate = date;
		if(setDate == null || setDate === undefined){
			setDate = new Date();
		}
	
		var year = setDate.getFullYear();
		var month = setDate.getMonth() + 1;
		var day = setDate.getDate();
		var hour = setDate.getHours();
		var minute = setDate.getMinutes();
		var second = setDate.getSeconds();
	
		return this.toAstralDate(year, month, day, hour, minute, second);
	};
	
	/*returns heavenly body*/
	this.body = function(N, i, w, a, e, M){
		var newBody = function(){};
		newBody.orbit = {_N: N, _i: i, _w: w, _a: a, _e: e, _M: M};
		newBody._get = function(name, d){ return this.orbit["_" + name][0] + this.orbit["_" + name][1] * d; };
		newBody.w1 = function(d){ return this._get("N", d) + this._get("w", d); };
		newBody.L = function(d){ return this._get("M", d) + this.w1(d); };
		newBody.q = function(d){ return this._get("a", d) * (1 - this._get("e", d)); };/*remember a is earth radii for moon*/
		newBody.Q = function(d){ return this._get("a", d) * (1 + this._get("e", d)); };
		newBody.P = function(d){ return Math.pow(this._get("a", d), 1.5); };
		newBody.E = function(d){ 
			var tempM = this._get("M", d); 
			var tempe = this._get("e", d);
			var eDeg = astro$$.FUNCTIONS.TO_DEGREES(tempe);
			var MRad = astro$$.FUNCTIONS.TO_RADIANS(tempM);
			var E0 = tempM + eDeg * Math.sin(MRad) * (1.0 + tempe * Math.cos(MRad));
			var E1 = -1;
			if(E0 < 0.06){ return E0; }
			else{ 
				var counter = 0;
				while(Math.abs( E0 - E1 ) > 0.001){
					if(counter > 0){E0 = E1;}
					E1 = E0 - (E0 - eDeg * Math.sin(E0) - tempM ) / ( 1 - tempe * Math.cos(E0) );
					counter++;
					if(counter == 10000){ throw new astroError("Formula not converging"); }
				}	
				return E1;
			}
		};
		newBody.xv = function(d){ return this._get("a", d) * Math.cos(this.E(d)) - this._get("e", d); };
		newBody.yv = function(d){ return this._get("a", d) * Math.sqrt(1.0 - Math.pow(this._get("e", d),2)) * Math.sin(this.E(d)); };
		newBody.v = function(d){ return Math.atan2( this.yv(d), this.xv(d) ); };
		newBody.r = function(d){ return Math.sqrt( Math.pow( this.xv(d), 2 ) + Math.pow( this.yv(d), 2 ) ); };
		newBody.lonsun = function(d){ return this.v(d) + this._get("w", d); };
		/*newBody.T = Epoch_of_M - (M(deg)/360_deg) / P  = time of perihelion*/
		return newBody;
	};
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
	r	distance
	E	eccentric anomaly
	lonsun	true longitude (for sun)
****************************************************************************************/
	
	/*List of all types of heavenly objects*/
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

	/*List of predefined items stored in the library*/
	this.items = {
		"Sun": {types: ["sun", "star"], body: this.body([0,0],[0,0],[282.9404,4.70935E-5],[1,0],[0.016709,-1.151E-9],[356.0470,0.9856002585])},
		"Moon": {types: ["natural", "satellite", "moon"], body: this.body([125.1228,-0.0529538083],[5.1454,0],[318.0634,0.1643573223],[60.2666,0],[0.054900,0],[115.3654,13.0649929509])},
		"Mercury": {types: ["planet"], body: this.body([48.3313,3.24587E-5],[7.0047,5.00E-8],[29.1241,1.01444E-5],[0.387098,0],[0.205635,5.59E-10],[168.6562,4.0923344368])},
		"Venus": {types: ["planet"], body: this.body([76.6799,2.46590E-5],[3.3946,2.75E-8],[54.8910,1.38374E-5],[0.723330,0],[0.006773,1.302E-9],[48.0052,1.6021302244])}
	};
	
	
	
	//gets all items of type
	this.getBodies = function(arg1){
		var results = [];
		
		for(var heavenlyBody in this.items){
			if (object.hasOwnProperty(property)) {
				if(heavenlyBody == arg1){
					return this.items[heavenlyBody];
				}
				if(this.items[heavenlyBody].types.contains(function(typeName){typeName == arg1})){
					results.push(this.items[heavenlyBody]);
				}
			}
		}
		
		return results;
	}

	/*gets or sets values*/
	this.getOrSet = function(arg1, arg2){
		if(typeof(arg2) == "function"){ }
		else if(typeof(arg2) == "string"){ }
		else if(typeof(arg2) == "object"){ }
		else{ throw new astroError("Second argument invalid"); }
	};

	/*for getting particular value of heavenly body*/
	this.getValue = function(body, value){ return "value in body"; };	

	return this;
};

var _$_$_;

function a$(){
	if(_$_$_ === null || _$_$_ === undefined){
		_$_$_ = new astro$();
	}
	
	var defaults = {};

	var args = arguments;
	
	/*checking amount of arguments for what should happen*/
	switch(args.length){
		/*if no arguments, return help?*/
		case 0:	return "Help information: ";

		/*One argument: clearly querying*/
		case 1: return _$_$_.getBodies(args[0]);

		/*Two arguments: setting or getting values or calling function*/
		case 2: return _$_$_.getOrSet(args[0], args[1]);
		default: return "lol";		
	}
}

var astroQ = a$;
