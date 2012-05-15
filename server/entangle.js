var io = require('socket.io').listen(3002);

io.of('/entangle').on('connection', function (socket) {
  socket.emit('rotate', { message: 'Hello, world!' });
  socket.on('rotate', function (data) {
     socket.broadcast.emit('rotate', data );
//     console.log( data );
  });
});

