
const { exec } = require("child_process");
module.exports = (command) => {
	exec(command, (error,stdout,stderr)=>{
		if(error) console.log(error) 
		if(stderr) console.log(stderr) 
		if(stdout) console.log(stdout) 
		return stdout
	})
}
