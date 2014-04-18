(function(){
  'use strict';


  $(document).ready(init);

  function init(){
    boardCoordinates();
    initializeBoard();
    $('#board').on('click', '.valid .current', select);
    $('.valid').on('click', '.valid', regMove);
  }



  function select(){

    $(this).addClass('selected');
    // var td = $(this).parent();
    // var x = $(td).data('x');
    // var y = $(td).data('y');
    //
    // }
    // regMove(x,y);
  }

  function regMove(){
    debugger;
    $('img').remove('.selected');
    // (this).removeClass('selected');
  }

  function boardCoordinates(){
    for(var j = 0; j < $('#board > tbody > tr').length; j++){
      var row = $('#board > tbody > tr')[j];
      var $row = $(row);
      var tds = $row.children();

      for(var i = 0; i < tds.length; i++){
        var td = tds[i];
        $(td).attr('data-x', i);
        $(td).attr('data-y', j);
      }
    }
  }

  function initializeBoard(){
    var td;
    for(var i = 0; i < 24; i++){
      td = $('#board > tbody > tr >td')[i];
      if($(td).hasClass('checkers-black')){
        var $img = $('<img>').addClass('playerA visible current');
        $(td).addClass('occupied').append($img);
        $img.attr('src', '../media/' + 'piece.png');
      }
    }
    for(var j = 40; j < 64; j++){
      td = $('#board > tbody > tr >td')[j];
      if($(td).hasClass('checkers-black')){
        var $img2 = $('<img>').addClass('playerB visible');
        $(td).addClass('occupied').append($img2);
        $img2.attr('src', '../media/' + 'piece.png');
      }
    }
  }



})();
