var express = require('express');
var http = require('http');
var favicon = require('serve-favicon');
var url = require('url');
var app = express();
var fs = require('fs');
var path = require('path');
//添加MIME类型
var MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var server = http.createServer((req,res) =>{

	console.log('url::'+req.url);
	var filePath;
	if (req.url == '/') {
		filePath = 'public/static/index.html';
	}else{
		filePath = 'public/static/'+url.parse(req.url).pathname;
		//filePath = filePath.slice(1, filePath.lenght);
	}
	console.log('filePath::'+filePath);
	fs.exists(filePath, function(err){
		if (!err) {
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.end(filePath + ' not found');
			return;
		}
		
		fs.readFile(filePath, null, function(err,data){
			if (err) {
				res.writeHead(404,{'Content-Type':'text/plain'});
				res.end('404 not found');
				return;
			}
			var ext = path.extname(filePath);
			ext = ext ? ext.slice(1):'unkown';
			console.log('ext::'+ext);
			var content_type = MIME_TYPE[ext] || 'text/plain';
			res.writeHead(200,{'Content-Type':content_type});
			res.end(data.toString());
		});
	});
	
}).listen(3000);
console.log("server is staring in port:%d",3000);
