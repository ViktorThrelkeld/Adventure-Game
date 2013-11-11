var mongoose = require('mongoose');
var colors = require('colors');
var Game = mongoose.model('Game');
var _ = require('lodash');

/*
 * POST /game/start
 */

exports.start = function(req, res){
  console.log('game.start'.italic.underline.bold.magenta);
  new Game(req.query).save(function(err, game){
    res.send({id: game.id,
      user : game.user,
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

// function isValidMove(origPos, newPos) {
//     return (function () {
//         debugger
//         if (_.contains(_.range(0, 8), origPos)) {
//             return _.contains([-1, 1, 7, 8, 9], newPos - origPos) //top
//         } else {
//             return true
//         }
//     })() &&

//     (function () {
//         debugger
//         if (_.contains(_.range(7, 64, 8), origPos)) {
//             return _.contains([-9, -8, -1, 7, 8], newPos - origPos) //right
//         } else {
//             return true
//         }
//     })() &&

//     (function () {
//         debugger
//         if (_.contains(_.range(56, 64), origPos)) {
//             return _.contains([-9, -8, -7, -1, 1], newPos - origPos) //bottom
//         } else {
//             return true
//         }
//     })() &&

//     (function () {
//         debugger
//         if (_.contains(_.range(0, 57, 8), origPos)) {
//             return _.contains([-8, -7, 1, 8, 9], newPos - origPos) //left
//         } else {
//             return true
//         }
//     })() &&

//     (function () {
//         debugger
//         if (_.contains(_.range(0, 64), origPos) && _.contains(_.range(0, 64), newPos)) {
//             return Math.abs(newPos - origPos) in [1, 7, 8, 9] //middle
//         } else {
//             return false
//         }
//     })()
// }

function isValidMove(origPos, newPos) {
  return (function () {
      if (_.contains(_.range(0, 8), origPos)) {
        return _.contains([-1, 1, 7, 8, 9], newPos - origPos); //top
      } else {
        return true;
      }
    })() &&

  (function () {
      if (_.contains(_.range(7, 64, 8), origPos)) {
        return _.contains([-9, -8, -1, 7, 8], newPos - origPos); //right
      } else {
        return true;
      }
    })() &&

  (function () {
      if (_.contains(_.range(56, 64), origPos)) {
        return _.contains([-9, -8, -7, -1, 1], newPos - origPos); //bottom
      } else {
        return true;
      }
    })() &&

  (function () {
      if (_.contains(_.range(0, 57, 8), origPos)) {
        return _.contains([-8, -7, 1, 8, 9], newPos - origPos); //left
      } else {
        return true;
      }
    })() &&

  (function () {

      if (_.contains(_.range(0, 64), origPos) && _.contains(_.range(0, 64), newPos)) {
        return Math.abs(newPos - origPos) in [1, 7, 8, 9]; //middle
      } else {
        return false;
      }
    })();
}

function makeMove(game, move){
  // find user's current position
  var posUser = _.indexOf(board, "u");
  // determine whether move is valid

  // var move = isValidMove(posUser, move);

  // rebuild the board
  // reposition the static pieces
  // look for result (winning, hitting a wormhole, etc.)
}

exports.update = function(req, res){
  Game.findById(req.query.id, function(err, game){

    res.send(game); // board + status);
  })
};
