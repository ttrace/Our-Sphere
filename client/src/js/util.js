function getParameterByName(name) {

    var match = RegExp('[?&]' + name + '=([^&]*)&?')
                    .exec(window.location.search);

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

}

function log() {
    if (op.config.debug && window.console) {
        console.log.apply(console, arguments);
    }
}

function bind(fn, thisObj) {
    return function() {
        fn.apply(thisObj, arguments);
    }
}

function removeEl(el) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

// http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript

