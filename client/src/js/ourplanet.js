/**
 *
 * @class ourplanet
 * @constructor
 * @param {String} name planet name.
 * @param {Array} tle_arr 2items array of TLE.
 */
var ourplanet = op.ourplanet = function(name, map){
    this.name  = name;
    this.map   = map;
}

ourplanet.prototype ={

}

ourplanet.prototype.destroy = function() {

//   Remove dom elements
//   removeEl(this.satellite_orbit);

    this.name = null;
    this.map = null;
}

// to create planet DOM element on viewer
ourplanet.prototype.build = function() {

//  adding this planet on list of planets
     if (!op.planets[ this.name ]) {
          op.planets[ this.name ] = this;
     }
}

