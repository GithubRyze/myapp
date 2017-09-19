'use strict';

var db = require('../db/db.js');
function checkValue(value){

	if (value === "" || value === 0 || value === "0" || value === null || value === false || typeof value === 'undefined') {  
        return true;  
    }
    return false;  

}
module.exports = {

	addRecord : function(req,res,next){		
		var blood = {
			userId : req.body.userId,
			dbp : req.body.dbp,
			sbp : req.body.sbp,
			hb : req.body.hb,
			health : req.body.health,
			commentID : req.body.commentID
		};
		if(checkValue(blood.userId) || checkValue(blood.dbp) || checkValue(blood.sbp) || checkValue(blood.hb) || checkValue(blood.health)){
		
			let result = {code : 103,message : 'Invalid json'};
			console.log('Invalid json:'+JSON.stringify(result));
			res.status(200).end(JSON.stringify(result));
			return;

		}
		var sql = 'insert into bloodpressure (userId,dbp,sbp,hb,health,commentID) values ('+ blood.userId + ',' + blood.dbp + ',' + 
		blood.sbp + ',' + blood.hb + ',' + blood.health + ',' + blood.commentID + ')';
		console.log('add Record Sql::'+sql);
		db.query(sql,function(err,results){
			if(err){
				console.log('err::'+err);
				let error = {code : 103,message : err};
				res.status(200).end(JSON.stringify(error));
				return;
			}
			//insertId is the row number,
			console.log('results.insertId::'+results.insertId);

			if(typeof(results.insertId) !== undefined){
				let result = {code : 100, message : 'add sucess' ,blood_id : results.insertId};
				res.status(200).end(JSON.stringify(result));
			}

		});
			
	},
	deleteRecord : function(req,res,next){
		var blood_id = req.body.blood_id;
		var sql = 'delete from bloodpressure where id = ' + blood_id;
		db.query(sql,function(err,results){
			if (err) {
		 		let error = {code : 103,message : err};
		 		res.status(200).end(JSON.stringify(error));
		 		return;
		 	}
		 	console.log('results::'+JSON.stringify(results));
		 	res.status(200).end('delete success');	
		});

	},
	getRecord : function(req,res,next){

		var blood_id = req.query.boold_id;
		console.log('blood_id:'+blood_id);
		var sql = 'select * from bloodpressure where id = '+blood_id;
		console.log('getRecord sql:'+sql);
		db.query(sql,function(err,results){
			if (err) {
		 		let error = {code : 103,message : err};
		 		res.status(200).end(JSON.stringify(error));
		 		return;
		 	}
		 	let result = {code : 100,message :'success',bloodpressure : results};
		 	res.status(200).end(JSON.stringify(result));

		});
	},
	updateRecord : function(req,res,next){
		var blood = {
			id : req.body.id,
			userId : req.body.userId,
			dbp : req.body.dbp,
			sbp : req.body.sbp,
			hb : req.body.hb,
			health : req.body.health
		};
		var updateSql = 'update bloodpressure set dbp = '+ blood.dbp + ',sbp = '+ blood.sbp + ',hb = ' + blood.hb +
		 ',health = ' + blood.health  + ',commentID = '+ blood.commentID + ' where id = ' +blood.id;
		 console.log("update sql:"+updateSql);
		 db.query(updateSql,function(err,results){
		 	if (err) {
		 		let error = {code : 103,message : err};
		 		res.status(200).end(JSON.stringify(error));
		 		return;
		 	}
		 	let result = {code : 100,message : 'update sucess'};
		 	console.log('results affectedRows:'+results.affectedRows);
		 	res.status(200).end(JSON.stringify(result));
		 	return 
		 });
	},

	getAllRecord : function(req,res,next){
		
		/*var	page = req.query.page;
		if (page === undefined) {
			let error = {code : 103,message : 'Invalid request'};
			res.status(200).end(JSON.stringify(error));
			return;
		}*/
		//var sql = 'select * from bloodpressure limit ' + (page - 1)*10 + ',' + 10;
		//var admin = req.headers.token.admin;
		//console.log('\n req.headers.token:'+req.headers.token);
		//console.log('\n req.headers.token.id:'+req.headers.token.id);
		//var sql = sql = 'select * from bp_record where userId = ' + req.headers.token.id;		
		//if(admin)
		var limit = req.query.limit || 10;
		var offset = req.query.offset ||  10;
		var admin = req.headers.token.admin;
		//console.log('\n request'+req.headers['x-request-with']);
		//if(req.headers.client === 'web'){
			console.log('\n limit::'+limit);
			console.log('\n offset::'+offset);
			console.log('\n web XMLHttpRequest request');
			let selectSql,totalSql;
			if(admin){
				 selectSql = 'select * from bloodpressure limit ' + (offset - 1)*limit + ',' + limit;
				 totalSql = 'select count(id) from bloodpressure';
			}else{
				 selectSql = 'select * from bloodpressure limit ' + (offset - 1)*limit + ',' + limit + 'where userId = ' + req.headers.token.id;
				 totalSql = 'select count(id) from bloodpressure where userId = ' + req.headers.token.id;
			}
			db.query(totalSql,function(err,results){
				if(err){
					let error = {code : 103,message : err};
					res.status(200).end(JSON.stringify(error));
					return;
				}
				//results is json array, contain all columu name in table;
				if(results !== 'undefined'){
					
					var count = results[0]['count(id)'];
					console.log('\n count:'+ count);
					db.query(selectSql,function(error,rts){
						if(error){
							let er = {code : 103,message : error};
							res.status(200).end(JSON.stringify(er));
							return;
						}
						if(rts !== 'undefined'){
							let r = {"total" : count,"rows" : rts};
							if(req.headers.client === 'web'){
								res.status(200).end(JSON.stringify(r));
							}else{
								ress.status(200).end(JSON.stringify(rts));
							}
						}
					});
				}
			});

		//}//else{
			//console.log('\n app android iphone device request');

		//}
	

	}

};