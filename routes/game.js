var mongoose = require('mongoose');
var colors = require('colors');
var Game = mongoose.model('Game');
var _ = require('lodash');

/*
 * POST /game/start
 */

exports.start = function(req, res){
  //console.log('game.start'.italic.underline.bold.magenta);
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

function isValidMove(origPos, newPos) {
  return (function () {
      if (_.contains(_.range(0, 8), origPos)) {
        return _.contains([-1, 1, 7, 8, 9], newPos - origPos) //top
      } else {
        return true
      }
    })() &&

  (function () {
      if (_.contains(_.range(7, 64, 8), origPos)) {
        return _.contains([-9, -8, -1, 7, 8], newPos - origPos) //right
      } else {
        return true
      }
    })() &&

  (function () {
      if (_.contains(_.range(56, 64), origPos)) {
        return _.contains([-9, -8, -7, -1, 1], newPos - origPos) //bottom
      } else {
        return true
      }
    })() &&

  (function () {
      if (_.contains(_.range(0, 57, 8), origPos)) {
        return _.contains([-8, -7, 1, 8, 9], newPos - origPos) //left
      } else {
        return true
      }
    })() &&

  (function () {
      if (_.contains(_.range(0, 64), origPos) && _.contains(_.range(0, 64), newPos)) {
        return (_.contains([1, 7, 8, 9], Math.abs(newPos - origPos)))
      } else {
        return false
      }
    })()
}

function duplicate(count, string){
  var array = []
  for(i = 0; i < count; i++){
    array.push(string)
  }
  return array
}

function makeMove(game, move){
  if (game.didWin == null) {
    if (_.contains(['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'], move)) {
      var posUser = _.indexOf(game.board, "u")
      var ordinalToPosition = {n: -8,ne: -7,e: 1,se: 9,s: 8,sw: 7,w: -1,nw: -9}
      var posChange = ordinalToPosition[move]
      var newPos = posUser + posChange
      if (isValidMove(posUser, posUser + posChange)) {
        posUser = posUser + posChange
        var staticPieces = {posUser: 'u', posPrincess: 'p', posGold: 'g', posExit: 'e'}
        var status
        // look for result (winning, hitting a wormhole, etc.)
        if (posUser == game.posExit) {
          if (game.hasPrincess && game.hasGold) {
            game.didWin = true
            status = {message: 'You Win'}
          } else {
            game.didWin = true
            status = {message: 'Oops, you left the game too early. You Lose!'}
          }
        }
        if (posUser == game.posPrincess) {
          game.hasPrincess = true
          status = {message: 'Found the Princess'}
        }
        if (posUser == game.posGold) {
          game.hasGold = true
          status = {message: 'Found the Gold'}
        }

        var dynamicOptions = _.range(0,64)
        dynamicOptions = _.without(dynamicOptions, game.posPrincess, game.posGold, game.posExit)
        var dynamicPositions = _.sample(dynamicOptions, 7) // 3 Scares, 2 Holes, 1 death
        var posGhosts = [dynamicPositions[0], dynamicPositions[1], dynamicPositions[2]]
        var posHoles = [dynamicPositions[3], dynamicPositions[4]]
        var posDeath = dynamicPositions[5]
        var posRandom = dynamicPositions[6]

        if (_.contains(posHoles, posUser)) {
          posUser = posRandom
          status = {message: 'Wormholed!'}
        }

        if (posUser == posDeath) {
          game.health = 0
          game.didWin = false
          status = {message: 'You Lose', health: game.health}
        }

        if (_.contains(posGhosts, posUser)) {
          if (game.health > 10) {
            game.health = game.health - 10
            status = {message: 'Ouch! You found a ghost.', health: game.health}
          } else {
            game.health = 0
            game.didWin = false
            status = {message: 'Ouch! You found a ghost. Aaaannnd You Lose!', health: game.health}

          }
        }
        //create new board
        var newBoard = duplicate(64,1)
        _.map(posGhosts, function(pos) { newBoard[pos] = 's' })
        _.map(posHoles, function(pos) { newBoard[pos] = 'h' })
        newBoard[posDeath] = 'd'
        if (!game.hasPrincess) {newBoard[posPrincess] = 'p'}
        if (!game.hasGold) {newBoard[posGold] = 'g'}
        newBoard[posUser] = 'u'
        newBoard[posExit] = 'e'
        game.board = newBoard

        game.save()
        if(typeof status !== 'undefined'){console.log(status)}
        return {board: game.board, status: status}

      } else {
        return null
      }
    } else {
      return null
    }
  } else {
    return null
  }
  // move takes one of: n, ne, e, se, s, sw, w, nw
  // returns {new board & status}

}

exports.update = function(req, res){
  Game.findById(req.body.id, function(err, game){
    //console.log(game)
    var xmit = makeMove(game, req.body.direction)
    //fakeGame = {board: ['a','b','c'], status: {message: 'Ouch!', health: 40}
    res.send(xmit) // {board, status}
  })
}
