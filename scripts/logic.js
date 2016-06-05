//create function to randomly select designated number of tracks from api
function picker(dataArr, numPicks){
  var newArr = [];
  for (var i = 0; i < numPicks; i++) {
    var track = dataArr.splice(Math.floor(Math.random()*dataArr.length),1)
    newArr.push(track["0"])
}
  return newArr
}
