/*
 * Configuration
 */

const home = require('os').homedir;

module.exports = {
	port: 3001,
	ipfsGateway : 'https://ipfs.arching-kaos.tk/ipfs/',
	esotericGateway : 'http://127.0.0.1:8080/ipfs/',
	downloadsFolder : home+'/.arching-kaos-api/downloads',
	ipList: home+'/.arching-kaos-api',
	showsList: home+'/.arching-kaos-api/shows.json'
}
