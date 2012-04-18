oursatellite = function(){
     var self = this;  
}

oursatellite.prototype ={
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
				this._name = this.tle[0];
		return this._name;
	},
	
	set name ( x )
	{
		this._name = x;
	},
	
	get first_line ()
	{
		if (!("_first_line" in this))
				this._first_line = this.tle[1];
		return this._first_line;
	},
	
	set first_line ( x )
	{
		this._first_line = x;
	},
	
	get second_line ()
	{
		if (!("_second_line" in this))
				this._second_line = this.tle[2];
		return this._second_line;
	},
	
	set second_line ( x )
	{
		this._second_line = x;
	},
	
     get satellite ()
	{
		if (!("_satellite" in this))
		{
               var tle_for_orb = { "name" : this.name ,"first_line" : this.first_line, "second_line" : this.second_line  };
               console.log( "old", tle_for_orb );
                              tle_for_orb = {"name" : this.name ,
                           "first_line":  "1 25544U 98067A   11318.51274148  .00016717  00000-0  10270-3 0  9003",
                           "second_line": "2 25544  51.6365 124.1685 0021724  56.2169 304.1052 15.60123650 24381"
                         }
               console.log( "new", tle_for_orb );
               this._satellite = new Orb.Satellite( tle_for_orb );
          }
		return this._satellite;
	},
	
	set satellite ( x )
	{
		return this._satellite;// = new Orb.Satellite( { "first_line" : this._first_line, "second_line" : this._second_line  } );
	},
}


oursatellite.prototype.build = function(){
     var date = new Date();
     var time = new Orb.Time(date);
//     var mySattelite = this.satellite;

     var myPlanet = document.getElementById("planet_group");
     var orbit_plane = document.createElement("DIV");
          orbit_plane.id = "satellite";
//          orbit_plane.style.backgroundColor = "rgba(100, 0, 0, 0.7)";
          orbit_plane.style.position = "absolute";
          orbit_plane.style.top = "50%";
          orbit_plane.style.left = "50%";
          orbit_plane.style.width = (planet_radius ) * 2 + "px";
          orbit_plane.style.height = (planet_radius ) * 2 + "px";
          orbit_plane.style.webkitTransformOrigin = planet_radius + "px " + planet_radius + "px 0px";
           orbit_plane.style.webkitTransform =     "translateX(" + -1*(planet_radius ) + "px)" +
                                                   " translateY(" + -1*(planet_radius ) + "px)";
//                                                   " rotateZ(23.4deg)" +
//                                                   " rotateX(90deg)";
     myPlanet.appendChild( orbit_plane );

     for ( i = 0; i < 32; i++ ) {
          var date_step = new Date()
               date_step.setTime( date.getTime() + (100000) * i);
          var time_step = new Orb.Time( date_step );
          var sat_position_step = this.satellite.position.rectangular( time_step );
          var sat_position_geo_step = this.satellite.position.geographic( time_step );
          var xpos = sat_position_step.x /  6378.137 * planet_radius;
          var ypos = sat_position_step.y /  6378.137 * planet_radius;
          var zpos = sat_position_step.z /  6378.137 * planet_radius;
          var sat_lat = sat_position_geo_step.latitude;
          var sat_lon = sat_position_geo_step.longitude;
          var sat_att = planet_radius + sat_position_geo_step.altitude /  6378.137 * planet_radius;
          console.log( sat_lat, sat_lon, sat_att,  sat_position_geo_step.altitude);
          var orbit_dot = document.createElement("CANVAS");
          orbit_dot.id = ( i * 5 ) + "deg";
          orbit_dot.style.backgroundColor = "rgb(255, 0, 255)";
          orbit_dot.style.position = "absolute";
          orbit_dot.style.top = "50%";
          orbit_dot.style.left = "50%";
          orbit_dot.style.width = "4px";
          orbit_dot.style.height = "4px";
          orbit_dot.style.opacity = "1.0";
          orbit_dot.style.webkitTransformOrigin = "2px 2px "+ sat_att +"px";
//          orbit_dot.style.webkitTransform =  "translateX("+xpos+"px)" +
//                                             "translateY("+ypos+"px)" +
//                                             "translateZ("+zpos+"px)";
          orbit_dot.style.webkitTransform =  "translateZ("+0+"px)" +
                                             "rotateX("+sat_lon+"deg)" +
                                             "rotateY("+sat_lat+"deg)";

          myPlanet.appendChild( orbit_dot );
     }

}
