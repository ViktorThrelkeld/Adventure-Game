var mongoose = require('mongoose');
var _ = require('lodash');

var Game = mongoose.Schema({
  board        : [String],
  player       : String,
  health       : Number,
  havePrincess : {type: Boolean, default: false},
  haveGold     : {type: Boolean, default: false},
  didWin       : {type: Boolean, default: null}
});

mongoose.model('Game', Game);

