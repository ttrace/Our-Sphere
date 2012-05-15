var io = require('socket.io').listen(3002);

// event for SOYUZ and ISS docking
var satellite_data = [
//               {name: "ISS (ZARYA)             ", tle: "1 25544U 98067A   12129.91412265  .00008963  00000-0  13318-3 0  51872 25544  51.6425 318.7799 0010316 293.3223 208.1323 15.55960198771894"}, 
//               {name: "TIANGONG 1              ", tle: "1 37820U 11053A   12129.72670105  .00039057  00000-0  26754-3 0  72392 37820  42.7852 291.1525 0011200 315.6831 121.9772 15.73946378 34971"} 

     {name: "ISS (ZARYA)", tle: "1 25544U 98067A   12135.56154573  .00010795  00000-0  15817-3 0  55312 25544 051.6405 290.5443 0010436 315.0173 162.6015 15.56091359772779"},
     {name: "SOYUZ TMA-04M", tle: "1 38291U 12022A   12136.21045619 -.00003779  11947-4  00000+0 0    402 38291 051.6491 288.0594 0026317 079.9407 100.4068 16.22663159    13"}
];

io.of('/satellites').on('connection', function (socket) {
  socket.emit('satellite',  satellite_data);
  
  socket.on('satellite', function (data) {
     satellite_data = data;
     socket.broadcast.emit( 'satellite' ,  data );
     console.log( data );
  });
});

