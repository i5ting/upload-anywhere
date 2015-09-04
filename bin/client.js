#!/usr/bin/env node

var fs = require('fs')
var request = require('request')
//函数可以返回当前正在执行的项目路径
var pwd = process.cwd()


var argv = process.argv;
var up_file = argv[2];

// - uci -h 127.0.0.1 -p 3456 -f file 

var program = require('commander');

program
  .version('0.0.1')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-h, --host [host]', 'Add host [marble]', '127.0.0.1')
  .option('-p, --port [port]', 'Add port [port]', '3456')
  .option('-f, --file [file]', 'Add file [marble]')
  .parse(process.argv);

if (program.host) {
  console.log('host=' + program.host);
}else{
  program.host = '127.0.0.1';
}

if (program.file) {
  console.log('file=' + program.file);
}else{
  if(up_file[0] != '-'){
    program.file = up_file;
    console.log('file=' + program.file);
  }else{
    console.log('file not exist, please add -f or --file') 
  }
}


var url = "http://" + program.host + ":" + program.port + "/"

//
var formData = {
  // Pass a simple key-value pair
  name: 'pic',
  // Pass multiple values /w an Array
  filename: fs.createReadStream(program.file)
};

console.time("upload anywhere");
request.post({url: url, formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful! ' + url);
  console.timeEnd("upload anywhere");
});
