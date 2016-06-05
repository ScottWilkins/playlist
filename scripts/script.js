$(document).ready(function(){
  var $chooseBtn = $('#choose_tracks_btn')
  $.get( "https://lit-fortress-6467.herokuapp.com/object", function( data ) {

var $track    = $('#track_div'),
    dataArr   = data.results,
    selectArr = picker(dataArr, 3);

selectArr.forEach(alb=> {
  var $div = $('<div>').css('background-image', `url(./images/${alb.cover_art})`)
                       .addClass('tracks');
  $track.append($div)
})
});
$chooseBtn.on('click', function(){
  window.location.href = "index2.html";
})
})
