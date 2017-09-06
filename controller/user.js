'use strict';

var db = require('../db/db.js');
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
module.exports = {
	
	
	//user login
	 login : function(req,res,next){
	 	

	},

	//user sigonout
	signout : function(req,res,next){

	},
	//user register
	register : function(req,res,next){
		
	 	var user = {
	 		name : '',
	 		password : '',
	 		email : '',
	 		sex : 0,
	 		heigh : 0,
	 		weight : 0,
	 		age : 0

	 	};
	 	user.name = req.body.name;
	 	console.log("user.name::"+user.name);
	 	if (typeof(user.name) == 'undefined' || user.name == null || user.name.length == 0) {
	 		let result  = {code : 102,message:'invalid username'};
	 		res.status(200).end(JSON.stringify(result));
	 		return;
	 	}
	 	//var sql = 'select * from `user` where `username` = "john"';
	 	var sql = 'select * from user where name = ' + "'"+ user.name + "'";
	 	//console.log("sql::"+sql);
	 	db.query(sql,function(err,resluts){
	 		if(err){
	 			let error = {code : 103,message : err};
	 			res.status(200).end(JSON.stringify(error));
	 			//console.log("error::"+err);
	 			return;
	 		}else{	 			
	 			if (resluts.length == 0) {
	 				user.password = req.body.password;
	 				user.email = req.body.email;
	 				user.sex = req.body.sex;
	 				user.heigh = req.body.heigh;
	 				user.weight = req.body.weight;
	 				user.age = req.body.age;
	 				var insertSql = 'insert into user (name,password,email,sex,heigh,weight,age) values ('+ "'"+user.name + "',"+ 
	 				"'" + user.password +"',"+ "'"+user.email + "',"+ user.sex +','+user.heigh + ',' +user.weight +','+user.age+ ')';
	 				//console.log('insert sql::'+insertSql);
	 				db.query(insertSql,function(err,results){
	 					if(err){
	 						let error = {code : 103,message : err};
	 						res.status(200).end(JSON.stringify(error));
	 						return;
	 					}		 					
	 					//console.log('results.insertId::'+results.insertId );
	 					if(typeof(results.insertId) !== undefined){
		 					let register = {code : 100,message : 'register success',user_id : results.insertId};
		 					res.status(200).end(JSON.stringify(register));
	 					}
	 				});
	 			}else{
	 				let exist = {code : 101,message : 'user name was already exist',user : []};
	 				res.status(200).end(JSON.stringify(exist));
	 			}	 			
	 		}
	 	});

	},
	//get all user
	getAllUser : function(req,res,next){
		let sql = 'select * from user';
		db.query(sql,function(err,results){
			if (err) {
				let error = {code : 103,message : err};
	 			res.status(200),(JSON.stringify(error));
				return;
			}
			let u = {user : results};
			res.status(200).end(JSON.stringify(u));
		})
	},


	//get user
	getUser : function(req,res,next){

		fs.readFile('./public/static/index.html', null, function(err,data){
			if (err) {
				console.log('err:'+err);
				res.writeHead(404,{'Content-Type':'text/plain'});
				res.end('404 not found');
				return;
			}
			var ext = path.extname('./public/static/index.html');
			ext = ext ? ext.slice(1):'unkown';
			console.log('ext::'+ext);
			var content_type = MIME_TYPE[ext] || 'text/plain';
			res.writeHead(200,{'Content-Type':content_type});
			res.end(data.toString());
		});
	},
	//delete user
	deleteUser : function(req,res,next){},
	//update user
	updateUser :function(req,res,next){}

};