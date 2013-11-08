var mongoose = require('mongoose');
var colors = require('colors');
var Game = mongoose.model('Game');
var _ = require('lodash');

/*
 * POST /game/new
 */

exports.create = function(req, res){
  console.log('home.index'.italic.underline.bold.magenta);
  new Game(req.query).save(function(err, game){
    res.send({id: game.id,
      board: game.board,
      health: game.health,
      hasPrincess: game.hasPrincess,
      hasGold: game.hasGold
    });
  });
};

/*
 * POST /game/:id
 */

function isValidMove(origPos, newPos){
  if(_.contains(_.range(0, 8), origPos)){
    _.contains([-1,1,7,8,9], newPos - origPos) //top
  } &&
  if(_.contains(_.range(7, 64, 8), origPos)){
    _.contains([-1,-8,-9,7,8], newPos - origPos) //right
  } &&
  if(_.contains(_.range(56, 64), origPos)){
    _.contains([1,-1,-7,-8,-9], newPos - origPos) //bottom
  } &&
  if(_.contains(_.range(0, 56, 8), origPos)){
    _.contains([1,8,9,-8,-7], newPos - origPos) //left
  } &&
  _.contains([1,7,8,9], Math.abs(newPos - origPos)) //middle
}

function makeMove(game, move){
  // find user's current position
  // determine whether movie is valid
  // rebuild the board
  // reposition the static pieces
  // look for result (winning, hitting a wormhole, etc.)
  var posUser = _.indexOf(board, "u");

}

exports.update = function(req, res){
  Game.findById(req.query.id, function(err, game){





    res.send(game); // board + status);
  })
};
