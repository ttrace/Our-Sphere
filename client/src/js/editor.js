/**
 * Scripts for Oursphere Editor
 *
 * @depends ExtJS 4.0.7
 *
 */
(function(namespace) {

// Editor modules are put op.editor.*
var op = namespace.oursphere;
var editor = op.editor = {};
var ui = editor.ui = {};

{{>editor/Trap.js}}
{{>editor/MapSelector.js}}
{{>editor/SatelliteSelector.js}}

})(this);

