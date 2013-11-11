$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#game').on('submit', submitGame);

  // $( 'body' ).keyup(keyHit);
  $('body').bind('keyup click', keyHit);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function keyHit(e){
  var url = '/game/update';
  var id = $('#board').attr('data-id');
    // e = e || event;

    if (e.keyCode == '38') {
      // up arrow
      sendGenericAjaxRequest(url, {id: id, direction:'n'}, 'post', 'put', null, function(data){
        if(data.board){htmlUpdateGame(data)}
      })
    }
    else if (e.keyCode == '40') {
      // down arrow
      sendGenericAjaxRequest(url, {id: id, direction:'s'}, 'post', 'put', null, function(data){
        if(data.board){htmlUpdateGame(data)}
      })
    }
    else if (e.keyCode == '37') {
      // left arrow
      sendGenericAjaxRequest(url, {id: id, direction:'w'}, 'post', 'put', null, function(data){
        if(data.board){htmlUpdateGame(data)}
      })
    }
    else if (e.keyCode == '39') {
      // right arrow
      sendGenericAjaxRequest(url, {id: id, direction:'e'}, 'post', 'put', null, function(data){
        if(data.board){htmlUpdateGame(data)}
      })
    }
    // send ne, se, sw, ne for the other four keyboard combos

    // var code = e.keyCode ? e.keyCode : e.which;

    // switch(code)
    // {
    // case 38:
    //   break;

    // case 40:
    //   break;

    // case 13:
    //   break;

    // default:
    //   return;
    // }
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
  if (user == '') {
    user = 'User';
  }
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
  //var squares = _.map(game.board, function(s, i){return '<div class="square ' + game.board[i] + '" data-position=' + i + '></div>';});
  //$('#board').append(squares);
  //$('#board').attr('data-id', game.id);
  htmlBoardParse(game.id, game.board)
  htmlStatusParse({health: 100, message: 'Good Luck!'})
  $('#game').remove();
}

function htmlBoardParse(id, board){
  $('#board').empty()
  var squares = _.map(board, function(s, i){return '<div class="square ' + board[i] + '" data-position=' + i + '></div>';});
  $('#board').append(squares);
  $('#board').attr('data-id', id);
}

function htmlStatusParse(status){
  console.log(status)
  if(typeof status.health != 'undefined'){
    $('#health').text(status.health)
  }
  if(typeof status.hasPrinces != 'undefined'){
    $('#princess').css('text-decoration','line-through')
  }
  if(typeof status.hasGold != 'undefined'){
    $('#gold').css('text-decoration','line-through')
  }
  if(typeof status.message != 'undefined'){
    $('#message').text(status.message)
  }
}

function htmlUpdateGame(data){
  debugger;
  console.log('hello' + data);
  var id = $('#board').attr('data-id')
  htmlBoardParse(id, data.board)
  htmlStatusParse(data.status)
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
