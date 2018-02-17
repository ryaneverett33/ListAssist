var pool = require('./connections.js');


/*
Upon success, this function adds a user row in the database
id: int, this should be the unique id acquired via the google login in the frontend
name: string
callback function returns a boolean value
*/
exports.createUser = function createUser(id, name, callback) {
	var len = name.length
	if (len > 64 || len < 1) {
		console.error("Username size must be between 1 and 64 characters");
		callback(false);
		return;
	}
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding user to database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to add a new user
	    	var query_string = 'INSERT INTO Users VALUES (?,?);';
	    	connection.query(query_string, [id, name], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured adding user to database: %s", error2);
					callback(false);
					pool.disconnect(connection);
					return;
		        } else {
					callback(true);
					pool.disconnect(connection);
					return;
		        }
	      });
	    }
  	});
}

/*
Upon success, this function adds a list row in the database
id: int, name: string
list_id: option to create list with custom id (used for testing purposes)
		 set to null to ignore this option
name: name of list
description: can be null, descpition of list
callback function returns a boolean value
*/
exports.createList = function createList(id, name, description, list_id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
		if (!(typeof name === 'string') && !(name instanceof String)) {
			console.error("name must be a string");
			callback(false);
			return;
		}
		if (!(typeof description === 'string') && !(description instanceof String)) {
			console.error("description must be a string");
			callback(false);
			return;
		}
		if (name.length < 1 || description.length < 1) {
			console.error("string lengths must be > 0");
			callback(false);
			return;
		}


	    if (error) {
	      console.error("Error adding list to database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	if (list_id == null) {
		    	//query the database to add a new list with an auto_incremented id
		    	var query_string = 'INSERT INTO Lists VALUES (NULL,?,?,?);';
		    	connection.query(query_string, [name, id, description], function(error2, results, fields) {
			        if (error2) {
						console.error("An error occured adding list to database: %s", error2);
						callback(false);
						pool.disconnect(connection);
						return;
			        } else {
						callback(true);
						pool.disconnect(connection);
						return;
			        }
		    	});
	    	} else {
	    		//query the database to add a new list with a specific id
		    	var query_string = 'INSERT INTO Lists VALUES (?,?,?,?);';
		    	connection.query(query_string, [list_id, name, id, description], function(error2, results, fields) {
			        if (error2) {
						console.error("An error occured adding list to database: %s", error2);
						callback(false);
						pool.disconnect(connection);
						return;
			        } else {
						callback(true);
						pool.disconnect(connection);
						return;
			        }
		    	});
	    	}
	    }
  	});
}

/*
Upon success, this function adds an item row in the database
name: string, picture_url: string, buyer: string, purchased: int (0 if false), list_id: int
//NOTE: picture_url, buyer, item_id and purchased can be null
item_id: option to create id with custom id (used for testing purposes)
		 set to null to ignore this option
callback function returns a boolean value
*/
exports.createItem = function createItem(name, picture_url, buyer, purchased, list_id, item_id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding item to database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	if (item_id == null) {

	    		//query the database to add a new item
		    	var query_string = 'INSERT INTO Items VALUES (NULL,?,?,?,?,?);';
		    	connection.query(query_string, [name, picture_url, buyer, purchased, list_id], function(error2, results, fields) {
			        if (error2) {
						console.error("An error occured adding item to database: %s", error2);
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
	    	} else {
	    			    		//query the database to add a new item
		    	var query_string = 'INSERT INTO Items VALUES (?,?,?,?,?,?);';
		    	connection.query(query_string, [item_id, name, picture_url, buyer, purchased, list_id], function(error2, results, fields) {
			        if (error2) {
						console.error("An error occured adding item to database: %s", error2);
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
	    }
  	});
}