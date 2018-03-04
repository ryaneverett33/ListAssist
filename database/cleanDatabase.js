var pool = require('../database/./connections.js');

//pool.initiate();

var clearUsersQuery = "DELETE FROM Users;";
var clearListsQuery = "DELETE FROM Lists;";
var clearItemsQuery = "DELETE FROM Items;";

exports.cleanUsers = function cleanUsers(callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error cleaning users: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to add a new item
	    	connection.query(clearUsersQuery, function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured cleaning users: %s", error2);
					callback(false);
					pool.disconnect(connection);
					return;
		        } else {
		        	//the query went through with no problems
					callback(true);
					pool.disconnect(connection);
					return;
		        }
	      });
	    }
  	});
}

exports.cleanLists = function cleanLists(callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error cleaning lists: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to add a new item
	    	connection.query(clearListsQuery, function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured cleaning lists: %s", error2);
					callback(false);
					pool.disconnect(connection);
					return;
		        } else {
		        	//the query went through with no problems
					callback(true);
					pool.disconnect(connection);
					return;
		        }
	      });
	    }
  	});
}

exports.cleanItems = function cleanItems(callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error cleaning lists: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to add a new item
	    	connection.query(clearItemsQuery, function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured cleaning items: %s", error2);
					callback(false);
					pool.disconnect(connection);
					return;
		        } else {
		        	//the query went through with no problems
					callback(true);
					pool.disconnect(connection);
					return;
		        }
	      });
	    }
  	});
}