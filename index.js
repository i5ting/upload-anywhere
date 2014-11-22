#!/usr/bin/env node
var open = require("open");
require('shelljs/global');

var config = __dirname + "/config.json"

var cmd = __dirname + "/node_modules/.bin/supervisor " + __dirname + "/bin/www"

//函数可以返回当前正在执行的项目路径
var pwd = process.cwd()
var up_folder = pwd;
	

fs.writeFile(config, "module.exports = {'upload': " + up_folder + "};" , function (err) {
  if (err) {
		console.log('[up-cli Error] It\'s config file not saved!' + err);
  	throw err;
  }
  
	console.log('[up-cli INFO] It\'s config file saved!');
	
	// Run external tool synchronously
	if (exec(cmd).code !== 0) {
	  echo('[up-cli Error] Error: up-cli execute failed');
	  exit(1);
	}elst{
		console.log('[up-cli INFO]  up-cli execute success!');
		open('http://127.0.0.1:3456/');
	}
});


