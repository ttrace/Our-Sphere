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
                    face_satellite( data.rotate );
                    console.log("on ", data.rotate);
               });

function entangle_rotate( rotate_array ){
     entangle_socket.emit('rotate', { rotate: rotate_array });
}

