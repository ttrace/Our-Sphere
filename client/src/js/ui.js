function ui_init(){
     var screen_size = op.mainAreaSize || [ window.innerWidth , window.innerHeight ]
     var my_view = document.getElementById("wrapper");
          my_view.style.width = screen_size[0] + "px";
          my_view.style.height = screen_size[1] + "px";
     var my_view = document.getElementById("viewer");
          my_view.style.width = screen_size[0] + "px";
          my_view.style.height = screen_size[1] + "px";
     var my_view = document.getElementById("planet");
          my_view.style.width = screen_size[0] + "px";
          my_view.style.height = screen_size[1] + "px";
     var my_view = document.getElementById("planet_shadow");
          my_view.style.width = screen_size[0] + "px";
          my_view.style.height = screen_size[1] + "px";

     initMouseEvent();
}

function initMouseEvent() {
    var w = document.getElementById('wrapper');
    w.addEventListener('touchstart', rotate_start);
    w.addEventListener('touchmove', rotate_move);
    w.addEventListener('touchend', rotate_end);
    w.addEventListener('mousemove', rotate_move_mouse);
    w.addEventListener('mousedown', rotate_start_mouse);
    w.addEventListener('mouseup', rotate_up_mouse);
}

function suspendMouseEvent() {
    var w = document.getElementById('wrapper');
    w.removeEventListener('touchstart', rotate_start);
    w.removeEventListener('touchmove', rotate_move);
    w.removeEventListener('touchend', rotate_end);
    w.removeEventListener('mousemove', rotate_move_mouse);
    w.removeEventListener('mousedown', rotate_start_mouse);
    w.removeEventListener('mouseup', rotate_up_mouse);
}
op.suspendMouseEvent = suspendMouseEvent;

function resumeMouseEvent() {
    initMouseEvent();
}
op.resumeMouseEvent = resumeMouseEvent;
