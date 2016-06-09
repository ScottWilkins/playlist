$(document).ready(function(){
  var $tracks    = $('#track_div'),
      button     = $('#button');
  $('button').on('click', searchArtist);
  $(document).on('click','.artists', getAlbums)
  $(document).on('click','.tracks', showTracks)

  function searchArtist(artist){
      artist = $('#title').val();
      callAjax("https://api.spotify.com/v1/search?q=", artist, showNames, '&type=artist', 'artists')
    }
  function showNames(names){
       names.forEach(name => {
             var artURI = name.id
             var p      = document.createElement("p")
             p.id       = artURI;
             $(p).addClass("artists");
             $(p).html(name.name)
             $('#artists').append(p)
       })
  }
  function getAlbums(){
      callAjax("https://api.spotify.com/v1/artists/", $(this).context.id, showAlbums, '/albums')
  }
  function showAlbums(albums){
        var nameArray = []
      albums.forEach(album => {
        var name  = album.name;
        var id    = album.id;
        var image = album.images[1].url;
        if(nameArray.indexOf(name.toLowerCase()) === -1){
                   var inpt = document.createElement('input');
                   inpt.type = 'button';
                   $(inpt).css("background-image",`url(${image})`)
                   $(inpt).addClass('tracks')
                   $(inpt).attr('id', id)
                   nameArray.push(name.toLowerCase())
                   $tracks.append(inpt)
                  }
            })
  }
  function showTracks(){
    callAjax("https://api.spotify.com/v1/albums/", this.id, populatePlayerArr, '/tracks')

  }
  function populatePlayerArr(tracks){
    var TrackArr = [];
    tracks.forEach(item => {
         TrackArr.push(item.id)
     })
          populatePlayer(TrackArr)
    }
  function populatePlayer(arr){
    var list = arr.join(",");
    $("iframe").attr("src",`https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:${list}`)
  }

  function callAjax(url,variable,func,optionUrl,resultKey){
    optionUrl = optionUrl || ""
    $.ajax({
      url: url + variable + optionUrl}).done(function (results) {
      resultKey ? func(results[resultKey].items) : func(results.items)
   })
  }
})
