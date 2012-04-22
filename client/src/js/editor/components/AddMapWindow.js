Ext.define('Oursphere.ExportWindow', {
    extend: 'Ext.window.Window',
    
    alias: 'widget.exportwindow',

    plain: true,
    width: 500,
    layout: 'fit',

    title: 'Export as page',
    
    initComponent: function(){
        this.addEvents(
            'feedvalid'
        );

        var widgetUrl = 'http://' + location.host + '/widget.html?satellite=';
        Object.keys(op.satellites).forEach(function(k) {
            var s = op.satellites[k];
            var p = "";
            p += s.name;
            p += '_';
            p += s.tle[0];
            p += s.tle[1];
            widgetUrl += encodeURIComponent(p);
            widgetUrl += ','
        });

        var iframeTag = "<iframe src='" + widgetUrl + "'></iframe>";;
        
        var form = this.form = Ext.create('widget.form', {
            bodyPadding: '12 10 10',
            border: false,
            unstyled: true,
            items: [{
                anchor: '100%',
                itemId: 'widget',
                labelAlign: 'top',
                value: widgetUrl,
                fieldLabel: 'Widget URL',
                xtype: 'textfield',
            }, {
                anchor: '100%',
                itemId: 'iframe',
                value: iframeTag,
                fieldLabel: 'iframe tag',
                labelAlign: 'top',
                xtype: 'textfield',
            }]
        });
        this.items = form;
        this.buttons = [{
            xtype: 'button',
            text: 'OK',
            scope: this,
            handler: this.destroy
        }];
        this.callParent(arguments);

        this.on('hide', op.resumeMouseEvent);
        this.on('beforedestroy', op.resumeMouseEvent);
        this.on('show', function() {
            op.suspendMouseEvent();
            this.form.getComponent('name').focus();
        });
    }
    
    
});
