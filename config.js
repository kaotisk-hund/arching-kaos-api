/*
 * Configuration
 */

var path = require("path");

// const home = require('os').homedir;
const pwd = path.resolve(".");
const home = path.join(pwd,"storage");

module.exports = {
	port: 3001,
	settingsDir : home+'/.arching-kaos-api/',
	ipfsGateway : 'https://ipfs.arching-kaos.com/ipfs/',
	esotericGateway : 'http://127.0.0.1:8080/ipfs/',
	downloadsFolder : home+'/.arching-kaos-api/downloads/',
	ipList: home+'/.arching-kaos-api/ipList.json',
	showsList: home+'/.arching-kaos-api/shows.json'
}
