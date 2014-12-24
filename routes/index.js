var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config');

function explorer(dir,is_recursion,cb){
	var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function(file) {
      file = dir + '/' + file
      var stat = fs.statSync(file)
			
			if(is_recursion){
    		if (stat && stat.isDirectory()) {
					results = results.concat(explorer(file,is_recursion ))
				}else {
					results.push(file)
				}
			}else{
    		if (! stat.isDirectory()) {
					results.push(file)
				}
			}
  })
	cb(results);
  return results
}

/* GET home page. */
router.get('/', function(req, res) {
	var path = config.upload;
	var files = explorer(path,false,function(files){
	  res.render('index', { 
			title: 'Upload Cli',
			files: files 
		});
	});
});

router.all('/delete', function(req, res) {
	var file = req.body.path;
	//file exist?
	fs.exists(file, function (exists) {
	  if(exists) {
			fs.unlink(file, function (err) {
			  if (err){ 
					// console.log(req);
					res.json({
						data:{path:path},
						status:{
							code:1,
							msg : "删除"+ path +"文件失败！"
						}
					})
				};
			  console.log('successfully deleted /tmp/hello');
				// console.log(req);
				res.redirect("/")
			});
	  }else{
			// console.log(req);
			res.json({
				data:{path:path},
				status:{
					code:2,
					msg : "亲，"+ path +"文件不存在呀！"
				}
			})
	  }
	});
	
});

router.post('/post/formdata', function(req, res) {
	res.redirect("/")
});

router.post('/post/formdata.json', function(req, res) {
	var path = config.upload;
	// console.log(req);
	res.json({
		data:{path:path},
		status:{
			code: 0,
			msg : "success."
		}
	})
});


module.exports = router;
