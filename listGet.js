var fs = require("fs")
var config = require("./config.js")
	
// Show everything from the showsList
function showsAll() {
  var freshData = JSON.parse(fs.readFileSync(config.showsList))
  for(i = 0 ; i< freshData.length; i++)
  console.log(freshData[i].ipfs)
}
showsAll();