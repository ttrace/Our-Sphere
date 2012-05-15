/**
 * Scripts for Oursphere Widget
 *
 */
(function(namespace) {

// op is shortcut, we use window.oursphere namespace
var op = namespace.oursphere = {};

{{>app.js}}
{{>util.js}}
{{>ui.js}}
{{>ourplanet.js}}
{{>oursatellite.js}}
{{>image_map.js}}
{{>entangle_capture.js}}
{{>satellite_controller.js}}

op.Bundle = {};
{{>bundle/ja_JP.js}}
{{>bundle/en_US.js}}

// exports
op.mapping = mapping;

})(this);

