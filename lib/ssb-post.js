/*
 * Kaotisk Hund <kaotisk@arching-kaos.tk>
 *
 * ssb-post is responsible for posting the new mix on
 * ssb. We are currently using the local current user
 * that is running sbot.
 *
 */

//var pull = require('pull-stream')
var Client = require('ssb-client')

// create a ssb-server client using default settings
// (server at localhost:8080, using key found at ~/.ssb/secret, and manifest we wrote to `~/.ssb/manifest.json` above)

module.exports = (rec) => {
	Client(function (err, server) { // Connect to server
		if (err) throw err
		// Publish the message
		server.publish({
			type: 'post',
			text: '# '+ rec.artist+'\n\n\n['+rec.title+']('+rec.ipfs+')',
			channel: 'arching-kaos-radio-mixes'
			}, function (err, msg) {
			// msg.key           == hash(msg.value)
			// msg.value.author  == your id
			// msg.value.content == { type: 'post', text: 'My First Post!' }
			// ...
		})
	})
}
