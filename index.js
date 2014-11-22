#!/usr/bin/env node
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;

var config = __dirname + "/config.js"

var cmd ="" + __dirname + "/node_modules/.bin/supervisor " + __dirname + "/bin/www "

//函数可以返回当前正在执行的项目路径
var pwd = process.cwd()
var up_folder = pwd;

fs.writeFile(config, "module.exports = {'upload': '" + up_folder + "'};" , function (err) {
  if (err) {
		console.log('[up-cli Error] It\'s config file not saved!' + err);
  	throw err;
  }
  
	console.log('[up-cli INFO] It\'s served! now you can open in browser http://127.0.0.1:3456/');
	function puts(error, stdout, stderr) { 
		sys.puts(stdout) 
	}
	
	exec(cmd, puts);
});


