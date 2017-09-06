var mysql = require('mysql');
var pool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	//password : 'ryze',
	database : 'bpDB'
});

function query(sql,callback){

	pool.getConnection(function (error,connection){
		if (error) {
			console.log("db error:"+error);
			return;
			}		
		console.log("connected");
		connection.query(sql,function(error,resluts){
			connection.release();
			callback(error,resluts);
			
		});

	});
}

exports.query = query;