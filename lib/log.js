/*
 * Kaotisk Hund
 *
 * nodeJS Log - logs messages to local file
 *
 * Args:
 * a : Application name
 * s : Status (log, err, warn, whatever...)
 * m : Message
 *
 * Returns:
 * A file on local folder named as (a)_logs.(s) where
 * the content is lines of (UnixTimeFormat)-(m) in UTF8.
 *
 */
module.exports = (a, s, m)=>{
	var fn = a+'_logs.'+s;
	var tx = Date.now() + '-' +m+ '\n';
	if(!fs.existsSync(fn)){
		fs.writeFile(fn, tx, 'utf8', ()=>{
			console.log("New file:" + fn + "\t\tAdded event: " + tx);
		});
	}
	else {
		var f = fs.readFileSync(fn);
		fs.appendFile(fn, tx, 'utf8', ()=>{
			console.log("Adding to file: " + fn + "\t\tEvent: " + m);
		});
	}
}
