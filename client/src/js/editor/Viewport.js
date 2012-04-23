op.plugins.push(function() {

    ui.resourceMenuWidth = 170;
    op.mainAreaSize = [
        window.innerWidth - ui.resourceMenuWidth - 2, 
        window.innerHeight
    ];

    ui.initViewport();
    ui.addShareButton();
});

ui.addShareButton = function() {
    var div = document.createElement('div');
    var el = Ext.get(div);
    el.setStyle({
        width: '56px',
        height: '56px',
        background: "url('./images/share.png?hoge') 50% 50% no-repeat",
        position: 'absolute',
        cursor: 'pointer',
        bottom: '30px',
        right: '30px',
        zIndex: '100'
    });
    el.on('click', function() {
        var win = Ext.create('widget.exportwindow');
        win.show(el);
    });
    Ext.get('wrapper').appendChild(el);
}

ui.initViewport = function() {

    var mainView = document.getElementById('wrapper');
    var viewHTML = mainView.innerHTML;
    Ext.destroy(Ext.get(mainView));

    ui.root = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border'
        },
        items: [{
            region: 'west',
            collapsible: true,
            title: 'Resources',
            width: ui.resourceMenuWidth,
            layout: {
                type: 'vbox'
            },
            defaults: {
                width: '100%',
            },
            items: [
                ui.createMapSelector(),
                ui.createSatelliteSelector()
            ]
        }, {
            region: 'center',
            html: viewHTML,
            title: 'Preview',
            listeners: {
                render: function() {
                    this.body.set({id: 'wrapper'});
                }
            }
        }]
    });

}

