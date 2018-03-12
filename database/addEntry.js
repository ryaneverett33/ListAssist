var pool = require('./connections.js');


/*
Upon success, this function adds a user row in the database
id: int, this should be the unique id acquired via the google login in the frontend
name: string
username and image can be null
callback function returns a boolean value
*/
exports.createUser = function createUser(id, name, username, email, image, callback) {
	var len_id = id.length
	var len_name = name.length
	var len_e = email.length
	
	if (username != null) {
		var len_uname = username.length
		if (len_uname > 64 || len_uname < 1) {
			console.error("username size must be between 1 and 250 characters");
			callback(false);
			return;
		}
	}
	if (image != null) {
		var len_i = image.length
		if (len_i > 250 || len_i < 1) {
			console.error("image url size must be between 1 and 250 characters");
			callback(false);
			return;
		}
	}

	if (len_id > 30 || len_id < 1) {
		console.error("id size must be between 1 and 30 characters");
		callback(false);
		return;
	}
	if (len_name > 50 || len_name < 1 || len_e > 50 || len_e < 1) {
		console.error("Name and email size must be between 1 and 50 characters");
		callback(false);
		return;
	}
	
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
		  console.error("Error adding user to database: %s", error);
		  connection.release();
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to add a new user
	    	var query_string = 'INSERT INTO Users (id, username, name, email, image) VALUES (?,?,?,?,?);';
	    	connection.query(query_string, [id, username, name, email, image], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured adding user to database: %s", error2);
					callback(false);
					connection.release();
					//pool.disconnect(connection);
					return;
		        } else {
					callback(true);
					connection.release();
					//pool.disconnect(connection);
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
callback function returns a boolean value
*/
exports.createList = function createList(id, name, list_id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
		if (!(typeof name === 'string') && !(name instanceof String)) {
			console.error("name must be a string");
			callback(false);
			return;
		}
		if (name.length < 1) {
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
		    	var query_string = 'INSERT INTO Lists (id, name, user_id) VALUES (NULL,?,?);';
		    	connection.query(query_string, [name, id], function(error2, results, fields) {
			        if (error2) {
						console.error("An error occured adding list to database: %s", error2);
						callback(false);
						connection.release();
						//pool.disconnect(connection);
						return;
			        } else {
						callback(true);
						connection.release();
						//pool.disconnect(connection);
						return;
			        }
		    	});
	    	} else {
	    		//query the database to add a new list with a specific id
		    	var query_string = 'INSERT INTO Lists (id, name, user_id) VALUES (?,?,?);';
		    	connection.query(query_string, [list_id, name, id], function(error2, results, fields) {
			        if (error2) {
						console.error("An error occured adding list to database: %s", error2);
						callback(false);
						connection.release();
						//pool.disconnect(connection);
						return;
			        } else {
						callback(true);
						connection.release();
						//pool.disconnect(connection);
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
		    	var query_string = 'INSERT INTO Items (id, name, picture_url, buyer, purchased, list_id) VALUES (NULL,?,?,?,?,?);';
		    	connection.query(query_string, [name, picture_url, buyer, purchased, list_id], function(error2, results, fields) {
			        if (error2) {
						console.error("An error occured adding item to database 1: %s", error2);
						callback(false);
						connection.release();
						//pool.disconnect(connection);
						return;
			        } else {
			        	//the query went through with no problems
						callback(true);
						connection.release();
						//pool.disconnect(connection);
						return;
			        }
		      	});
	    	} else {
	    			    		//query the database to add a new item
		    	var query_string = 'INSERT INTO Items (id, name, picture_url, buyer, purchased, list_id) VALUES (?,?,?,?,?,?);';
		    	connection.query(query_string, [item_id, name, picture_url, buyer, purchased, list_id], function(error2, results, fields) {
			        if (error2) {
						console.error("An error occured adding item to database 2: %s", error2);
						callback(false);
						connection.release();
						//pool.disconnect(connection);
						return;
			        } else {
			        	//the query went through with no problems
						callback(true);
						connection.release();
						//pool.disconnect(connection);
						return;
			        }
		      	});
	    	}
	    }
  	});
}