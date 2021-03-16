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
var iplist = fs.readFileSync(config.ipList)

// and parse it
var data = JSON.parse(lists);
var ipList = JSON.parse(iplist)

// set a default route
app.get('/', cors(corsOptions), hi)

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

// add a route where we register a USER
app.get('/register/:cjdns', cors(corsOptions), register);

// add a route to register SERVER
app.get('/server/register/:cjdns/:ipfs/:hostname/:ssb', cors(corsOptions), serverRegister);

// test
app.get('/*', cors(corsOptions), (req,res)=>{console.log(req.url);res.json("404")})


function ssbCheck( ssb )
{
	if ( ssb ){
		return ssb;
	} else {
		return 0;
	}
}

function ipfsCheck( ipfs )
{
//	if( isIPFS.multihash( ipfs ) ){
	if( ipfs ){
		return ipfs;
	} else {
		return 0;
	}
}

function cjdnsCheck( cjdns )
{
	if( cjdns ){
		return cjdns;
	} else {
		return 0;
	}
}

function hostnameCheck ( hostname )
{
	if( hostname ){
		return hostname;
	} else {
		return 0;
	}
}

// Register CJDNS SERVER
async function serverRegister( req, res )
{
	var ssb = ssbCheck( req.params.ssb )
	var ipfs = ipfsCheck( req.params.ipfs )
	var cjdns = cjdnsCheck( req.params.cjdns )
	var hostname = hostnameCheck( req.params.hostname )
	console.log( "Trying register a server: " + cjdns )
	if( !checkIP( cjdns ) ){
				// # TODO
				// we want to create a server exchange
				// - [x] - We will need a new file. Let's say, `servers.json`.
				// - [x] - We also need the IPFS check.
				// After all that, we can do the trick:
				// 1. Add the server
				// 2. Peer over cjdns (if possible)
				// 3. Peer over IPFS
				// 4. Follow on SSB
				// 5. Try to sync mixtapes with API of server
		console.log( "Yes, "+ cjdns + " is already an uploader!" )
	}
	var record = {"cjdns":cjdns,"ipfs":ipfs,"hostname":hostname,"ssb":ssb}
	console.log(record)
	var NewServer = record
	//Store it as the first array element of our new list
	var NewServerList = [NewServer]
	//Append the previous IPs
	var oldServerList = JSON.parse( fs.readFileSync(config.serverList) )
	for (var i = 0; i < oldServerList.length; i++){
		NewServerList[i+1] = oldServerList[i]
	}
	var ReadyServerList = JSON.stringify( NewServerList )
	fs.writeFile(config.serverList, ReadyServerList, 'utf8', finished);
	function finished(){console.log(NewServerList)}
	res.json(record)
}



// Register CJDNS for now
async function register(req,res)
{
	var cjdns = req.params.cjdns
	console.log("Trying register a user: "+cjdns)
	if(!checkIP(cjdns)) {
		addIP(cjdns, res)
	} else {
		res.send("Already registered")
		console.log(cjdns + " is already registered")
	}
}

// Show everything from the showsList
function showsAll(req,res) {
  var freshData = JSON.parse(fs.readFileSync(config.showsList))
  res.send(freshData)
}

// Check if IP is in ipList
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

// Add IP (IPv6 from CJDNS)
function addIP(ip, res)
{
	var ipListFormat = {ip:ip}
	//Store it as the first array element of our new list
	var NewIpList = [ipListFormat]
	//Append the previous IPs
	var ipList2 = JSON.parse(fs.readFileSync(config.ipList))
	for (var i = 0; i < ipList2.length; i++){
		NewIpList[i+1] = ipList2[i]
	}
	var ReadyIpList = JSON.stringify(NewIpList);
	fs.writeFile(config.ipList, ReadyIpList, 'utf8', finished);
	function finished(){console.log("AddIP: Done")}
	res.send(NewIpList)
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
