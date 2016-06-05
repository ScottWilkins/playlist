$(document).ready(function(){
  $.get( "https://lit-fortress-6467.herokuapp.com/object", function( data ) {
  var $clrBtn    = $('#clear-btn'),
      $submitBtn = $('#submit-btn'),
      $tracks    = $('#track_div'),
      $bin       = $('#center'),
      count      = 0,
      postObj    = {results:[]},
      buttons    = [];
 //wrap in function to clear bin later
 function populate(){

   data.results.forEach(item=> {
      var $input   = $('<input>');
      $input.css('background-image', `url(./images/${item.cover_art})`).
             attr('type', 'button').
             addClass('tracks').
             attr('id', `${item['id']}`);
             buttons.push($input)
      $tracks.append($input)
    })

    buttons.forEach(button => {
      button.on('click',function(){
        var $info  = $('<p>');
        var title, album;
          data.results.forEach(item => {
            if(item.id == $(this)[0].id){
              artist = item.artist;
              title  = item.title;
              postObj.results.push(item)
            }
          })
      $info.html(`${artist}<br>${title}`)
      $bin.append($info);
      $(this).remove();
    })
  })
}

  $clrBtn.on('click',function(){
    $bin.html('')
    $tracks.html('')
    populate()
  })
  $submitBtn.on('click',function(){
    $.post( "https://lit-fortress-6467.herokuapp.com/post", postObj, function( data ) {
       console.log(data);
});
  })
   populate()
})
})
