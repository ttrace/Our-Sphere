/**
 *
 * @class oursatellite
 * @constructor
 * @param {String} name Satellite name.
 * @param {Array} tle_arr 2items array of TLE.
 */
var oursatellite = op.oursatellite = function(name, tle_arr){
    this.name = name;
    this.tle = tle_arr;
    this.satellite = null;
    this.satellite_orbit = null; // satellite wrapper
    this.satellite_object = null; // satellite element
    this.satellite_animation_timer = null; // timer
}

oursatellite.prototype ={
	
	get first_line ()
	{
		if (!("_first_line" in this))
				this._first_line = this.tle[0];
		return this._first_line;
	},
	
	set first_line ( x )
	{
		this._first_line = x;
	},
	
	get second_line ()
	{
		if (!("_second_line" in this))
				this._second_line = this.tle[1];
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
            log('Start create Orb.Satellite');
            log('first_line:', this.first_line);
            log('second_line:', this.second_line);
            var tle_for_orb = { "name" : this.name ,"first_line" : this.first_line, "second_line" : this.second_line  };
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
     var myPlanet = document.getElementById("planet");
     var orbit_plane = document.createElement("DIV");
          orbit_plane.id = "satellite";
          orbit_plane.className = "planet";
          orbit_plane.style.position = "absolute";
          orbit_plane.style.top = "50%";
          orbit_plane.style.left = "50%";
          orbit_plane.style.webkitTansformStyle= "preserve-3d";
          orbit_plane.style.width = ( planet_radius ) * 2 + "px";
          orbit_plane.style.height = ( planet_radius ) * 2 + "px";
          orbit_plane.style.webkitTransformOrigin = planet_radius + "px " + planet_radius + "px 0px";
          orbit_plane.style.webkitTransform =     "translateX(" + -1*(planet_radius ) + "px)" +
                                                   " translateY(" + -1*(planet_radius ) + "px)" +
                                                   " rotateZ(0deg)" +
                                                   " rotateX(0deg)";
     myPlanet.appendChild( orbit_plane );
     this.satellite_orbit = orbit_plane;

          var date_step = new Date()
          var time_step = new Orb.Time( date_step );
          var sat_position_step = this.satellite.position.rectangular( time_step );
          var sat_position_geo_step = this.satellite.position.geographic( time_step );
          if( !sat_position_step.x ) console.log("ERROR: TLE seems invaild!-----")
          var zpos = sat_position_step.x /  6378.137 * planet_radius;
          var xpos = sat_position_step.y /  6378.137 * planet_radius;
          var ypos = sat_position_step.z /  6378.137 * planet_radius * -1;
          var sat_lat = sat_position_geo_step.latitude;
          var sat_lon = sat_position_geo_step.longitude;
          var sat_att = planet_radius + sat_position_geo_step.altitude /  6378.137 * planet_radius;
          var orbit_dot_wrapper = document.createElement("div");

          var current_satellite = document.createElement("DIV");
               current_satellite.className = "current-sat";
               //current_satellite.style.backgroundColor = "rgb(255, 255, 0)";
               current_satellite.style.position = "absolute";
               current_satellite.style.top = "50%";
               current_satellite.style.left = "50%";
               current_satellite.style.width = "20px";
               current_satellite.style.height = "20px";
               current_satellite.style.webkitTransformStyle= "preserve-3d";
     
               current_satellite.style.webkitTransformOrigin = "10px 10px 0px";
               current_satellite.style.webkitTransform =  "translateX("+(xpos-10)+"px)" +
                                                 "translateY("+(ypos-10)+"px)" +
                                                 "translateZ("+zpos+"px)";

//          console.log("SAT", date_step, sat_position_step );
          var current_satellite_image = document.createElement("CANVAS");
               current_satellite_image.className = "current-sat";
               if( this.name.match(/ISS/)) current_satellite_image.className = "current-sat iss";
               if( this.name.match(/SOYUZ/)) current_satellite_image.className = "current-sat soyuz";
               //current_satellite_image.style.backgroundColor = "rgb(0, 255, 0)";
               current_satellite_image.style.border = "none";
               current_satellite_image.style.position = "absolute";
               current_satellite_image.style.top = "50%";
               current_satellite_image.style.left = "50%";
               current_satellite_image.style.width = "40px";
               current_satellite_image.style.height = "40px";
               current_satellite_image.style.webkitTransformOrigin = "20px 20px 0px";
               current_satellite_image.style.webkitTransform = "translateX(-20px) translateY(-20px) rotateY(0deg)";
     

          var satellite_label = document.createElement("SPAN");
               satellite_label.className = "current-sat";
               satellite_label.innerText = this.name;
          if( (ypos) > 0){
               satellite_label.style.top = "35px";
          }
          
               current_satellite.appendChild( current_satellite_image );
               current_satellite.appendChild( satellite_label );
               
               orbit_plane.appendChild( current_satellite );
          this.satellite_object = current_satellite;

     var orbital_period = this.satellite.orbital_period * 60000;
     for ( i = 0; i < 70; i++ ) {
          var date_step = new Date()
               date_step.setTime( date.getTime() - (orbital_period / 70) * i);
          var time_step = new Orb.Time( date_step );
          var sat_position_step = this.satellite.position.rectangular( time_step );
          var sat_position_geo_step = this.satellite.position.geographic( time_step );
          var zpos = sat_position_step.x /  6378.137 * planet_radius;
          var xpos = sat_position_step.y /  6378.137 * planet_radius;
          var ypos = sat_position_step.z /  6378.137 * planet_radius * -1;
          var sat_lat = sat_position_geo_step.latitude;
          var sat_lon = sat_position_geo_step.longitude;
          var sat_att = planet_radius + sat_position_geo_step.altitude /  6378.137 * planet_radius;
          var orbit_dot_wrapper = document.createElement("div");

          orbit_dot_wrapper.style.position = "absolute";
          orbit_dot_wrapper.style.top = "50%";
          orbit_dot_wrapper.style.left = "50%";
          orbit_dot_wrapper.style.width = "4px";
          orbit_dot_wrapper.style.height = "4px";
          orbit_dot_wrapper.style.webkitTransformStyle= "preserve-3d";
          orbit_dot_wrapper.style.webkitTransformOrigin = "2px 2px 0px";
          orbit_dot_wrapper.style.webkitTransform =  "translateX("+(xpos-2)+"px)" +
                                            "translateY("+(ypos-2)+"px)" +
                                            "translateZ("+zpos+"px)";
//           orbit_dot.style.webkitTransformOrigin = "2px 2px "+ sat_att +"px";
//           orbit_dot.style.webkitTransform =  "translateZ("+0+"px)" +
//                                              "rotateX("+sat_lon+"deg)" +
//                                              "rotateY("+sat_lat+"deg)";
          var orbit_dot = document.createElement("CANVAS");
          orbit_dot.style.backgroundColor = "rgb(255, 0, 255)";
          orbit_dot.className = "orbit-dot";
          orbit_dot.style.border = "black solid 1px";
          orbit_dot.style.position = "absolute";
          orbit_dot.style.top = "50%";
          orbit_dot.style.left = "50%";
          orbit_dot.style.opacity = "1.0";
          orbit_dot.style.webkitTransformOrigin = "2px 2px 0px";
          orbit_dot.style.webkitTransform = "translateX(-2px) translateY(-2px) rotateY(0deg)";

          orbit_dot_wrapper.appendChild( orbit_dot );
          orbit_plane.appendChild( orbit_dot_wrapper );
     }

     this.satellite_animation_timer = setInterval(bind(this.update, this), 5000);
}

oursatellite.prototype.update = function(){
     var target_satellite = this.satellite_object;
     var date_step = new Date()
          date_step.setTime( date_step.getTime() + (5000));
     var time_step = new Orb.Time( date_step );
     var sat_position_step = this.satellite.position.rectangular( time_step );
     var sat_position_geo_step = this.satellite.position.geographic( time_step );
          var zpos = sat_position_step.x /  6378.137 * planet_radius;
          var xpos = sat_position_step.y /  6378.137 * planet_radius;
          var ypos = sat_position_step.z /  6378.137 * planet_radius * -1;
     var sat_lat = sat_position_geo_step.latitude;
     var sat_lon = sat_position_geo_step.longitude;
     var sat_att = planet_radius + sat_position_geo_step.altitude /  6378.137 * planet_radius;
    
          target_satellite.style.webkitTransform =  "translateX("+(xpos-10)+"px)" +
                                            "translateY("+(ypos-10)+"px)" +
                                            "translateZ("+zpos+"px)";
     
}

oursatellite.prototype.destroy = function() {
    // Clear timer
    clearInterval(this.satellite_animation_timer);

    // Remove dom elements
    removeEl(this.satellite_orbit);
    removeEl(this.satellite_object);

    this.name = null;
    this.tle = null;
    this.satellite_orbit = null;
    this.satellite_object = null;
    this.satellite = null;
}

function face_satellite( planet_rotation ){
     var satellites = document.getElementsByClassName("current-sat");
     if( satellites.length > 0 ){
          for ( i = 0; i < satellites.length; i++ ) {
               if( satellites[i].nodeName == "CANVAS" || satellites[i].nodeName == "SPAN"){
                    var my_satellite = satellites[i];
                    my_satellite.style.webkitTransform = "";
                    my_satellite.style.webkitTransform = "translateX(-20px)  translateY(-20px) "+
                                                       " rotateY("+ (planet_rotation[1] * - 1) +"deg)" +
                                                       " rotateX("+ (planet_rotation[0] * - 1) +"deg) ";
               }
          }
     }
}
