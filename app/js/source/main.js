(function(){
  'use strict';


  $(document).ready(init);

  var selected;
  var moveTarget;
  var continueTurn = false;

  function init(){
    boardCoordinates();
    initializeBoard();
    $('#board').on('click', '.valid.occupied.current', select);
    $('#board').on('click', '.valid:not(.occupied)', move);
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
        var $img = $('<img>');
        $(td).addClass('playerA occupied current').append($img);
        $img.attr('src', './media/' + 'beatles_logo80px.png');
      }
    }
    for(var j = 40; j < 64; j++){
      td = $('#board > tbody > tr >td')[j];
      if($(td).hasClass('checkers-black')){
        var $img2 = $('<img>');
        $(td).addClass('playerB occupied').append($img2);
        $img2.attr('src', './media/' + 'stones_logo80px.png');
      }
    }
  }



  function select(){
    if(selected){
      selected.removeClass('selected');
    }
      var $target = $(this).addClass('selected');
      selected = $target;
  }

  function move(){
    moveTarget = $(this);

    var finalX = moveTarget.data('x');
    var finalY = moveTarget.data('y');

    var initialX = selected.data('x');
    var initialY = selected.data('y');

    var vector = [];
    vector.push(finalX - initialX);
    vector.push(finalY - initialY);

    if(Math.abs(vector[0]) + Math.abs(vector[1]) === 2){
      if(direction(selected, moveTarget)){
        movePiece();
        continueTurn = false;
        endTurn();
        endGame();
      }

    } else if(Math.abs(vector[0]) + Math.abs(vector[1]) === 4){

      if(direction(selected, moveTarget)){
        var avgX = (finalX + initialX) / 2;
        var avgY = (finalY + initialY) / 2;
        var $deadPiece = $('td[data-x=' + avgX + '][data-y=' + avgY +']');

        if($deadPiece.hasClass('occupied') && !$deadPiece.hasClass('current')){
          $deadPiece.empty();
          $deadPiece.removeClass('occupied');
          if($deadPiece.hasClass('playerA')){
            $deadPiece.removeClass('playerA');
          } else {
            $deadPiece.removeClass('playerB');
          }

          movePiece();
          if(checkPotential() < 4){
            continueTurn = true;
          } else {
            continueTurn = false;
          }
          endTurn();
          endGame();
        }
      }
    }
  }


  function endTurn(){
    if(!continueTurn){
      var $currentPlayer = $('td.current');
      var $newPlayer = $('td.occupied');

      $newPlayer.addClass('current');
      $currentPlayer.removeClass('current');
    }
  }

  function movePiece(){
    if(!moveTarget.hasClass('occupied')){
      var $image = selected.find('img');
      selected.empty();
      moveTarget.append($image);

      selected.removeClass('occupied current selected');
      moveTarget.addClass('occupied current');
    if(selected.hasClass('playerA')){
        selected.removeClass('playerA');
        moveTarget.addClass('playerA');
        if(moveTarget.data('y') === 7){
          moveTarget.addClass('king');
          var $kingA = $('<img>').attr('src', './media/lennon80px.png');
          moveTarget.empty();
          moveTarget.append($kingA);
        }
      } else {
        selected.removeClass('playerB');
        moveTarget.addClass('playerB');
        if(moveTarget.data('y') === 0){
          moveTarget.addClass('king');
          var $kingB = $('<img>').attr('src', './media/jagger80px.png');
          moveTarget.empty();
          moveTarget.append($kingB);
        }
      }
      if(selected.hasClass('king')){
        selected.removeClass('king');
        moveTarget.addClass('king');
      }
    }
  }

  function direction(currentPosition, targetPosition){
    var finalY = targetPosition.data('y');
    var initialY = currentPosition.data('y');
    if(currentPosition.hasClass('king')){
      return true;
    }

    if(currentPosition.hasClass('playerA') && finalY > initialY){
        return true;
      } else if(currentPosition.hasClass('playerB') && finalY < initialY){
        return true;
      }
    return false;
  }

  function average(x, y){
    return (x+y) / 2;
  }

  function generateDead(currentPosition, possibleMove){ //generates location of possible dead piece(s)
    var avgX = average(currentPosition.data('x'), possibleMove.data('x'));
    var avgY = average(currentPosition.data('y'), possibleMove.data('y'));
    return $('td[data-x=' + avgX + '][data-y=' + avgY + ']');

  }

  function checkDead(deadPiece){
    return deadPiece.hasClass('occupied') && !deadPiece.hasClass('current');
  }

  function checkPotential(){

    var potentialX = [];
    var potentialY = [];
    var potentialTargets = [];

    // generates x,y values of four possible moves for sequential turns
    for(var i = -2; i <= 2; i += 4){
      potentialX.push(moveTarget.data('x') + i);
      potentialY.push(moveTarget.data('y') + i);
    }

    //populates tds of all four possible move locales for sequential turns
    for(var j = 0; j < 2; j++){
      for(var k = 0; k < 2; k++){
        potentialTargets.push($('td[data-x=' + potentialX[j] + '][data-y=' + potentialY[k] +']'));
      }
    }

    //filter possible moves
    var spliceTargets = [];
    for(var l = 0; l < potentialTargets.length; l++){
      var $dead = generateDead(moveTarget, potentialTargets[l]);
      if(potentialTargets[l].hasClass('occupied') || !checkDead($dead) || !direction(moveTarget, potentialTargets[l])){
          spliceTargets.push(l);
        // }
      }
    }

    return spliceTargets.length;
  }

  function endGame(){
    var $playerA = $('td.playerA');
    var $playerB = $('td.playerB');

    if($('td.current').length === 0 && $playerA.length === 0){
        alert('The Rolling Stones Win!');
    } else if($('td.current').length === 0 && $playerB.length === 0){
        alert('The Beatles Win!');
    }
  }


})();
