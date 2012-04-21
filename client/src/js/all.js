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

// Exports
op.initialize = initialize;
op.rotate_start = rotate_start;
op.rotate_move = rotate_move;
op.rotate_end = rotate_end;
op.rotate_move_mouse = rotate_move_mouse;
op.rotate_start_mouse = rotate_start_mouse;

})(this);

