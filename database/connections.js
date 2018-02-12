var mysql = require('mysql');
var pool;  //connection pool for faster querying

//creates pool, must be called before any other database related function 
exports.initiate_test = function() {
	pool = mysql.createPool({
		connectionLimit : 10,
	    host     		: 'ec2-52-15-82-101.us-east-2.compute.amazonaws.com',
	    user     		: 'list',
	    password 		: 'KrHqBChH',
	    database 		: 'listassist_test'
	});
}

exports.initiate = function() {
	pool = mysql.createPool({
		connectionLimit : 10,
	    host     		: 'ec2-52-15-82-101.us-east-2.compute.amazonaws.com',
	    user     		: 'list',
	    password 		: 'KrHqBChH',
	    database 		: 'listassist'
	});
}

// get connection for the pool
exports.connect = function(callback) {
	pool.getConnection(callback);
} 

// free up connection and put back in the pool
exports.disconnect = function(connection) {
	connection.release();
}
/*
exports.query = function(sqlString, callback){
	pool.query(sqlString, callback);
}

exports.query = function(sqlString, values, callback){
	pool.query(sqlString, values, callback);
}
*/



