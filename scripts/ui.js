function ui_init(){
     var screen_size = [ window.innerWidth , window.innerHeight ]
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
}
