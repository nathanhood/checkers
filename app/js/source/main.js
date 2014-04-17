(function(){
  'use strict';


  $(document).ready(init);

  function init(){
    initializeBoard();
  }
  //
  // function assignCoordinates(){
  //   var $td = $('#board > tbody > tr > td');
  //
  //   for(var i = 0; i < $td.length; i++){
  //     var y = $(i).parent().index();
  //     var x = $(i).index();
  //     $td[i].data('x', x);
  //     $td[i].data('y', y);
  //   }
  // }

  function initializeBoard(){
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





})();
