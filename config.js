/*
 * Configuration
 */

const home = require('os').homedir;

module.exports = {
	port: 3001,
	settingsDir : home+'/.arching-kaos-api/',
	ipfsGateway : 'http://{$IPFS_SERVER_NAME}/ipfs/',
	esotericGateway : 'http://127.0.0.1:8080/ipfs/',
	downloadsFolder : home+'/.arching-kaos-api/downloads/',
	ipList: home+'/.arching-kaos-api/ipList.json',
	showsList: home+'/.arching-kaos-api/shows.json',
	serverList: home+'/.arching-kaos-api/servers.json'
}
