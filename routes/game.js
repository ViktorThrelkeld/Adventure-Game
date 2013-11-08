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

exports.update = function(req, res){
  console.log('home.index'.italic.underline.bold.magenta);
  res.send('game');
};
