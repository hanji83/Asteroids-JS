(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(options) {
    this.radius = options.radius;
    this.color = options.color;
    this.pos = options.pos;
    this.vel = options.vel;
    this.game = options.game;
    this.img = options.img;
  };

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable()) {
        this.pos = this.game.wrap(this.pos);
      }
      else {
        this.remove();
      }
    }
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    if (this.img) {
      ctx.drawImage(this.img,
        (this.pos[0] - this.radius), (this.pos[1] - this.radius),
        (this.radius * 2), (this.radius * 2)
      );
    }
    else {
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    }
    
    ctx.fill();
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var centerDistances = Asteroids.Util.dist(this.pos, otherObject.pos);
    return centerDistances < (this.radius + otherObject.radius);
  };
  
  MovingObject.prototype.collideWith = function(otherObject) {
    //Code below was used to test collision detection algorithm
    // console.log("COLLISION DETECTED!");
    // this.game.remove(this);
    // this.game.remove(otherObject);
  };
  
  MovingObject.prototype.isWrappable = function() {
    return true;
  };
  
  MovingObject.prototype.remove = function() {
    this.game.remove(this);
  };
})();