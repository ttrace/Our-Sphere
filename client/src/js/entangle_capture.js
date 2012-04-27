// var socket = io.connect('http://localhost:3002');
// 
// socket.on('news',
//      function (data) {
//      console.log(data);
//      socket.emit('my other event', { my: 'data' });
//      }
// );


var entangle_socket = io.connect('http://localhost:3002/entangle');

entangle_socket.on( 'rotate',　function( data )
               {
                    entangle_sphere( data.rotate );
                    console.log(data.rotate[0]);
               });

function entangle_rotate( rotate_array ){
     entangle_socket.emit('rotate', { rotate: rotate_array });
}

function entangle_sphere( rotation_data ){
     var MyPlanet = document.getElementById("planet_group");
          MyPlanet.className = "planet entangled";
          MyPlanet.style.webkitTransform = "rotateX("+ rotation_data[0] +"deg) rotateY("+ rotation_data[1] +"deg) rotateZ(0deg)";
        face_satellite([rotation_data[0] ,rotation_data[1]　]);
     myLog([rotation_data[0] ,rotation_data[1]], true);
     initial_Rotation();
}
