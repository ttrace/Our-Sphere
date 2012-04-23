Ext.define('op.Satellite', {
    extend: 'Ext.data.Model',
    fields: [
        {type: 'string', name: 'name'},
        {type: 'string', name: 'tle'},
        {type: 'boolean', name: 'isLocal', defaultValue: true}
    ]
});

Ext.define('op.SphereMap', {
    extend: 'Ext.data.Model',
    fields: [
        {type: 'string', name: 'name'},
        {type: 'string', name: 'image_url'},
        {type: 'boolean', name: 'isLocal', defaultValue: true}
    ]
});
