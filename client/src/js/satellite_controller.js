// var socket = io.connect('http://localhost:3002');
// 
// socket.on('news',
//      function (data) {
//      console.log(data);
//      socket.emit('my other event', { my: 'data' });
//      }
// );

if (getParameterByName("event")){
     var satellite_controller = io.connect('http://localhost:3002/satellites');
     
     satellite_controller.on( 'satellite',　function( data )
                    {
                         remove_current_satellites();
//                         console.log( data.length, data[1] );
                         for ( var i = 0; i < data.length; i++ ) {
                              console.log( data[i] );
                              get_satellites( data[i] );
                         }
                    });
     
     broadcast_satellites = function( data ){
          satellite_controller.emit('satellite', data);
     }
     
     function get_satellites( data ){
            var tle = [];
            tle.push(data.tle.substring(0,69));
            tle.push(data.tle.substring(69));
     
               var mySat = new op.oursatellite(data.name, tle);
                 mySat.build();
                 op.satellites[data.name] = mySat;
     }

     remove_current_satellites = function(){
     Object.keys(op.satellites).forEach(function(name) {
                 op.satellites[name].destroy();
                 delete op.satellites[name];
         });
    }
}

