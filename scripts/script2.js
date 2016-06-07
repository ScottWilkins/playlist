$(document).ready(function(){
  var $clrBtn    = $('#clear-btn'),
      $submitBtn = $('#submit-btn');
  var $tracks    = $('#track_div'),
      $bin       = $('#center'),
      count      = 0,
      postObj    = {results:[]};

 //wrap in function to clear bin later
 function populate(){
   var button = $('#button');
button.on('click', function(){
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
        // console.log(alb.name);
        // console.log(alb.images[1].url);
           if(nameArray.indexOf(alb.name.toLowerCase()) === -1){
           var $input   = $('<input>');
           $input.css('background-image', `url(${alb.images[1].url})`).
                  attr('type', 'button').
                  addClass('tracks').
                  attr('id', `${alb.id}`);
                  nameArray.push(alb.name.toLowerCase())
        //           //put buttons in array for grouping functionality
          $tracks.append($input)
        }
      console.log(nameArray);
      })

        // //create clickable album covers
        // data.results.forEach(item=> {
        //    var $input   = $('<input>');
        //    $input.css('background-image', `url(./images/${item.cover_art})`).
        //           attr('type', 'button').
        //           addClass('tracks').
        //           attr('id', `${item['id']}`);
        //           //put buttons in array for grouping functionality
        //    buttons.push($input)
        //    $tracks.append($input)
        //  })

    })
  })

     })
    })

  //   //create clickable album covers
  //   data.results.forEach(item=> {
  //      var $input   = $('<input>');
  //      $input.css('background-image', `url(./images/${item.cover_art})`).
  //             attr('type', 'button').
  //             addClass('tracks').
  //             attr('id', `${item['id']}`);
  //             //put buttons in array for grouping functionality
  //      buttons.push($input)
  //      $tracks.append($input)
  //    })
  //    //send button info to bin
  //    buttons.forEach(button => {
  //      button.on('click',function(){
  //        var $info  = $('<p>');
  //        var title, album;
  //          data.results.forEach(item => {
  //            if(item.id == $(this)[0].id){
  //              artist = item.artist;
  //              title  = item.title;
  //              //populate the post data with objects related to selected buttons
  //              postObj.results.push(item)
  //            }
  //          })
  //      $info.html(`${artist}<br>${title}`)
  //      $bin.append($info);
  //      //remove button from choices
  //      $(this).remove();
  //    })
  //  })

}
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
   populate()

})
