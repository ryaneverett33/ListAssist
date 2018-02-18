var mysql = require('mysql');
var pool;  //connection pool for faster querying
var initialized; //boolean

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
	if (initialized) return;
	pool = mysql.createPool({
		connectionLimit : 10,
	    host     		: 'ec2-52-15-82-101.us-east-2.compute.amazonaws.com',
	    user     		: 'list',
	    password 		: 'KrHqBChH',
	    database 		: 'listassist'
	});
	initialized = true;
}

// get connection for the pool
exports.connect = function(callback) {
	this.initiate();
	pool.getConnection(callback);
} 

// free up connection and put back in the pool
exports.disconnect = function(connection) {
	this.initiate();
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



