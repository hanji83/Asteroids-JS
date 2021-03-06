(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timer = null;
  };
  
  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };
  
  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.ship;
    
    Object.keys(GameView.MOVES).forEach(function(k) {
      var move = GameView.MOVES[k];
      key(k, function() { ship.power(move); });
    });
    
    key("space", function() { ship.fireBullet() });
  };
  
  GameView.prototype.start = function() {
    var that = this;
    
    this.timer = setInterval(function() {
      that.game.step();
      that.game.draw(that.ctx);
    }, 20);
    
    this.bindKeyHandlers();
  };
})();