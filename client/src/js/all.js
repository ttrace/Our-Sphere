/*
 * Sample project source
 *
 */
(function(namespace) {

// op is shortcut, we use window.oursphere namespace
var op = namespace.oursphere = {};

{{>app.js}}

{{>util.js}}

{{>ui.js}}

{{>oursatellite.js}}

{{>image_map.js}}

op.Bundle = {};

{{>bundle/ja_jp.js}}

{{>bundle/en_us.js}}

})(this);

