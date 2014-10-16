(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Ship = Asteroids.Ship = function(options) {
    options.radius = Ship.RADIUS;
    options.color = Ship.COLOR;
    options.vel = options.vel || [0, 0];
    options.pos = [600, 400];
    options.img = new Image();
    options.img.src = "images/cylon_basestar.png";
    
    Asteroids.MovingObject.call(this, options);
  };
  
  Ship.RADIUS = 20;
  Ship.COLOR = "#317F43";
  
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
  
  Ship.prototype.fireBullet = function() {
    var normal = Asteroids.Util.norm(this.vel);

    if (normal == 0) {
      return;
    }

    var relVel = Asteroids.Util.scale(
          Asteroids.Util.dir(this.vel),
          Asteroids.Bullet.SPEED
    );

    var bulletVel = [
        relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];
    
    
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: Asteroids.Bullet.COLOR,
      game: this.game
    });

    this.game.add(bullet);
  };
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
  
  Ship.prototype.relocate = function() {
    this.vel = [0, 0];
    this.pos = this.game.randomPosition();
  };
})();