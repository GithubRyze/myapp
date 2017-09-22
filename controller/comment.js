
'use strict';
var blood = require('./bloodrecord');
var db = require('../db/db.js');

module.exports = {



	addComment : function(req,res,next){

		var sql = 'insert into comment (commentUserID,toUserID,bloodID,commentText) values ('+ req.body.commentUserID + ',' + req.body.toUserID + ',' + 
		req.body.bloodID + ',' + '\'' + req.body.commentText + '\'' + ')';
		//console.log('addComment Sql::'+JSON.stringify(req.body));
		console.log('sql::'+sql);
		db.query(sql,function(err,results){
			if(err){
				console.log('err::'+err);
				let error = {code : 103,message : err};
				res.status(200).end(JSON.stringify(error));
				return;
			}
			console.log('results.insertId::'+results.insertId);
			if(typeof(results.insertId) !== undefined){
				//blood.updateRecordCommentID(results.insertId,req.body.bloodID);
				var updateSql = 'update bloodpressure set commentID = '+ results.insertId + ' where id = ' + req.body.bloodID;
				db.query(updateSql,function(er,cmmResult){
			 		if (er) {
				 		let error = {code : 103,message : er};
				 		res.status(200).end(JSON.stringify(error));
				 		return ;
			 		}
			 		let result = {code : 100, message : 'add sucess' ,comment_id : results.insertId};
					res.status(200).end(JSON.stringify(result));
		 		});
			}

		});
	},

	deleteComment : function(req,res,next){

		var deleteSql = 'delete from comment where id = ' + req.body.id;
		console.log('deleteComment Sql::'+deleteSql);
		db.query(deleteSql,function(err,results){
		 	if (err) {
		 		let error = {code : 103,message : err};
		 		res.status(200).end(JSON.stringify(error));
		 		return;
		 	}
		 	let result = {code : 100,message : 'delete sucess'};
		 	console.log('results affectedRows:'+results.affectedRows);
		 	res.status(200).end(JSON.stringify(result)); 
		 });

	},

	updateComment : function(req,res,next){

		var updataSql = 'update comment set commentText = ' + '\'' + req.body.commentText + '\'' + 'where id = ' + req.body.id;
		console.log('updateComment Sql::'+JSON.stringify(req.body));
		db.query(updataSql,function(err,results){
		 	if (err) {
		 		let error = {code : 103,message : err};
		 		res.status(200).end(JSON.stringify(error));
		 		return;
		 	}
		 	let result = {code : 100,message : 'update sucess'};
		 	console.log('results affectedRows:'+results.affectedRows);
		 	res.status(200).end(JSON.stringify(result));
		 });

	},

	selectComment : function(req,res,next){


		var selectSql = 'select * from comment where id = ' + req.body.id;
		console.log('selectComment Sql::'+JSON.stringify(req.body));
		db.query(selectSql,function(err,result){
			if(err){
				let error = {code : 103,message : err};
				res.status(200).end(JSON.stringify(error));
				return;
			}
			//results is json array, contain all columu name in table;
			if(result !== undefined)
				res.status(200).end(JSON.stringify(result[0]));
		});

	}





}