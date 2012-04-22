Ext.define('Oursphere.AddSatelliteWindow', {
    extend: 'Ext.window.Window',
    
    alias: 'widget.satellitewindow',
    modal: true,

    plain: true,
    width: 500,
    layout: 'fit',

    title: 'Add Satellite',
    
    initComponent: function(){
        this.addEvents(
            'feedvalid'
        );
        
        var form = this.form = Ext.create('widget.form', {
            bodyPadding: '12 10 10',
            border: false,
            unstyled: true,
            items: [{
                anchor: '100%',
                itemId: 'name',
                fieldLabel: 'Satellite Name',
                allowBlank: false,
                labelAlign: 'top',
                msgTarget: 'under',
                xtype: 'textfield',
            }, {
                anchor: '100%',
                itemId: 'tle1',
                fieldLabel: 'TLE1 (69chars)',
                allowBlank: false,
                minLength: 69,
                maxLength: 69,
                labelAlign: 'top',
                msgTarget: 'under',
                xtype: 'textfield',
            }, {
                anchor: '100%',
                itemId: 'tle2',
                fieldLabel: 'TLE2 (69chars)',
                allowBlank: false,
                minLength: 69,
                maxLength: 69,
                labelAlign: 'top',
                msgTarget: 'under',
                xtype: 'textfield',
            }]
        });
        this.items = form;
        this.buttons = [{
            xtype: 'button',
            text: 'Cancel',
            scope: this,
            handler: this.destroy
        }, {
            xtype: 'button',
            text: 'Add',
            scope: this,
            handler: this.handleAddButton
        }];
        this.callParent(arguments);

        this.on('hide', op.resumeMouseEvent);
        this.on('beforedestroy', op.resumeMouseEvent);
        this.on('show', function() {
            op.suspendMouseEvent();
            this.form.getComponent('name').focus();
        });
    },
    
    /**
     * React to the add button being clicked.
     * @private
     */
    handleAddButton: function(){
        // TODO check values by validate method
        var name = this.form.getComponent('name').getValue();
        var tle1 = this.form.getComponent('tle1').getValue();
        var tle2 = this.form.getComponent('tle2').getValue();

        this.fireEvent('valid', this, name, tle1 + tle2);
        this.destroy();
    }
    
});
