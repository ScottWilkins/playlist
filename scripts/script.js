document.addEventListener("DOMContentLoaded", function(event) {
  var arr         = [0,1,2,3,4]
  function splicer() {return Math.floor(Math.random() * arr.length)}
  function albNum()  {return arr.splice(splicer(),1)[0];}
  var albNum1     = albNum(),
      albNum2     = albNum(),
      albNum3     = albNum();
  var trackDiv    = document.getElementById('track_div')
  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
       if(httpRequest.status < 400) {
         var data   = JSON.parse(httpRequest.responseText);
         console.log(data);
         var alb1   = data.results[albNum1].cover_art;
         var alb2   = data.results[albNum2].cover_art;
         var alb3   = data.results[albNum3].cover_art;
         var albArr = [alb1,alb2,alb3]
         albArr.forEach(alb => {
                var img = document.createElement('img')
                var div = document.createElement('div')
                div.className = "tracks";
                img.className = "covers"
                img.setAttribute("src", `./images/${alb}`);
                trackDiv.appendChild(div)
                div.appendChild(img)
         })
         }

       }
    }
httpRequest.open('GET', 'https://lit-fortress-6467.herokuapp.com/object');
httpRequest.send();
});
