var mongoose = require('mongoose');
var _ = require('lodash');

var Game = mongoose.Schema({
  board       : [String],
  user        : String,
  health      : {type: Number, default: 100},
  posPrincess : Number,
  posGold     : Number,
  posExit     : Number,
  hasPrincess : {type: Boolean, default: false},
  hasGold     : {type: Boolean, default: false},
  didWin      : {type: Boolean, default: null}
});

var rows = 8;
var scaries = 3;
var deaths = 1;
var holes = 2;

function duplicate(count, string){
  var array = [];
  for(i = 0; i < count; i++){
    array.push(string);
  };
  return array;
};

function createBoard(rows, scaries, deaths, holes){
  var spaces = rows*rows - 4 - scaries - deaths - holes;
  var board = duplicate(1,'u').
  concat(duplicate(1,'g')).
  concat(duplicate(1,'p')).
  concat(duplicate(1,'e')).
  concat(duplicate(scaries,'s')).
  concat(duplicate(holes,'h')).
  concat(duplicate(deaths,'d')).
  concat(duplicate(spaces,'1'));
  board = _.shuffle(board);
  // board = board.toString().replace(/,/g,'');
  return board;
}

function findStaticPositions(board){
  posPrincess = _.indexOf(board, "p");
  posGold = _.indexOf(board, "g");
  posExit = _.indexOf(board, "e");
  return {p: posPrincess, g: posGold, e: posExit};
}


Game.pre('save', function(next){
  if(!this.board.length){
    this.board = createBoard(rows, scaries, deaths, holes);
    var staticPositions = findStaticPositions(this.board);
    this.posPrincess = staticPositions.p;
    this.posGold = staticPositions.g;
    this.posExit = staticPositions.e;
  }

  next();
});

mongoose.model('Game', Game);

