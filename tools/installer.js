/*
 * Installer script for Arching Kaos API
 */

var fs = require('fs')

// Get configuration
var config = require('../config')

// Create if not exists settings directory
if(!fs.existsSync(config.settingsDir)) {
	fs.mkdirSync(config.settingsDir)
}

// Create if not exists downloads folder
if(!fs.existsSync(config.dowonloadsFolder)) {
	fs.mkdirSync(config.downloadsFolder)
}