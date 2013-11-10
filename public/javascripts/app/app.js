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
  $('#user').text(game.user); // currently game.user isn't being saved, so this is ignored
  $('#board').text(game.board);
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
