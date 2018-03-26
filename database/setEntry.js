var pool = require('./connections.js');


//pool.initiate();
/*setUser(3, "Jill", function(success) {
	if (success) {
		console.log("Huzzah and stuff");
	} else {
		console.log("Well sugar");
	}
});

setList(6, "user_id", 666, function(success) {
	if (success) {
		console.log("Huzzah and stuff");
	} else {
		console.log("Well sugar");
	}
});

setItem(8, "name", "Gift2", function(success){
	if (success) {
		console.log("Huzzah and stuff");
	} else {
		console.log("Well sugar");
	
	}
});
*/

/*
changes a username value for a particular user
id: int, primary key for database (unique identifier), so unchangable
new_username: string, the column that we are changing
*/
exports.setUser = function setUser(id, new_username, callback) {
	var len = new_username.length
	if (len > 64 || len < 1) {
		console.error("Username size must be between 1 and 64 characters");
		callback(false);
		return;
	}

	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error setting user in database: %s", error);
		  callback(false);
		  connection.release();
	      return;
	    }
	    else {
	    	//query the database to set user
	    	connection.query('UPDATE Users SET username=? WHERE id=?;', [new_username, id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured setting user in database: %s", error2);
					callback(false);
					connection.release();
					//pool.disconnect(connection);
					return;
		        } else {
		        	//no problems setting user, so callback true
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
changes a column value for a particular list
changable columns: name (string entries), user_id (int entries)
	->user_id is the id for the user who possesses the list
id: the list's id, unchangeable
new_value: must be the same type as the column type
Example: setList(21, name, "xmas items other than coal", function(success) {})
*/
exports.setList = function setList(id, column, new_value, callback) {
	//check for bad column inputs and new_value type (rest will be handled by sql error handlers)
	if (column === "name") {
		var len = new_value.length
		if (len > 64 || len < 1) {
			console.error("Username size must be between 1 and 64 characters");
			callback(false);
			return;
		}
	    query_string = 'UPDATE Lists SET name=? WHERE id=?;';
	    //type check
	    if (!(typeof new_value === 'string') && !(new_value instanceof String)) {
	    	console.log("name must be a string.");
	    	callback(false);

	    	return;
	    }
	}
	else if (column === "user_id") {
		query_string = 'UPDATE Lists SET user_id=? WHERE id=?;';
		//type check
		if (!(typeof new_value === 'number')) {
			console.log(typeof new_value)
			console.log("user_id must be a number");
			callback(false);
			return;
		}
	} else {
		console.log("You must put either 'name' or 'user_id' for column value.");
		callback(false);
		return;
	}

	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error setting list in database: %s", error);
		  callback(false);
		  connection.release();
	      return;
	    }
	    else {
	    	//query the database to set list
	    	connection.query(query_string, [new_value, id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured setting list in database: %s", error2);
					callback(false);
					connection.release();
					//pool.disconnect(connection);
					return;
		        } else {
		        	//no problems setting user, so set callback to true
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
changes a column value for a particular item
changable columns: name (string entries), picture_url (string entries),
	buyer (string), purchased (int, 0 if false), list_id (int)
id: the items's id, unchangeable
new_value: must be the same type as the column type
Example: setItem(21, purchased, 1, function(success) {})
*/
exports.setItem = function setItem(id, column, new_value, callback) {
	//check for bad column inputs and new_value type (rest will be handled by sql error handlers)
	//must be done this way because sql doesn't like quotes around the column values
	var query_string;
	if (column === "name") {
		/*bug for editing name*/
	    query_string = 'UPDATE Items SET mame=? WHERE id=?;';
	}
	else if (column === "picture_url") {
		query_string = 'UPDATE Items SET picture_url=? WHERE id=?;';
	
	}
	else if (column === "buyer") {
		query_string = 'UPDATE Items SET buyer=? WHERE id=?;';

	}
	else if (column === "purchased") {
		query_string = 'UPDATE Items SET purchased=? WHERE id=?;';

	}
	else if (column === "list_id") {
		query_string = 'UPDATE Items SET list_id=? WHERE id=?;';

	} else {
		console.log("You must enter in a valid column.");
		callback(false);
		return;
	}

	//type check
	if (column === "name" || column === "picture_url" || column === "buyer") {
	    if (!(typeof new_value === 'string') && !(new_value instanceof String)) {
	    	console.log("picture_url must be a string.");
	    	callback(false);
	    	return;
	    }
	    var len = new_value.length
		if ((column == "name" || column == "buyer") && (len > 64 || len < 1)) {
			console.error("Username/buyer size must be between 1 and 64 characters");
			callback(false);
			return;
		}
		else if (column == "picture_url" && (len > 255 || len < 1)) {
			console.error("picture_url size must be between 1 and 64 characters");
			callback(false);
			return;
		}
	} else {
	    if (!(typeof new_value === 'number')) {
			console.log("user_id must be a number");
			callback(false);
			return;
		}
	}
	//now connect to database and query
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error setting item in database: %s", error);
		  callback(false);
		  connection.release();
	      return;
	    }
	    else {
	    	//query the database to set item
	    	connection.query(query_string, [new_value, id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured setting list in database: %s", error2);
					callback(false);
					connection.release();
					//pool.disconnect(connection);
					return;
		        } else {
		        	//no problems setting user, so set callback to true
					callback(true);
					connection.release();
					//pool.disconnect(connection);
					return;
		        }
	      });
	    }
  	});
}