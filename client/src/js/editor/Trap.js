op.plugins.push(function() {

    ui.resourceMenuWidth = 170;
    op.mainAreaSize = [
        window.innerWidth - ui.resourceMenuWidth - 5, 
        window.innerHeight
    ];

    ui.initViewport();
});

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

