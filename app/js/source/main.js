(function(){
  'use strict';


  $(document).ready(init);

  var selected;
  var moveTarget;

  function init(){
    boardCoordinates();
    initializeBoard();
    $('#board').on('click', '.valid.current', select);
    $('#board').on('click', '.valid:not(.occupied)', move);
  }



  function select(){
    if(selected){
      selected.removeClass('selected');
    }
      var $target = $(this).addClass('selected');
      selected = $target;
  }

  function move(){
    debugger;
    moveTarget = $(this);

    var finalX = moveTarget.data('x');
    var finalY = moveTarget.data('y');

    var initialX = selected.data('x');
    var initialY = selected.data('y');

    var vector = [];
    vector.push(finalX - initialX);
    vector.push(finalY - initialY);
    if(Math.abs(vector[0]) + Math.abs(vector[1]) === 2){
      if(direction()){
        movePiece();
        endTurn();
      }
    } else if(Math.abs(vector[0]) + Math.abs(vector[1]) === 4){
      if(direction()){
        var avgX = (finalX + initialX) / 2;
        var avgY = (finalY + initialY) / 2;
        var $deadPiece = $('td[data-x=' + avgX + '][data-y=' + avgY +']');

        if($deadPiece.hasClass('occupied') && !$deadPiece.hasClass('current')){
          $deadPiece.empty();
          $deadPiece.removeClass('occupied');
          movePiece();
          endTurn();
        }
      }
    }
  }

  function endTurn(){
    var $currentPlayer = $('td.current');
    var $newPlayer = $('td.occupied');
    $newPlayer.addClass('current');
    $currentPlayer.removeClass('current');
  }

  function movePiece(){
    if(!moveTarget.hasClass('occupied')){
      var $image = selected.find('img');
      selected.empty();
      moveTarget.append($image);

      selected.removeClass('occupied current selected');
      moveTarget.addClass('occupied current');
    }
  }

  function direction(){
    var finalY = moveTarget.data('y');
    var initialY = selected.data('y');
    if(selected.hasClass('king')){
      return true;
    }

    if(selected.hasClass('playerA') && finalY > initialY){
        return true;
      } else if(selected.hasClass('playerB') && finalY < initialY){
        return true;
      }
    return false;
  }

    // var x = $(td).data('x');
    // var y = $(td).data('y');
    // selected =
    // var a = $('td[data-x=][data-y=]');
    // debugger;
    // for(var i = -1; i < 2; i+=2){
    //   x = x - i;
    //   for(var j =  -1; j < 2; i+=2){
    //     y = y - j;
    //     var possibleX = $(td).attr('data-x', i);
    //     var possibleY = $(td).attr('data-y', j);
    //     $('td[data-x="possibleX"][data-y="possibleY"]').addClass('possible');
    //   }
    // }

    // if($('.valid').data('x') === x-- || $('.valid').data('x') === x++){
    //   console.log($('.valid').data('x'));
  // }


  // function regMove(){
    // if(x-- || x++ && y-- || y++){
    //
    // }
    // $('img').remove('.selected');
    // (this).removeClass('selected');
  // }

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
        var $img = $('<img>');
        $(td).addClass('playerA occupied current').append($img);
        $img.attr('src', '../media/' + 'piece.png');
      }
    }
    for(var j = 40; j < 64; j++){
      td = $('#board > tbody > tr >td')[j];
      if($(td).hasClass('checkers-black')){
        var $img2 = $('<img>');
        $(td).addClass('playerB occupied').append($img2);
        $img2.attr('src', '../media/' + 'piece.png');
      }
    }
  }



})();
