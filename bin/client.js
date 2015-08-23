#!/usr/bin/env node

var fs = require('fs')
var request = require('request')
//函数可以返回当前正在执行的项目路径
var pwd = process.cwd()


var argv = process.argv;
var up_file = argv[2];

console.log(up_file);

var url = "http://127.0.0.1:3456/"

//
var formData = {
  // Pass a simple key-value pair
  name: 'pic',
  // Pass multiple values /w an Array
  filename: fs.createReadStream(up_file)
};

request.post({url: url, formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful! ' + url);
});

