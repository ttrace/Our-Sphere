latitude_devide = 20;
longitude_devide = 4;
planet_radius = 200;
myretina = window.devicePixelRatio;
own_map = true;
outer_map_src = "";
//myretina = 2; // for test retina resolution on standard display

function initialize (){
     latitude_devide = 24;
     longitude_devide = 9;
     planet_radius = document.getElementById("planet").clientHeight/2*0.8;
     build_planet();

     EarthMap = new Image();
          EarthMap.crossOrigin = "use-credentials";
     if( !getParameterByName("map") )
     {
          if( 2 * Math.PI * planet_radius * myretina >= 1600)
          {
               EarthMap.src = "images/terra_10th_first_light_map_lrg.jpg";
          } else {
               EarthMap.src = "images/terra_10th_first_light_map_lrg_low.jpg";     
          }
          EarthMap.addEventListener("load", setTimeout(function(){mapping(EarthMap)} ,100) ,false);
     } else {
          own_map = false;
          outer_map_src = unescape(getParameterByName("map"));
          console.log("loading_image",outer_map_src);
          mapping();
     }

     if( getParameterByName("night") ){
          var  night_mask = new Image();
               night_mask.src = "images/night_mask.png";
          var  night_map = new Image();
               night_map.src = "images/earth_lights_lrg.jpg";
          build_planet_shadow();

          var Night_map_composite = new Image();
               Night_map_composite = night_image(night_map, night_mask);
          
          night_map.addEventListener("load", setTimeout(function(){ Night_map_composite = night_image(night_map, night_mask);} ,100) ,false);          
          Night_map_composite.addEventListener("load", setTimeout(function(){ mapping( Night_map_composite , 0.5 , true);} ,100) ,false);          
          
     }
}

function build_planet(){
     var MyPlanet = document.getElementById("planet");
     var MyPlanetX = MyPlanet.clientWidth;
     var MyPlanetY = MyPlanet.clientHeight;

   for ( j = 0.5; j < longitude_devide ; j++ ) {
          for ( i = 0; i < latitude_devide; i++ ) {
               MyPlanet.appendChild( create_land_element(i, j, false) );
          }
          for ( i = 0; i < latitude_devide; i++ ) {
               MyPlanet.appendChild( create_land_element(i, (j)*-1, false) );
          }
     }
     var MyPlanetX = MyPlanet.clientWidth;
     var MyPlanetY = MyPlanet.clientHeight;
     MyPlanet.style.webkitTransformOrigin = MyPlanetX + "px" + MyPlanetY + "px 0";
     MyPlanet.style.webkitTransform = "rotateX(-0deg) rotateY(-0deg) rotateZ(0deg)";
}

function build_planet_shadow(){
     var MyPlanet = document.getElementById("planet_shadow");
     var MyShadow = true;
     var MyPlanetX = MyPlanet.clientWidth;
     var MyPlanetY = MyPlanet.clientHeight;

   for ( j = 0.5; j < longitude_devide ; j++ ) {
          for ( i = 0; i < latitude_devide; i++ ) {
               MyPlanet.appendChild( create_land_element(i, j, MyShadow) );
          }
          for ( i = 0; i < latitude_devide; i++ ) {
               MyPlanet.appendChild( create_land_element(i, (j)*-1, MyShadow) );
          }
     }
     var MyPlanetX = MyPlanet.clientWidth;
     var MyPlanetY = MyPlanet.clientHeight;
     MyPlanet.style.webkitTransformOrigin = MyPlanetX + "px" + MyPlanetY + "px 0";
     MyPlanet.style.webkitTransform = "rotateX(-0deg) rotateY(-0deg) rotateZ(0deg)";
}

function create_land_element( lat_step, lon_step, myShadow){
     var lat = lat_step * (360 / latitude_devide);
     var lon = lon_step * (90 / (longitude_devide));
     var element_appendix = "";
     if( myShadow ){
          element_appendix = "night";
     }

     var my_planet_radius = planet_radius;
     if( myShadow ){ my_planet_radius = planet_radius + 5};

     var bottom_length =  Math.sin( (360 / latitude_devide / 2) / 180 * Math.PI ) * 2 * Math.cos( (Math.abs(lon) - 90 / longitude_devide / 2 ) / 180 * Math.PI ) * my_planet_radius;
     var height_length =  Math.sin( (90 / longitude_devide / 2) / 180 * Math.PI ) *2* my_planet_radius;
     var offset_length = (Math.cos( (90 / longitude_devide / 2) / 180 * Math.PI ) ) * (Math.cos( (360 / latitude_devide / 2) / 180 * Math.PI ) ) * my_planet_radius;

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

          land_element.style.webkitTransform =    "translateX("+ bottom_length/2*-1 +"px)" +
                                                  "rotateY(" + (lat) + "deg)" + 
                                                  "rotateX(" + (lon) + "deg)"+
                                                  "translateZ("+ (offset_length * 0.98) +"px)"+
                                                  "";

     if( !myShadow ){
          //land_element.innerText = lat_step +"_"+ lon_step;
//          land_element.style.backgroundImage    = "url("+ create_slice(lat_step, lon_step) + ")";
     } else {
          land_element.className             =  "shadow";
          land_element.style.webkitTransform =    "translateX("+ bottom_length/2*-1 +"px)" +
                                                  "rotateY(" + (lat) + "deg)" + 
                                                  "rotateX(" + (lon) + "deg)"+
                                                  "translateZ("+ (offset_length * 0.98) +"px)"+
                                                  "";
     }
     return( land_element );
}

startX = 0.0;
startY = 0.0;
initial_RotationX = -20.0;
initial_RotationY = 0.0;
initial_RotationZ = 0.0;

function rotate_start( event ){
     startX = event.targetTouches[0].pageX;
     startY = event.targetTouches[0].pageY;
     var MyPlanet = document.getElementById("planet");
     MyPlanet.style.webkitAnimation ="";

     initial_Rotation();
     myLog();
}

function rotate_end( event ){
     var MyPlanet = document.getElementById("planet");

     initial_Rotation();
     myLog('',true);
}

function rotate_move( event ){
     event.preventDefault();
     var MyPlanet = document.getElementById("planet");

     var Planet_height = MyPlanet.clientHeight;
     var Planet_width = MyPlanet.clientWidth;

     var  curX = (-1 * (event.targetTouches[0].pageY - startY) / Planet_height) * 90 + initial_RotationX;
          curX = Math.max(curX, -90);
          curX = Math.min(curX,  90);
     var  curY = (((event.targetTouches[0].pageX - startX) / Planet_width) * 90) + initial_RotationY;

          MyPlanet.style.webkitTransform = "rotateX("+ curX +"deg) rotateY("+ curY +"deg) rotateZ(0deg)";

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
     console.log("mouse_down");
     isMouseDown = true;
     startX = event.pageX;
     startY = event.pageY;

     var MyPlanet = document.getElementById("planet");
     MyPlanet.style.webkitAnimation = "";

     initial_Rotation();
     };
     
document.onmouseup = function() {
     isMouseDown = false;

     initial_Rotation();
     };

function initial_Rotation(){
     var MyPlanet = document.getElementById("planet");
          initial_RotationX = parseFloat(MyPlanet.style.webkitTransform.split("deg")[0].split("(")[1])%180;
          initial_RotationY = parseFloat(MyPlanet.style.webkitTransform.split("deg")[1].split("(")[1])%360;
          initial_RotationZ = parseFloat(MyPlanet.style.webkitTransform.split("deg")[2].split("(")[1])%360;
     return([initial_RotationX, initial_RotationY, initial_RotationZ]);
}

function rotate_move_mouse( event ){
     if(isMouseDown){
          event.preventDefault();
          var MyPlanet = document.getElementById("planet");
     
          var Planet_height = MyPlanet.clientHeight;
          var Planet_width = MyPlanet.clientWidth;
     
          var  curX = (-1 * (event.pageY - startY) / Planet_height) * 90 + initial_RotationX;
               curX = Math.max(curX, -90);
               curX = Math.min(curX,  90);
          var  curY = (((event.pageX - startX) / Planet_width) * 90) + initial_RotationY;

          MyPlanet.style.webkitTransform = "rotateX("+ curX +"deg) rotateY("+ curY +"deg) rotateZ(0deg)";
                   
          }
     }
