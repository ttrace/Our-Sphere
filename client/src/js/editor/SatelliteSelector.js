
Ext.regModel('satellite', {
    fields: [
        {type: 'string', name: 'name'},
        {type: 'string', name: 'tle'},
    ]
});

Ext.define('op.Satellite', {
    extend: 'Ext.data.Model',
    fields: [
        {type: 'string', name: 'name'},
        {type: 'string', name: 'tle'},
        {type: 'boolean', name: 'isLocal', defaultValue: true}
    ]
});

ui.createSatelliteSelector = function() {
    var data = [
        {name: 'ISS', tle: '1 25544U 98067A   12108.98054374  .00014387  00000-0  19152-3 0  39342 25544  51.6429  63.6705 0007612 288.3013 116.3510 15.58396255768633'},
        {name: 'Habble', tle: '1 20580U 90037B   12091.00565454  .00001958  00000-0  13215-3 0  97252 20580 028.4713 295.1002 0003211 305.7081 054.3508 15.02323500  2965'}
    ];
}
