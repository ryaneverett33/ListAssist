var mysql = require('mysql');
var pool;  //connection pool for faster querying
var regpool;
var initialized; //boolean

/*exports.stacktrace = function() { 
	function st2(f) {
	  return !f ? [] : 
		  st2(f.caller).concat([f.toString().split('(')[0].substring(9) + '(' + f.arguments.join(',') + ')']);
	}
	return st2(arguments.callee.caller);
}*/

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
	regpool = mysql.createPool({
		connectionLimit : 10,
	    host     		: 'ec2-52-15-82-101.us-east-2.compute.amazonaws.com',
	    user     		: 'list',
	    password 		: 'KrHqBChH',
	    database 		: 'listassist'
	});
	this.useRegular();
	initialized = true;
}

// get connection for the pool
exports.connect = function(callback) {
	//this.initiate();
	pool.getConnection(callback);
} 

// free up connection and put back in the pool
exports.disconnect = function(connection) {
	//this.initiate();
	connection.release();
}
exports.useRegular = function() {
	pool = regpool;
}
/*
exports.query = function(sqlString, callback){
	pool.query(sqlString, callback);
}

exports.query = function(sqlString, values, callback){
	pool.query(sqlString, values, callback);
}
*/



