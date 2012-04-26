// mapping image on each sphere elements.
// mappping() define if sphere elements uses own or outer image.
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
        for ( var j = long_start; j < longitude_divide ; j++ ) {
               if( own_map )
               {
                    var upper_map = band_image( map_image, j );
                    var lower_map = band_image( map_image, j*-1 );
                    if( upper_map == false || lower_map == false ){
                         setTimeout(function(){mapping( map_image , j )}, 100);
                         myLog("Building texture" + j, true);
                         break;
                    }
               }
               myLog('Image loaded',true);
//               for ( i = 0; i < 1; i++ ) { // for debug
               for ( i = 0; i < latitude_divide; i++ ) {
                    var current_upper_map = upper_map;
                    var current_lower_map = lower_map;
                    if( own_map ){
                         create_slice( current_upper_map, i, j, night );
                         create_slice( current_lower_map, i, (j*-1), night );
                    } else {
                         background_mapping(upper_map, i, j);
                         background_mapping(lower_map, i, (j*-1));                    
                    }
               }
          }
     }
}

function create_slice(slice_image_context, lat_step, lon_step, night){
     var lat = lat_step * (360 / latitude_divide);
     var lon = lon_step * (90 / (longitude_divide));

     var my_planet_radius = planet_radius;
     var bottom_length =  Math.sin( (360 / latitude_divide / 2) / 180 * Math.PI ) * 2 * Math.cos( (Math.abs(lon) - 90 / longitude_divide / 2 ) / 180 * Math.PI ) * my_planet_radius;
     var height_length =  Math.sin( (90 / longitude_divide / 2) / 180 * Math.PI ) * 2 * my_planet_radius;

     var lat_length = bottom_length * latitude_divide;
     var lon_length = height_length * longitude_divide * 2;

     var lon_offset = lon_length/2 - (lon_length/longitude_divide/2) * (lon_step + 0.5);
          lon_offset = Math.min( lon_offset , Math.floor(lon_length));

    var  workspace = document.getElementById("picture_factory");

     var element_appendix = "";
     if( night ){
          element_appendix = "night";
     }
     
     // create trapetoizo image transformation factory
     var mySlice = document.getElementById(element_appendix+lat_step+"_"+lon_step);
         mySlice.width = Math.ceil(bottom_length) * myretina;
         mySlice.height = height_length * myretina;
     var ctx_slice = mySlice.getContext("2d");

     // offscreen buffer
     var mySlice_off = document.createElement("CANVAS");
         mySlice_off.width = Math.ceil(bottom_length) * myretina;
         mySlice_off.height = height_length * myretina;
     var ctx_slice_off = mySlice_off.getContext("2d");

     var base_image_offset = Math.floor(lat_length/360*lat) * myretina;
     var base_image_length = Math.ceil(bottom_length) * myretina;

     var upper_length =  Math.sin( (360 / latitude_divide / 2) / 180 * Math.PI ) * 2
                         * Math.cos( (Math.abs(     (lon_step + 1) *
                                                  (90 / (longitude_divide))
                                             )
                                             - 90 / longitude_divide / 2 
                                        ) / 180 * Math.PI
                                   )
                         * my_planet_radius;
     if( lon_step < 0 ) upper_length =  Math.sin( (360 / latitude_divide / 2) / 180 * Math.PI ) * 2
                         * Math.cos( (Math.abs(     (lon_step - 1) *
                                                  (90 / (longitude_divide))
                                             )
                                             - 90 / longitude_divide / 2 
                                        ) / 180 * Math.PI
                                   )
                         * my_planet_radius;
     var slant_increasing_rate = (upper_length - bottom_length) / 2 / height_length;


//     for ( var si = 0; si < 1; si++ ) { // for debug
     for ( var si = 0; si < Math.ceil(height_length) * myretina; si++ ) {
          var my_pixel_slice  = slice_image_context.getImageData(base_image_offset, si , mySlice.width + 1, 1 );
          var out_pixel_slice = ctx_slice_off.createImageData(  mySlice.width + 1, 1 );
          var input_data = my_pixel_slice.data;
          var output_data = out_pixel_slice.data;
          var start_x = Math.ceil((bottom_length - upper_length) / 2 * myretina + slant_increasing_rate * si) ;
          if( lon_step < 0 ) start_x = -1 * slant_increasing_rate * si;
          
          var line_scale = (upper_length - slant_increasing_rate * si * 2 / myretina) / bottom_length;
          if( lon_step < 0 ) line_scale = (bottom_length + slant_increasing_rate * si * 2 / myretina) / bottom_length;

//          for ( var sj = 0; sj < 3 ; sj++ ) { // for debug
          for ( var sj = 0; sj < mySlice.width ; sj++ ) {
               output_data[ Math.ceil(sj * line_scale ) * 4     ] = input_data[ Math.min(sj , mySlice.width ) * 4     ];
               output_data[ Math.ceil(sj * line_scale ) * 4 + 1 ] = input_data[ Math.min(sj , mySlice.width ) * 4 + 1 ];
               output_data[ Math.ceil(sj * line_scale ) * 4 + 2 ] = input_data[ Math.min(sj , mySlice.width ) * 4 + 2 ];
               output_data[ Math.ceil(sj * line_scale ) * 4 + 3 ] = input_data[ Math.min(sj , mySlice.width ) * 4 + 3 ];
          }
          ctx_slice_off.putImageData( out_pixel_slice, start_x , si);
          setTimeout(function(){put_canvas_on_context( ctx_slice , mySlice_off )} , 100 * lon_step);
          //ctx_slice.drawImage( mySlice_off , 0, 0);
         }

          mySlice.style.border = "none";
}

function put_canvas_on_context( ctx_slice , mySlice_off ){
          ctx_slice.drawImage( mySlice_off , 0, 0);
}

// for slicing images onto each longitude band.
function band_image( map_image, lon_step){

     var my_planet_radius = planet_radius;
     var lon = lon_step * (90 / (longitude_divide));
     var lat_length = Math.sin( (360 / latitude_divide / 2) / 180 * Math.PI ) * 2 * Math.cos( (Math.abs(lon) - 90 / longitude_divide / 2 ) / 180 * Math.PI ) * my_planet_radius * latitude_divide;
     var height_length =  Math.sin( (90 / longitude_divide / 2) / 180 * Math.PI ) *2* my_planet_radius;
     var lon_length = height_length * longitude_divide * 2;
     var lon_offset = lon_length/2 - (lon_length/longitude_divide/2) * (lon_step + 0.5);
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
               return( ctx_band );
          } else {
               return( false );          
          }
}

// background image mapping onto sphere elements.
function background_mapping(slice_image, lat_step, lon_step){
     var lat = lat_step * (360 / latitude_divide);
     var lon = lon_step * (90 / (longitude_divide));

     var my_planet_radius = planet_radius;
     var bottom_length =  Math.sin( (360 / latitude_divide / 2) / 180 * Math.PI ) * 2 * Math.cos( (Math.abs(lon) - 90 / longitude_divide / 2 ) / 180 * Math.PI ) * my_planet_radius;
     var height_length =  Math.sin( (90 / longitude_divide / 2) / 180 * Math.PI ) *2* my_planet_radius;

     var lat_length = bottom_length * latitude_divide;
     var lon_length = height_length * longitude_divide * 2;

     var lon_offset = lon_length/2 - (lon_length/longitude_divide/2) * (lon_step + 0.5);
          lon_offset = Math.min( lon_offset , Math.floor(lon_length));

     var offset_length = (Math.cos( (90 / longitude_divide / 2) / 180 * Math.PI ) ) * (Math.cos( (360 / latitude_divide / 2) / 180 * Math.PI ) ) * my_planet_radius;

     var mySlice = document.getElementById(lat_step+"_"+lon_step);
          mySlice.width = bottom_length * myretina;
          mySlice.height = height_length * myretina;
          mySlice.style.width = bottom_length * myretina + "px";
          mySlice.style.height = height_length * myretina + "px";

          mySlice.style.webkitTransform = "";
          mySlice.style.webkitTransformOrigin = bottom_length/2 * myretina + "px " + height_length/2 * myretina + "px 0px";
          mySlice.style.webkitTransform =         "translateX("+ (bottom_length/2*-1) * myretina +"px)" +
                                                  "translateY("+ (height_length/2*-1) * myretina +"px)" + 
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
     mapping( night_image_respond , 0.5 , true);
}
