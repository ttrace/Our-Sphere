var latitude_divide = 20;
var longitude_divide = 4;
var planet_radius = 200;
var myretina = window.devicePixelRatio;
var own_map = true;
var outer_map_src = "";
//myretina = 2; // for test retina resolution on standard display

/**
 *
 */
op.plugins = [];

/**
 * Reference to all my satellites.
 */
op.satellites = {};

/**
 * Reference to all my planets.
 */
op.planets = {};

/**
 * Bootstrap point.
 *
 * @public
 */
op.initialize = function(){

    // Execute all registered plugins
    op.plugins.forEach(function(p) {
        p();
    });

    ui_init();

     planet_radius = Math.min(document.getElementById("viewer").clientHeight/2*0.8, document.getElementById("viewer").clientWidth/2*0.8);
//     planet_radius = 50;  // for test
     latitude_divide = Math.max(Math.ceil(planet_radius / 12), 16);
     longitude_divide = Math.max(Math.ceil(planet_radius / 32), 5);

     build_planet();

     var EarthMap = new Image();
     EarthMap.crossOrigin = "use-credentials";
     if( !getParameterByName("map") )
     {
          if( 2 * Math.PI * planet_radius * myretina >= 2000)
          {
               EarthMap.src = "images/terra_10th_first_light_map_lrg.jpg";
          } else {
               EarthMap.src = "images/terra_10th_first_light_map_lrg_low.jpg";     
          }
          myLog('loading image',true);
          EarthMap.addEventListener("load", mapping(EarthMap, 0.5 , false) ,false);
     } else {
          own_map = false;
          outer_map_src = unescape(getParameterByName("map"));
//          console.log("loading_image",outer_map_src);
          mapping();
     }

     if( getParameterByName("night") ){
          var  night_mask = new Image();
               night_mask.src = "images/night_mask.png";
          var  night_map = new Image();
               night_map.src = "images/earth_lights_lrg.jpg";
          build_planet_shadow();

//          var Night_map_composite = new Image();
//               Night_map_composite = night_image(night_map, night_mask);
          
          night_map.addEventListener("load", setTimeout(function(){ night_image(night_map, night_mask);} ,100) ,false);          
          
     }

     var satellitesStr = getParameterByName("satellite");
     if(satellitesStr) {
         satellitesStr.split(',').forEach(function(str) {
             log('--- satellite parameter --');
             log(str);
             log('--------------------------');
             var tle = [],
                 name = str.split('_')[0];
                 tleStr = str.split('_')[1];

             tle.push(tleStr.substring(0, 69));
             tle.push(tleStr.substring(69));
             var mySat = new oursatellite(name, tle);
             mySat.build();

             // Retain reference
             op.satellites[name] = mySat;
         });
     }
}

function build_planet(){
     var MyPlanet = document.getElementById("planet");

   for ( j = 0.5; j < longitude_divide ; j++ ) {
          for ( i = 0; i < latitude_divide; i++ ) {
               MyPlanet.appendChild( create_land_element(i, j, false) );
          }
          for ( i = 0; i < latitude_divide; i++ ) {
               MyPlanet.appendChild( create_land_element(i, (j)*-1, false) );
          }
     }

     MyPlanet.style.webkitTransform = "rotateX(-0deg) rotateY(-0deg) rotateZ(0deg)";
}

function build_planet_shadow(){
     var MyPlanet = document.getElementById("planet_shadow");
     var MyShadow = true;

   for ( j = 0.5; j < longitude_divide ; j++ ) {
          for ( i = 0; i < latitude_divide; i++ ) {
               MyPlanet.appendChild( create_land_element(i, j, MyShadow) );
          }
          for ( i = 0; i < latitude_divide; i++ ) {
               MyPlanet.appendChild( create_land_element(i, (j)*-1, MyShadow) );
          }
     }
}

function create_land_element( lat_step, lon_step, myShadow){
     var lat = lat_step * (360 / latitude_divide);
     var lon = lon_step * (90 / (longitude_divide));
     var element_appendix = "";
     if( myShadow ){
          element_appendix = "night";
     }

     var my_planet_radius = planet_radius;
     if( myShadow ){ my_planet_radius = planet_radius + 2};

     var bottom_length =  Math.sin( (360 / latitude_divide / 2) / 180 * Math.PI ) * 2 * Math.cos( (Math.abs(lon) - 90 / longitude_divide / 2 ) / 180 * Math.PI ) * my_planet_radius;
     var height_length =  Math.sin( (90 / longitude_divide / 2) / 180 * Math.PI ) *2* my_planet_radius;
     var offset_length = (Math.cos( (90 / longitude_divide / 2) / 180 * Math.PI ) ) * (Math.cos( (360 / latitude_divide / 2) / 180 * Math.PI ) ) * my_planet_radius;

     var map_size_x = my_planet_radius * 2 * Math.PI;
     var map_size_y = map_size_x / 2;
     
     var land_element = document.createElement("CANVAS");
          land_element.id     = element_appendix + lat_step+"_"+lon_step;
          land_element.width  = bottom_length;
          land_element.height = height_length;
          land_element.style.width = bottom_length + "px";
          land_element.style.height = height_length + "px";

          land_element.style.webkitTransformOrigin = bottom_length/2 + "px " +
                                                  height_length/2 + "px 0px";

     var date = new Date();
     var time = new Orb.Time(date);
     var hour_angle = time.gmst()*15;
     
          land_element.style.webkitTransform =    "translateX("+ bottom_length/2*-1 +"px)" +
                                                  "translateY("+ height_length/2*-1 +"px)" + 
                                                  "rotateY(" + (lat  + 180 + (360 / latitude_divide) / 2 + hour_angle) + "deg)" + 
                                                  "rotateX(" + (lon) + "deg)"+
                                                  "translateZ("+ (offset_length * 0.99) +"px)"+
                                                  "";

     if( !myShadow ){
          //land_element.innerText = lat_step +"_"+ lon_step;
//          land_element.style.backgroundImage    = "url("+ create_slice(lat_step, lon_step) + ")";
     } else {
          land_element.className             =  "shadow";
          land_element.style.webkitTransform =    "translateX("+ bottom_length/2*-1 +"px)" +
                                                  "translateY("+ height_length/2*-1 +"px)" + 
                                                  "rotateY(" + (lat) + "deg)" + 
                                                  "rotateX(" + (lon) + "deg)"+
                                                  "translateZ("+ (offset_length) +"px)"+
                                                  "";
     }
     return( land_element );
}

var startX = 0.0;
var startY = 0.0;
var initial_RotationX = -20.0;
var initial_RotationY = 0.0;
var initial_RotationZ = 0.0;

function rotate_start( event ){
     startX = event.targetTouches[0].pageX;
     startY = event.targetTouches[0].pageY;
     var MyPlanet = document.getElementById("planet_group");
     MyPlanet.style.webkitAnimation ="";
     MyPlanet.className = "planet"
     initial_Rotation();
//     myLog();
}

function rotate_end( event ){
     var MyPlanet = document.getElementById("planet_group");

     initial_Rotation();
     entangle_rotate([curX,curY]);

     var Planet_height = MyPlanet.clientHeight;
     var Planet_width = MyPlanet.clientWidth;
     var curX = (-1 * (event.pageY - startY) / Planet_height) * 90 + initial_RotationX;
     curX = Math.max(curX, -90);
     curX = Math.min(curX,  90);
     var curY = (((event.pageX - startX) / Planet_width) * 90) + initial_RotationY;

     entangle_rotate([initial_Rotation()[0],initial_Rotation()[1]]);
}

function rotate_move( event ){
     event.preventDefault();
     var MyPlanet = document.getElementById("planet_group");

     var Planet_height = MyPlanet.clientHeight;
     var Planet_width = MyPlanet.clientWidth;

     var  curX = (-1 * (event.targetTouches[0].pageY - startY) / Planet_height) * 90 + initial_RotationX;
          curX = Math.max(curX, -90);
          curX = Math.min(curX,  90);
     var  curY = (((event.targetTouches[0].pageX - startX) / Planet_width) * 90) + initial_RotationY;

          MyPlanet.style.webkitTransform = "rotateX("+ curX +"deg) rotateY("+ curY +"deg) rotateZ(0deg)";
          face_satellite([curX,curY]);
}

function myLog(string, refresh){
     var myLog = document.getElementById("mylog");
     if(refresh){
         myLog.innerHTML = string;
         } else {
         myLog.innerHTML = myLog.innerHTML + "<br>" + string;         
         }
}

var isMouseDown = false;
function rotate_start_mouse( event ) {
    isMouseDown = true;
    startX = event.pageX;
    startY = event.pageY;

    var MyPlanet = document.getElementById("planet_group");
    MyPlanet.style.webkitAnimation = "";
     MyPlanet.className = "planet"

    initial_Rotation();
};

function rotate_up_mouse(event) {
     isMouseDown = false;
     initial_Rotation();

     var MyPlanet = document.getElementById("planet_group");
     var Planet_height = MyPlanet.clientHeight;
     var Planet_width = MyPlanet.clientWidth;
     var curX = (-1 * (event.pageY - startY) / Planet_height) * 90 + initial_RotationX;
          curX = Math.max(curX, -90);
          curX = Math.min(curX,  90);
     var curY = (((event.pageX - startX) / Planet_width) * 90) + initial_RotationY;
     entangle_rotate([initial_Rotation()[0],initial_Rotation()[1]]);
//     initial_Rotation();
}

function initial_Rotation(){
    var MyPlanet = document.getElementById("planet_group");
    initial_RotationX = parseFloat(MyPlanet.style.webkitTransform.split("deg")[0].split("(")[1])%180;
    initial_RotationY = parseFloat(MyPlanet.style.webkitTransform.split("deg")[1].split("(")[1])%360;
    initial_RotationZ = parseFloat(MyPlanet.style.webkitTransform.split("deg")[2].split("(")[1])%360;
    return([initial_RotationX, initial_RotationY, initial_RotationZ]);
}

function rotate_move_mouse( event ){
    if(isMouseDown){
        event.preventDefault();
        var MyPlanet = document.getElementById("planet_group");

        var Planet_height = MyPlanet.clientHeight;
        var Planet_width = MyPlanet.clientWidth;

        var curX = (-1 * (event.pageY - startY) / Planet_height) * 90 + initial_RotationX;
        curX = Math.max(curX, -90);
        curX = Math.min(curX,  90);
        var curY = (((event.pageX - startX) / Planet_width) * 90) + initial_RotationY;

        MyPlanet.style.webkitTransform = "rotateX("+ curX +"deg) rotateY("+ curY +"deg) rotateZ(0deg)";
//          myLog([curX,curY], true);
        face_satellite([curX,curY]);
    }
}
