/*
 * Configuration
 */

const home = require('os').homedir;

module.exports = {
	port: 3001,
	settingsDir : home+'/.arching-kaos-api/',
	ipfsGateway : 'https://ipfs.arching-kaos.tk/ipfs/',
	esotericGateway : 'http://172.17.0.1:8080/ipfs/',
	downloadsFolder : home+'/.arching-kaos-api/downloads/',
	ipList: home+'/.arching-kaos-api/ipList.json',
	showsList: home+'/.arching-kaos-api/shows.json'
}
