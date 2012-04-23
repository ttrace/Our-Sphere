ui.createMapSelector = function() {

    var data = [
        {name: 'Earth', image_url: 'terra_10th_first_light_map_lrg_low.jpg'},
        {name: 'Moon', image_url: 'moon.jpg'},
        {name: 'Jupiter', image_url: 'jupiter.jpg'},
        {name: 'Mars', image_url: 'mars.jpg'},
        {name: 'Venus', image_url: 'venus.jpg'},
        {name: 'Night Mask', image_url: 'night.jpg'},
        {name: 'Cross domain', image_url: 'http://lab.taiyolab.com/base64image?http%3A%2F%2Fapod.nasa.gov%2Fapod%2Fimage%2F0011%2Fearthlights2_dmsp_big.jpg',
        isLocal:false},
        {name: 'Other...'}
    ];

    var store = Ext.create('Ext.data.Store', {
        model: 'op.SphereMap',
        data: data
    });


    var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
        forceSelection: true,
        displayField: 'name',
        valueField: 'image_url',
        value: data[0].image_url,
        store: store,
        editable: false,
        queryMode: 'local',
        margin: '5 0 0 0',
        typeAhead: true,
        listeners: {
            select: ui.handleMapChange
        }
    });


    return {
        xtype: 'form',
        layout: '',
        height: 60,
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
    }
}

ui.handleMapChange = function(cmb, records) {
    var data = records[0].data;
    if (data.image_url) {
        var mapImg = new Image();

        if (data.isLocal) {
            mapImg.src = 'images/' + data.image_url;
            mapImg.addEventListener("load", function(){
                op.mapping(mapImg, 0.5 , false)
            });
        } else {
            var url = 'http://lab.taiyolab.com/base64image?' + data.image_url;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function(){
              if ( xhr.readyState == 4 ) {
                if ( xhr.status == 200 ) {
                    mapImg.src = xhr.responseText;
                    mapImg.addEventListener("load", function(){
                        op.mapping(mapImg, 0.5 , false)
                    });
                } else {
                    log('ERRRRRRRRRRRRR');
                }
              }
            };
            xhr.send(null);

//            Ext.Ajax.request({
//                url: 'http://lab.taiyolab.com/base64image?' + data.image_url,
//                method: 'GET',
//                success: function(response) {
//                    console.info(response);
//                }
//            });
//
//            mapImg.addEventListener("load", function(){
//                op.mapping(mapImg, 0.5 , false)
//            });

            console.log('BBBBBBBBBBBBBBBBBB');

        }
        // TODO destory mapImg element
    } else {
        // Add new remote map
    }
}
