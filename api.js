/*
 * Arching Kaos API
 * Author: Kaotisk Hund <kaotisk@arching-kaos.tk>
 * Description: Provides an API and a landing page to upload a show to our radio station. Also,
 * stores and retrieves the show list for our site to be informed.
 * License: MIT
 *
 *
 */

//#!/usr/bin/env node

// Loads express HTTP server
var express = require('express')

// And CORS for cross-origin requests
var cors = require('cors')

// Loads configuration
var config = require('./config')

// More libraries are loaded for helping
const isIPFS = require('is-ipfs')	// IPFS link checker
const http = require('http')		// HTTP for fetching paths
var fs = require('fs')			// FS for communicating with the local filesystem

// We start our server ...
var app = express()
// ... and we listen at this port ...
var server = app.listen(config.port)
// ... and also use CORS
app.use(cors())

// We load our showsList json file ...
var lists = fs.readFileSync(config.showsList)

// and parse it
var data = JSON.parse(lists);

// set a default route
app.get('/', cors(corsOptions))

// Function helping log the ip from where the request was send.
function hi(req, res) {
  res.send('You are connnecting from '+req.ip+' and you have reach the / entry point of our API')
}

// set a route with specific format for adding a show
app.get('/show/add/:ipfs/:artist/:title', cors(corsOptions), add);

// add a route where we show our showsList in JSON
app.get('/shows', cors(corsOptions), showsAll);

// add a route where we upload things
app.get('/upload', cors(corsOptions), upload);


// Show everything from the showsList
function showsAll(req,res) {
  var freshData = JSON.parse(fs.readFileSync(config.showsList))
  res.send(freshData)
}

// Check if IP is in ipList
var ipList = JSON.parse(fs.readFileSync(config.ipList))
function checkIP(ip){
  for (var i = 0; i<ipList.length; i++){
    console.log(ipList[i])
    if(ip==ipList[i].ip){
      console.log(ipList[i])
      return true;
    }
  }
  return false;
}

// add new show
async function add(req,res){
  console.log('add request by: '+req.ip) // log ip to console
  var authorized = checkIP(req.ip)
  if(!authorized){
    res.send({err:'Unauthorized'})

  } else {
    if (isIPFS.multihash(req.params.ipfs)){ // we check if it is really ipfs
    	var artist = req.params.artist
    	var dir = config.downloadsFolder+artist
    	if(!fs.existsSync(dir)) { // make dir for artist
    		fs.mkdirSync(dir)
    	}
    	const file = fs.createWriteStream(dir+'/'+req.params.artist+' - '+req.params.title+'.ogg') // get the file...
	const request = http.get(config.esotericGateway+req.params.ipfs, function(respone){
        	respone.pipe(file)	// and save it...
        	console.log('File downloaded')
	})

	// Include the library for creating DAT repo
	var dat = require('./lib/dat-archive')

	// And run it
	var rec = await dat(giveDatAddress, dir)

	// Here we make the following function to get our procedure done
	async function giveDatAddress(address){
		// Create our new entry
	      	var rec = {
    	  		ipfs: config.ipfsGateway+req.params.ipfs,
    	  		dat: address,
    	  		artist: req.params.artist,
    	  		title: req.params.title
      		}

		// Store it as the first array element of our new list
      		var all = [await rec]

		// Append the previous shows
  	  	for (var i = 0; i < data.length; i++){
			all[i+1] = data[i]
		}

		// Turn additional back into text
		var json = JSON.stringify(await all);

		// Write out the file
		fs.writeFile(config.showsList, await json, 'utf8', finished);

		// Include the library for sending ssb post
		var ssb = require('./lib/ssb-post.js')

		// Send to scuttlebot the ingredients of its post
		await ssb(rec);

		// Callback for when file is finished
		function finished(err) {
			console.log('finished writing file');
		}
		res.send(all)
	}
    } else { // if not ipfs hash, inform them
	res.send('Not IPFS hash');
    }
  }
}

// use this folder for static content (html files)
app.use(express.static('public'))
app.use(cors)
var corsOptions = {
  origin: 'https://radio.arching-kaos.tk',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Funny function?
function upload(req, res){
  res.send()
}
