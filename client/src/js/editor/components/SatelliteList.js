/**
 * @class Oursphere.SatellitesList
 * @extends Ext.panel.Panel
 *
 * @constructor
 * @param {Object} config The config object
 */

Ext.define('Oursphere.SatelliteList', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.satellitelist',

    autoScroll: true,

    animCollapse: true,
    title: 'Satellites',

    initComponent: function(){
        Ext.apply(this, {
            items: this.createView(),
            dockedItems: this.createToolbar()
        });
        this.addEvents(
            'satelliteremove',
            'satelliteselect',
            'satelliteunselect'
        );

        this.callParent(arguments);
    },

    /**
     * Create the DataView to be used for the satellite list.
     * @private
     * @return {Ext.view.View}
     */
    createView: function(){
        this.view = Ext.create('widget.dataview', {
            store: Ext.create('Ext.data.Store', {
                model: 'op.Satellite',
                data: this.satellites
            }),
            selModel: {
                mode: 'MULTI',
                listeners: {
                    scope: this,
                    selectionchange: this.onSelectionChange
                }
            },
            listeners: {
                scope: this,
                viewready: this.onViewReady
            },
            trackOver: true,
            cls: 'satellite-list',
            itemSelector: '.satellite-list-item',
            overItemCls: 'satellite-list-item-hover',
            tpl: '<tpl for="."><div class="satellite-list-item">{name}</div></tpl>'
        });
        return this.view;
    },

    onViewReady: function(){
        this.view.getSelectionModel().select(this.view.store.first());
    },

    /**
     * Creates the toolbar to be used for controlling feeds.
     * @private
     * @return {Ext.toolbar.Toolbar}
     */
    createToolbar: function(){
        this.createActions();
        this.toolbar = Ext.create('widget.toolbar', {
            items: [this.addAction]
        });
        return this.toolbar;
    },

    /**
     * Create actions to share between toolbar and menu
     * @private
     */
    createActions: function(){
        this.addAction = Ext.create('Ext.Action', {
            scope: this,
            handler: this.onAddFeedClick,
            text: 'Add Satellite',
            iconCls: 'satellite-add'
        });
    },

    /**
     * Used when view selection changes so we can disable toolbar buttons.
     * @private
     */
    onSelectionChange: function(){
        var selected = this.getSelectedItem();
        if (selected) {
            this.fireEvent('satelliteselect', this, selected);
        }
    },


    /**
     * Gets the currently selected record in the view.
     * @private
     * @return {Ext.data.Model} Returns the selected model. false if nothing is selected.
     */
    getSelectedItem: function(){
        return this.view.getSelectionModel().getSelection() || false;
    },


    /**
     * React to a feed attempting to be added
     * @private
     */
    onAddFeedClick: function(){
//        var win = Ext.create('widget.tlewindow', {
//            listeners: {
//                scope: this,
//                feedvalid: this.onTleValid
//            }
//        });
//        win.show();
    },

    onTleValid: function(win, name, tle){
        var view = this.view,
            store = view.store,
            rec;

        rec = store.add({
            name: name,
            tle: tle
        })[0];
        this.animateNode(view.getNode(rec), 0, 1);
    },

    /**
     * Animate a node in the view when it is added/removed
     * @private
     * @param {Mixed} el The element to animate
     * @param {Number} start The start opacity
     * @param {Number} end The end opacity
     * @param {Object} listeners (optional) Any listeners
     */
    animateNode: function(el, start, end, listeners){
        Ext.create('Ext.fx.Anim', {
            target: Ext.get(el),
            duration: 500,
            from: {
                opacity: start
            },
            to: {
                opacity: end
            },
            listeners: listeners
         });
    },

    // Inherit docs
    onDestroy: function(){
        this.callParent(arguments);
    }
});
