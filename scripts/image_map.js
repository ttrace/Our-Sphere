function mapping( map_image , start_point, night){
     var long_start = 0.5;
     if(start_point){
          long_start = start_point;
     }
     if( own_map && map_image.width == 0 )
     {
         setTimeout( function(){mapping( map_image )}, 100);
          console.log( map_image.width );
     //     myLog("try...");
     } else {
        for ( var j = long_start; j < longitude_devide ; j++ ) {
               if( own_map ){
                    var upper_map = band_image( map_image, j );
                    var lower_map = band_image( map_image, j*-1 );
                   // console.log( upper_map );
                    if( upper_map == false || lower_map == false || upper_map.width == 0 || lower_map.width == 0){
                         setTimeout(function(){mapping( map_image , j )}, 100);
                         myLog("Building texture" + j, true);   
                         break;                 
                    }
               }
               for ( i = 0; i < latitude_devide; i++ ) {
                    if( own_map ){
                         setTimeout(create_slice(upper_map, i, j, night), 10);
                         setTimeout(create_slice(lower_map, i, (j*-1), night), 10);
                    } else {
                         background_mapping(upper_map, i, j);
                         background_mapping(lower_map, i, (j*-1));                    
                    }
               }
          }
     }
}

function create_slice(slice_image, lat_step, lon_step, night){
     var lat = lat_step * (360 / latitude_devide);
     var lon = lon_step * (90 / (longitude_devide));

     var my_planet_radius = planet_radius;
     var bottom_length =  Math.sin( (360 / latitude_devide / 2) / 180 * Math.PI ) * 2 * Math.cos( (Math.abs(lon) - 90 / longitude_devide / 2 ) / 180 * Math.PI ) * my_planet_radius;
     var height_length =  Math.sin( (90 / longitude_devide / 2) / 180 * Math.PI ) *2* my_planet_radius;

     var lat_length = bottom_length * latitude_devide;
     var lon_length = height_length * longitude_devide * 2;

     var lon_offset = lon_length/2 - (lon_length/longitude_devide/2) * (lon_step + 0.5);
          lon_offset = Math.min( lon_offset , Math.floor(lon_length));

    var  workspace = document.getElementById("picture_factory");

     var element_appendix = "";
     if( night ){
          element_appendix = "night";
     }
     var mySlice = document.getElementById(element_appendix+lat_step+"_"+lon_step);
//          console.log( (element_appendix+lat_step+"_"+lon_step) , mySlice);
          mySlice.width = bottom_length * myretina;
          mySlice.height = height_length * myretina;

     var  ctx_slice = mySlice.getContext("2d");
                              
          ctx_slice.drawImage(slice_image,
                              Math.floor(lat_length/360*lat) * myretina,
                              0,
                              Math.floor(bottom_length) * myretina,
                              Math.floor(height_length) * myretina,
                              0,
                              0,
                              Math.floor(bottom_length) * myretina,
                              Math.floor(height_length) * myretina);


          mySlice.style.border = "none";
}

function band_image( map_image, lon_step){
//     console.log('band');

     var my_planet_radius = planet_radius;
     var lon = lon_step * (90 / (longitude_devide));
     var lat_length = Math.sin( (360 / latitude_devide / 2) / 180 * Math.PI ) * 2 * Math.cos( (Math.abs(lon) - 90 / longitude_devide / 2 ) / 180 * Math.PI ) * my_planet_radius * latitude_devide;
     var height_length =  Math.sin( (90 / longitude_devide / 2) / 180 * Math.PI ) *2* my_planet_radius;
     var lon_length = height_length * longitude_devide * 2;
     var lon_offset = lon_length/2 - (lon_length/longitude_devide/2) * (lon_step + 0.5);
          lon_offset = Math.min( lon_offset , Math.floor(lon_length));

         var  workspace = document.getElementById("picture_factory");
          var myBand = document.createElement("CANVAS");
               myBand.setAttribute("id", lon_step);
               myBand.width = lat_length* myretina;
               myBand.height = height_length* myretina;
          
          var  ctx_band = myBand.getContext("2d");
               ctx_band.drawImage(map_image,
                              0,
                              lon_offset * -1 * myretina,
                              lat_length * myretina,
                              lon_length * myretina);
          var canvas_check = ctx_band.getImageData(0, 0, 1, 1);
          if( canvas_check.data[3] != 0){
               //console.log(canvas_check.data[3]);
               var band_image = new Image();
                    band_image.src = myBand.toDataURL("image/png");
               return( band_image );
          } else {
               return( false );          
          }
}

function background_mapping(slice_image, lat_step, lon_step){
     var lat = lat_step * (360 / latitude_devide);
     var lon = lon_step * (90 / (longitude_devide));

     var my_planet_radius = planet_radius;
     var bottom_length =  Math.sin( (360 / latitude_devide / 2) / 180 * Math.PI ) * 2 * Math.cos( (Math.abs(lon) - 90 / longitude_devide / 2 ) / 180 * Math.PI ) * my_planet_radius;
     var height_length =  Math.sin( (90 / longitude_devide / 2) / 180 * Math.PI ) *2* my_planet_radius;

     var lat_length = bottom_length * latitude_devide;
     var lon_length = height_length * longitude_devide * 2;

     var lon_offset = lon_length/2 - (lon_length/longitude_devide/2) * (lon_step + 0.5);
          lon_offset = Math.min( lon_offset , Math.floor(lon_length));

     var offset_length = (Math.cos( (90 / longitude_devide / 2) / 180 * Math.PI ) ) * (Math.cos( (360 / latitude_devide / 2) / 180 * Math.PI ) ) * my_planet_radius;

     var mySlice = document.getElementById(lat_step+"_"+lon_step);
          mySlice.width = bottom_length * myretina;
          mySlice.height = height_length * myretina;
          mySlice.style.width = bottom_length * myretina + "px";
          mySlice.style.height = height_length * myretina + "px";

          mySlice.style.webkitTransform = "";
          mySlice.style.webkitTransformOrigin = bottom_length/2 * myretina + "px " + height_length/2 * myretina + "px 0px";
          mySlice.style.webkitTransform =         "translateX("+ (bottom_length/2*-1) * myretina +"px)" +
                                                  "rotateY(" + (lat) + "deg)" + 
                                                  "rotateX(" + (lon) + "deg)"+
                                                  "translateZ("+ (offset_length * 0.98) +"px)"+
                                                  "";

          mySlice.style.webkitTransform = mySlice.style.webkitTransform + "scaleX("+(1/myretina)+") scaleY("+(1/myretina)+")";
          mySlice.style.backgroundImage      = "url("+outer_map_src+")";
          mySlice.style.backgroundSize       = (lat_length * myretina) + "px " + (lon_length * myretina) + "px";
          mySlice.style.backgroundPosition   = (Math.floor(lat_length/360*lat) * myretina * -1) + "px " + (lon_offset * -1 * myretina) + "px";


          mySlice.style.border = "none";
}

function night_image(night_map, night_mask ){
     
     var night_workspace = document.createElement("CANVAS");
          night_workspace.width = night_map.width;
          night_workspace.height = night_map.height;

     var ctx_night = night_workspace.getContext("2d");
          ctx_night.drawImage( night_mask , 0, 0, night_workspace.width, night_workspace.height);
          ctx_night.globalCompositeOperation = "source-in";
          ctx_night.drawImage( night_map , 0, 0);

     var night_image_respond = new Image();
          night_image_respond.src = night_workspace.toDataURL("image/png");
//     console.log( night_image_respond );
     return( night_image_respond );
}