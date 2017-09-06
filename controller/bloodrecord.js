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
			health : req.body.health
		};
		if(checkValue(blood.userId) || checkValue(blood.dbp) || checkValue(blood.sbp) || checkValue(blood.hb) || checkValue(blood.health)){
		
			let result = {code : 103,message : 'Invalid json'};
			console.log('Invalid json:'+JSON.stringify(result));
			res.status(200).end(JSON.stringify(result));
			return;

		}
		var sql = 'insert into bloodpressure (userId,dbp,sbp,hb,health) values ('+ blood.userId + ',' + blood.dbp + ',' + 
		blood.sbp + ',' + blood.hb + ',' + blood.health +')';
		console.log('add Record Sql::'+sql);
		db.query(sql,function(err,results){
			if(err){
				console.log('err::'+err);
				let error = {code : 103,message : err};
				res.status(200).end(JSON.stringify(error));
				return;
			}
			console.log('results.insertId::'+results.insertId);
			if(typeof(results.insertId) !== undefined){
				let result = {code : 100, message : 'add sucess' ,blood_id : results.insertId};
				res.status(200).end(JSON.stringify(result));
			}

		});
			
	},
	deleteRecord : function(req,res,next){


	},
	getRecord : function(req,res,next){



	},
	updateRecord : function(req,res,next){},

	getAllRecord : function(req,res,next){
		
		/*var	page = req.query.page;
		if (page === undefined) {
			let error = {code : 103,message : 'Invalid request'};
			res.status(200).end(JSON.stringify(error));
			return;
		}*/
		//var sql = 'select * from bloodpressure limit ' + (page - 1)*10 + ',' + 10;
		var sql = 'select * from bloodpressure';
		db.query(sql,function(err,results){
			if(err){
				let error = {code : 103,message : err};
				res.status(200).end(JSON.stringify(error));
				return;
			}
			let blood = {data : results};
			res.status(200).end(JSON.stringify(blood));
		});

	}

};