'use strict';

var canvas = document.getElementById('pong');
var ctx = canvas.getContext('2d');

/**
 * Ball class
 */
function Ball(playerLeft, playerRight) {
  this.playerLeft = playerLeft;
  this.playerRight = playerRight;
  this.position = {
    x: 400,
    y: 250
  };
  this.direction = 'r';
  this.step();
}

Ball.prototype.step = function() {
  this.position.x += this.direction === 'l' ? -5 : 5;
  if (this.position.x > 770) {
    var pos = this.playerRight.getPosition()
    if (pos[1] < this.position.y && pos[1] + pos[3] > this.position.y) {
      this.changeDirection();
    } else {
      this.playerLeft.scored();
      this.reset();
    }
  } else if (this.position.x < 30) {
    var pos = this.playerLeft.getPosition()
    if (pos[1] < this.position.y && pos[1] + pos[3] > this.position.y) {
      this.changeDirection();
    } else {
      this.playerRight.scored();
      this.reset();
    }
  }
  requestAnimationFrame(this.step.bind(this));
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
  ctx.stroke();
}

Ball.prototype.changeDirection = function() {
  this.direction = this.direction === 'l' ? 'r' : 'l';
}

Ball.prototype.reset = function() {
  this.position = {
    x: 400,
    y: 250
  }
}

/**
 * Player class
 */
function Player(pos) {
  var up, down;
  if (pos === 'left') {
    this.position = [0, 0, 10, 100];
    up = 87, down=  83;
  } else {
    this.position = [790, 0, 10, 100];
    up = 38, down = 40;
  }
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === up) {
      this.moveUp();
    } else if (e.keyCode === down) {
      this.moveDown();
    }
    game.draw();
  }.bind(this))
  this.score = 0;
}

Player.prototype.moveUp = function() {
  this.position[1] -= 30;
}

Player.prototype.moveDown = function() {
  this.position[1] += 30;
}

Player.prototype.draw = function() {
  var p = this.position;
  ctx.fillRect(p[0], p[1], p[2], p[3]);
}

Player.prototype.getPosition = function() {
  return this.position;
}

Player.prototype.scored = function() {
  this.score++;
}

/**
 * You think this is a fucking game?
 */
function Game(ball, playerLeft, playerRight) {
  this.ball = ball;
  this.playerLeft = playerLeft;
  this.playerRight = playerRight;
}

Game.prototype.draw = function() {
  canvas.width = canvas.width;
  this.ball.draw();
  this.playerLeft.draw();
  this.playerRight.draw();
  requestAnimationFrame(this.draw.bind(this));
}

Game.prototype.start = function() {
  requestAnimationFrame(this.draw.bind(this));
}

// Initialize the game
var playerL = new Player('left');
var playerR = new Player('right');
var ball = new Ball(playerL, playerR);
var game = new Game(ball, playerL, playerR);

game.start();
