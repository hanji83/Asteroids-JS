(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    
    this.addAsteroids();
  };
  
  Game.BG_COLOR = "#000000";
  Game.DIM_X = 600;
  Game.DIM_Y = 400;
  Game.NUM_ASTEROIDS = 4;
  
  // Adds an object (ship, asteroid, bullets) to the game
  Game.prototype.add = function(object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    }
    else if (object instanceof Asteroids.Bullet) {
        this.bullets.push(object);
    }
    else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    }
    else {
      alert("This game is broken. :(");
    }
  };
  
  // Add Asteroids to a game
  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };
  
  // Create a new ship to be added to the game
  Game.prototype.addShip = function() {
    var ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });
    
    this.add(ship);

    return ship;
  };
  
  // Returns an array of all the objects
  Game.prototype.allObjects = function() {
    return [].concat(this.asteroids)
             .concat(this.bullets)
             .concat(this.ships);
  };
  
  // Checks for collisions between objects
  Game.prototype.checkCollisions = function() {
    var that = this;
    
    this.allObjects().forEach(function(object) {
      that.allObjects().forEach(function(otherObject) {
        if (object === otherObject) {
          return;
        }
        
        if (object.isCollidedWith(otherObject)) {
          object.collideWith(otherObject);
        }
      });
    });
  };
  
  // Clears the game board and then adds asteroids
  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  };
  
  // Creates a coordinate made of random generated positions
  Game.prototype.randomPosition = function() {
    return [ Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y ];
  };
  
  // Moves asteroids, ships, and bullets
  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };
  
  // Allows for objects to wrap on the screen
  Game.prototype.wrap = function(pos) {
    function wrap(coord, max) {
      if (coord < 0) {
        coord += max;
      }
      else if (coord > max) {
        coord -= max;
      }
      else {
        return coord;
      }
      
      return coord;
    }
    
    return [wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)];
  };
  
  // Stepper for game updates
  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };
  
  // Removes objects from the screen
  Game.prototype.remove = function(object) {
    if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids.splice(idx, 1);
    }
    else if (object instanceof Asteroids.Bullet) {
      var idx = this.bullets.indexOf(object);
      this.bullets.splice(idx, 1);
    }

    // NEED TO FIGURE OUT WHY THIS DOESN'T WORK
    // if (object instanceof Asteroids.Asteroid) {
    //   this.asteroids.forEach(function(asteroid) {
    //     if (object !== asteroid) {
    //       new_list.push(object);
    //     }
    //   });
    //
    //   this.asteroids = new_list;
    //   console.log(this.asteroids);
    // }
  };
  
  Game.prototype.isOutOfBounds = function(pos) {
    if ((pos[0] > Game.DIM_X) || (pos[0] < 0) 
    || (pos[1] > Game.DIM_Y) || (pos[1] < 0)) {
      return true;
    }
    
    return false;
  };
})();