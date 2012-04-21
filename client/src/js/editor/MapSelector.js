
Ext.define('op.SphereMap', {
    extend: 'Ext.data.Model',
    fields: [
        {type: 'string', name: 'name'},
        {type: 'string', name: 'image_url'},
        {type: 'boolean', name: 'isLocal', defaultValue: true}
    ]
});

ui.createMapSelector = function() {

    var data = [
        {name: 'Earth', image_url: 'terra_10th_first_light_map_lrg_low.jpg'},
        {name: 'Moon', image_url: 'moon.jpg'},
        {name: 'Jupiter', image_url: 'jupiter.jpg'},
        {name: 'Mars', image_url: 'mars.jpg'},
        {name: 'Venus', image_url: 'mars.jpg'},
        {name: 'Night Mask', image_url: 'night_mask.jpg'},
    ];

    var store = Ext.create('Ext.data.Store', {
        model: 'op.SphereMap',
        data: data
    });


    var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
        //fieldLabel: 'Select a surface map',
        forceSelection: true,
        displayField: 'name',
        valueField: 'image_url',
        value: data[0].image_url,
        store: store,
        editable: false,
        queryMode: 'local',
        margin: '5 0 0 0',
        typeAhead: true
    });


    ui.root.items.get(0).add({
        xtype: 'form',
        layout: '',
        bodyPadding: 5,
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'label', 
            text:'Select surface:',
            cls: 'margin:5px'
        }, simpleCombo
        ]
    });
}
