document.addEventListener("DOMContentLoaded", function(event) {

  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
       if(httpRequest.status < 400) {
         var data   = JSON.parse(httpRequest.responseText);
         console.log(data);
         var trackDiv    = document.getElementById('track_div')
         var alb1        = data.results[0];
         var alb2        = data.results[1];
         var alb3        = data.results[2];
         var alb4        = data.results[3];
         var alb5        = data.results[4];
         var albArr      = [alb1,alb2,alb3,alb4,alb5]
         //map button strings to objects to call them in eventhandler later
         var map         = {'alb1':alb1,'alb2':alb2,'alb3':alb3,'alb4':alb4,'alb5':alb5};
         var bin         = document.getElementById('center')
         var clrBtn      = document.getElementById('clear-btn')
         //set count to dynamically create input variable ids
         var count       = 1;
         var btns        = ['alb1','alb2','alb3','alb4','alb5']
         //dynamically create buttons from json images
         albArr.forEach(alb => {
                var input       = document.createElement('input')
                var div         = document.createElement('div')
                div.className   = "tracks";
                input.className = "covers"
                input.src       = `./images/${alb.cover_art}`;
                input.type      = `image`;
                input.id        = `alb${count}`;
                trackDiv        .appendChild(div)
                div             .appendChild(input)
                count++
         })
         //dynamically link input buttons to add info to bin
        btns.forEach(bttn => {
               var bt = document.getElementById(bttn);
               bt.addEventListener('click', function(){
                 var p       = document.createElement("p")
                 p.id        = map[bt.id].id
                 p.innerHTML = `Artist: ${map[bt.id].artist}<br>
                                 Title: ${map[bt.id].title}`
                 bin.appendChild(p)

               })
        })
        //clear bin
       clrBtn.addEventListener('click',function(){
              bin.innerHTML = "";
       })
         }

       }
    }
httpRequest.open('GET', 'https://lit-fortress-6467.herokuapp.com/object');
httpRequest.send();
});
//<input type="image" src="logg.png" name="saveForm" class="btTxt submit" id="saveForm" />
