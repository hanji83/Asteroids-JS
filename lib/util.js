(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util = {};
  
  // Inheriance creation funciton
  var inherits = Util.inherits = function(ChildClass, AdultClass) {
    function Surrogate() { 
      this.constructor = ChildClass;
    };
    Surrogate.prototype = AdultClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
  
  var dir = Util.dir = function(vector) {
    var normal = Util.norm(vector);
    return Util.scale(vector, 1 / normal);
  }
  
  // Return a random vector for asteroid
  var randomVec = Util.randomVec = function(length) {
    var degree = 2 * Math.PI * Math.random();
    
    return scale([Math.sin(degree), Math.cos(degree)], length);
  };
  
  // Scale the length of the vector by the given amount
  var scale = Util.scale = function(vector, length) {
    return [vector[0] * length, vector[1] * length];
  };
  
  // Calculate distances between objects
  var dist = Util.dist = function(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2)
                   + Math.pow(pos1[1] - pos2[1], 2));
  };
  
  var norm = Util.norm = function(vector) {
    return Util.dist([0, 0], vector);
  };
})();