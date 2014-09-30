(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Bullet = Asteroids.Bullet = function(options) {
    options.color = Bullet.COLOR;
    options.radius = Bullet.RADIUS;
    
    Asteroids.MovingObject.call(this, options);
  };
  
  Bullet.COLOR = "#4B0082";
  Bullet.RADIUS = 2;
  Bullet.SPEED = 10;
  
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
  
  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.remove();
      this.game.remove(otherObject);
    }
  };
  
  Bullet.prototype.isWrappable = function() {
    return false;
  };
})();