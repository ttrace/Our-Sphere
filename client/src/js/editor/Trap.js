op.plugins.push(function() {

    ui.resourceMenuWidth = 170;
    op.mainAreaSize = [
        window.innerWidth - ui.resourceMenuWidth - 5, 
        window.innerHeight
    ];

    ui.initViewport();
    ui.createMapSelector();
    ui.createSatelliteSelector();
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
            html: "aaaaaa"
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

