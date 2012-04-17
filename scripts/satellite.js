satellite = function(){
     var self = this;  
}

satellite.prototype ={
     get tle ()
	{
		if (!("_tle" in this))
				this._tle = document.getElementById("satellite_tle").innerText;
		return this._tle.split("\n");
	},
	
	set tle ( tle_string )
	{
		this._tle = tle_string;
	},
	
	get name ()
	{
		if (!("_name" in this))
				this.name = this.tle[0];
		return this._name;
	},
	
	set name ( x )
	{
		this._name = x;
	},
	
	get number ()
	{
		if (!("_number" in this))
				this._number = this.tle[1].split(" ")[1].match(/^[0-9]+/)[0];
		return this._number;
	},
	
	set number ( x )
	{
		this._number = x;
	},

	get epoc_year ()
	{
		if (!("_epoc_year" in this))
				this._epoc_year = parseInt( this.tle[1].split(" ")[3].match(/^[0-9][0-9]/)[0] );
		return this._epoc_year;
	},
	
	set epoc_year ( x )
	{
		this._epoc_year = x;
	},

	get epoc ()
	{
		if (!("_epoc" in this))
				this._epoc = parseFloat( this.tle[1].split(" ")[3].match(/^[0-9][0-9]([0-9\.]+)/)[1] );
		return this._epoc;
	},
	
	set epoc ( x )
	{
		this._epoc = x;
	},

	get inclination ()
	{
		if (!("_inclination" in this))
				this._inclination = parseFloat( this.tle[2].split(" ")[2] );
		return this._inclination;
	},
	
	set inclination ( x )
	{
		this._inclination = x;
	},

	get equatorial_plane ()
	{
		if (!("_equatorial_plane" in this))
				this._equatorial_plane = parseFloat( this.tle[2].split(" ")[3] );
		return this._equatorial_plane;
	},
	
	set equatorial_plane ( x )
	{
		this._equatorial_plane = x;
	},

	get eccentricity ()
	{
		if (!("_eccentricity" in this))
				this._eccentricity = parseFloat( "0." + this.tle[2].split(" ")[4] );
		return this._eccentricity;
	},
	
	set eccentricity ( x )
	{
		this._eccentricity = x;
	},

	get arg_perigee ()
	{
		if (!("_arg_perigee" in this))
				this._arg_perigee = parseFloat( this.tle[2].split(" ")[5] );
		return this._arg_perigee;
	},
	
	set arg_perigee ( x )
	{
		this._arg_perigee = x;
	},

	get mean_anomaly ()
	{
		if (!("_mean_anomaly" in this))
				this._mean_anomaly = parseFloat( this.tle[2].split(" ")[6] );
		return this._mean_anomaly;
	},
	
	set mean_anomaly ( x )
	{
		this._mean_anomaly = x;
	},

	get mean_motion ()
	{
		if (!("_mean_motion" in this))
				this._mean_motion = parseFloat( this.tle[2].split(" ")[7] );
		return this._mean_motion;
	},
	
	set mean_motion ( x )
	{
		this._mean_motion = x;
	},
}

satellite.prototype.build = function(){
     var myPlanet = document.getElementById("planet_group");
     var orbit_plane = document.createElement("DIV");
          orbit_plane.id = "satellite";
         // orbit_plane.style.backgroundColor = "rgba(100, 0, 0, 0.7)";
          orbit_plane.style.position = "absolute";
          orbit_plane.style.top = "50%";
          orbit_plane.style.left = "50%";
          orbit_plane.style.width = (planet_radius ) * 2 + "px";
          orbit_plane.style.height = (planet_radius ) * 2 + "px";
          orbit_plane.style.webkitTransformOrigin = planet_radius + "px " + planet_radius + "px 0px";
          orbit_plane.style.webkitTransform =     
                                                  "translateX(" + -1*(planet_radius ) + "px)" +
                                                  " translateY(" + -1*(planet_radius ) + "px)" +
                                                  " scaleX("+ (1-this.eccentricity) +")" +
                                                  " rotateZ(23.4deg)" +
                                                  " rotateX(" + (90 - this.inclination) +"deg)";
     myPlanet.appendChild( orbit_plane );

     for ( i = 0; i < 72; i++ ) {
          var orbit_dot = document.createElement("CANVAS");
          orbit_dot.id = ( i * 5 ) + "deg";
          orbit_dot.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
          orbit_dot.style.position = "absolute";
          orbit_dot.style.top = "50%";
          orbit_dot.style.left = "50%";
          orbit_dot.style.width = "4px";
          orbit_dot.style.height = "4px";
          orbit_dot.style.webkitTransformOrigin = "2px "+ (planet_radius + 15) +"px 0px";
          orbit_dot.style.webkitTransform =  "translateX(-1px)" +
                                             "translateY("+ (planet_radius + 15) * (-1) +"px)" +
                                             "rotateZ(" + (i * 5) +"deg)";
                                             
          orbit_plane.appendChild( orbit_dot );
     }

}
