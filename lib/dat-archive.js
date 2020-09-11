/*
 * This is a library for Arching-Kaos-API
 *
 * We take a directory for creating a DAT repository and
 * a function to which we return the dat key of this repo.
 *
 * After initiating and creating the dat repo, we stay in
 * sync with the network, in order to provide the file.
 *
 */


var Dat = require('dat');
let datAddress;

module.exports = (giveDatAddress, dir) => {
	var dirfornow = dir
	console.log(dirfornow)
	/* Function */
	Dat(dirfornow, function (err, dat) {
		dat.importFiles()
		dat.joinNetwork()
		datAddress = 'dat://'+dat.key.toString('hex');
		giveDatAddress(datAddress)
		return datAddress
	})
}
