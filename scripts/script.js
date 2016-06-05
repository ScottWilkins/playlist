$(document).ready(function(){
  $.get( "https://lit-fortress-6467.herokuapp.com/object", function( data ) {

var $track    = $('#track_div')
var dataArr   = data.results;
var selectArr = [];
//create function to randomly select designated number of tracks from api
function picker(arrLength, numPicks){
  if(!numPicks)return
  var track = dataArr.splice(Math.floor(Math.random()*arrLength),1)
  selectArr.push(track["0"])
  picker(arrLength-1,numPicks-1)
}

picker(dataArr.length, 3)

selectArr.forEach(alb=> {
  var $div = $('<div>').css('background-image', `url(./images/${alb.cover_art})`)
                       .addClass('tracks');
  $track.append($div)
})
});

})
