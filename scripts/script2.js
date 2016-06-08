$(document).ready(function(){
  var $clrBtn    = $('#clear-btn'),
      $submitBtn = $('#submit-btn'),
      $tracks    = $('#track_div'),
      $bin       = $('#center'),
      count      = 0,
      postObj    = {results:[]};

   var button = $('#button');
button.on('click', function(){
  $('#artists').html('')
  var artist = $('#title').val();

  $.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, function(data){
    $.each(data,(function(idx, item){
      item.items.forEach(artists => {
        var artURI = artists.uri.slice(15);
        $('#artists').append(`<p id=${artURI} class="artists">${artists.name}</p>`)

      });
    }))
  $('.artists').on("click", function(){
    $tracks.html("");
    var nameArray = [];
    $.get(`https://api.spotify.com/v1/artists/${$(this).context.id}/albums`, function(data){
      data.items.forEach(alb => {
           if(nameArray.indexOf(alb.name.toLowerCase()) === -1){
           var $input   = $('<input>');
           $input.css('background-image', `url(${alb.images[1].url})`).
                  attr('type', 'button').
                  addClass('tracks').
                  attr('id', alb.id);
                  nameArray.push(alb.name.toLowerCase())
           $tracks.append($input)
        }

      })

         //send button info to bin
          $('.tracks').on('click',function(){
              $bin.html("")
              data.items.forEach(item => {
                var TrackArr = [];
                  if(item.id == $(this)[0].id){
                      $.get(`https://api.spotify.com/v1/albums/${item.id}/tracks`, function(trax){
                      trax.items.forEach(Track => {
                      TrackArr.push(Track.id)

                           });
                      var TrackId = TrackArr.join(",")
                      $("iframe").attr("src",`https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:${TrackArr}`)
                         })
                       }
                    })
                  })
               })
             })
           })
         })



  //clear the bin and repopulate button choices
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


})
