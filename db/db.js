// var mysql = require('mysql');
// var pool = mysql.createPool({
// 	host: 'localhost',
// 	user: 'root',
// 	//password : 'ryze',
// 	database: 'bpDB'
// });

// function query(sql, callback) {

// 	pool.getConnection(function(error, connection) {
// 		if (error) {
// 			console.log("db error:" + error);
// 			return;
// 		}
// 		console.log("connected");
// 		connection.query(sql, function(error, resluts, fields) {
// 			connection.release();

// 			callback(error, resluts);

// 		});

// 	});
// }

// function bulkInsert(sql, [values], callback) {

// 	pool.getConnection(function(error, connection) {
// 		if (error) {
// 			console.log("db error:" + error);
// 			return;
// 		}
// 		connection.query(sql, [values], function(error, resluts, fields) {
// 			connection.release();
// 			callback(error, resluts, fields);
// 		});

// 	});

// }

// function batchInsert(sql, callback) {
// 	return new Promise((resolve, reject) => {
// 		pool.getConnection(function(error, connection) {
// 			if (error) {
// 				console.log("db error:" + error);
// 				return;
// 			}
// 			console.log("connected");
// 			connection.query(sql, function(error, resluts) {
// 				connection.release();
// 				if (error) {
// 					return;
// 				}
// 				//callback(error,resluts);
// 				resolve(resluts);
// 			});

// 		});
// 	});
// }
// exports.query = query;
// exports.batchInsert = batchInsert;
// exports.bulkInsert = bulkInsert;