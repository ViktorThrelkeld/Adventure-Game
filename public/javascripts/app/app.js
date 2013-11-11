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

    // e = e || event;

    if (e.keyCode == '38') {
        // up arrow
        alert('up');
    }
    else if (e.keyCode == '40') {
        // down arrow
        alert('down');
    }
    else if (e.keyCode == '37') {
        // left arrow
        alert('left');
    }
    else if (e.keyCode == '39') {
        // right arrow
        alert('right');
    }

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
  // $('#user').text(game.user + '\'s Adventure');
  $('#health').text(game.user + '\'s Health: ' + game.health);
  $('#form').remove();
  var squares = _.map(game.board, function(s, i){return '<div class="square ' + game.board[i] + '" data-position=' + i + '></div>';});
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
