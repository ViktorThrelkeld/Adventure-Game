$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#game').on('submit', submitGame);

}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function submitGame(e){

  // e.preventDefault();
  // var user = $('input[name="user"]').val();

  // var url = $(this).attr('action');

  // var name = this.user.value;
  // var data = {
  //   user : name
  // };

  var user = $('input[name="user"]').val();
  var url = '/game/start?user=' + user;

  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data){
    htmlStartGame(data);
  });
  // $.ajax({
  //   url: url,
  //   type: 'POST',
  //   data: data,
  //   success: function(data, status, jqXHR){
  //     htmlStartGame(data);
  //   },
  //   error: function(jqXHR, status, error){
  //     console.log(error);
  //   }
  // });
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function htmlStartGame(game){
  $('#user').text(game.user + '\'s Adventure');
  // $('#board').text(game.board);
  // var squares = _.map(game.board, function(s, i){return '<div class="square" data-piece="#{game.board[0].val}" data-position="' + i + '"></div>';});
  // var squares = _.map(game.board, function(s, i){return '<div class="square #{game.board[0 + i].val}" data-position="' + i + '"></div>';});
  // var squares = _.map(game.board, function(s, i){return '<div class="square" data-piece=game.board[i] data-position="' + i + '"></div>';});
  // var squares = _.map(game.board, function(s, i){return '<div class="square" data-position=" + i + ">' + game.board[i] + '</div>';});
  // var squares = _.map(game.board, function(s, i){return '<div class="square" data-piece=' + game.board[i] + ' data-position=' + i + '></div>';});
  var squares = _.map(game.board, function(s, i){return '<div class="square ' + game.board[i] + '" data-position=' + i + '></div>';});
  // var squares = _.map(game.board, function(s, i){return '<div class="square" data-position=" + i + "></div>';});




  $('#board').append(squares);
  $('#board').attr('data-id', game.id);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}
