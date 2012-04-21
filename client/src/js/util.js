function getParameterByName(name) {

    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec(window.location.search);

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

}

function log() {
  if (op.config.debug) {
    console.log.call(null, arguments);
  }
}

// http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript

