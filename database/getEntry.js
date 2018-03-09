var pool = require('./connections.js');

/*
This function will return a RowDataPacket, which can be parsed in the following manner: results[<index>].column
Users table columns: id, username
user_id: unique id of user stored in database, accessible from google login
callback: function that will be used to return the results of the query
*/
exports.getUser = function getUser(user_id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error getting user from database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to add a new user
	    	connection.query('SELECT * FROM Users WHERE id=?;', [user_id], function(error2, results, fields) {
		        if (error2) {
							console.error("An error occured getting user from database: %s", error2);
							callback(false);
							pool.disconnect(connection);
							return;
		        } else {
							callback(results);
							pool.disconnect(connection);
							return;
		        }
	      });
	    }
  	});
}

/*
This function will return a RowDataPacket, which can be parsed in the following manner: results[<index>].column
Items table columns: id, name, picture_url, buyer, purchased, list_id
list_id: unique id of list stored in database, accessible from getting a users list (function below)
callback: function that will be used to return the results of the query
*/
exports.getItems = function getItems(list_id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error getting user from database: %s", error);
	      callback(null);
	      pool.disconnect(connection);
	      return;
	    }
	    else {
			connection.query('SELECT * FROM Items where list_id=?', [list_id], function(error2, results, fields) {
		        if (error2) {
		        	console.log("An error occured getting items for list: %s", error2)
		        	callback(null);
		        } else {
		        	callback(results);
		        }
	        	pool.disconnect(connection);
	        	return;
		    });
		}
	});
}

//an internal function used for get lists
function getItems(list_id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error getting user from database: %s", error);
	      callback(null);
	      pool.disconnect(connection);
	      return;
	    }
	    else {
			connection.query('SELECT * FROM Items where list_id=?', [list_id], function(error2, results, fields) {
		        if (error2) {
		        	console.log("An error occured getting items for list: %s", error2)
		        	callback(null);
		        } else {
		        	callback(results);
		        }
	        	pool.disconnect(connection);
	        	return;
		    });
		}
	});
}



/*
This function will return a RowDataPacket, which can be parsed in the following manner: results[<index>].column
Lists table columns: id, name, user_id
user_id: unique id of user stored in database, accessible on frontend via google login
callback: function that will be used to return the results of the query
*/
exports.getLists = function getLists(user_id, callback) {
	//for each list, get its items and add them to an array
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error getting list from database: %s", error);
	      callback(null);
	      return;
	    }
	    else {
	    	var lists = [];  //lists that user has, and it's items within
	    	var items = [];
	    	var query = connection.query('SELECT * FROM Lists where user_id=?', [user_id]);

	    	query
			  .on('error', function(err) {
			  	console.error("An error occured getting list(s) from database: %s", err);
			  	callback(null);
			  	return;
			    // Handle error, an 'end' event will be emitted after this as well
			  })
			  .on('result', function(row) {
			    // Pausing the connnection to wait for items query (so that lists does not fill in empty arrays always)
			    connection.pause();
			    getItems(row.id, function(item_arr) {
			    	var items;
			    	if (item_arr) {
						items = item_arr;
			    	} else {
			    		items = [];
			    	}
					list = {row, items}
					list.row.count = item_arr.length;
			    	lists.push(list);  //add items to list, if any
			    	connection.resume();  //resume the connection now that the item query is complete
			    });

			  })
			  .on('end', function() {
			    // all rows have been received
			    callback(lists);
			    return;
			  });
		}
	});
	      
}

/*
item: {
	id : int, 
	name : var(255),
	picture_url : var(255),
	buyer : var(64),
	purchased : bool,
	list_id : int
} OR NULL
*/
exports.getItem = function(itemid, callback) {
	if (callback == null) {
		console.error("getEntry::getItem() callback is null");
		return;
	}
	pool.connect(function(err, conn) {
		if (err) {
			console.error("Error getting connection : %s", err);
			callback(null);
			pool.disconnect(conn);
			return;
		}
		else {
			conn.query('SELECT * FROM Items WHERE id=?;', [itemid], function(err2, results) {
				if (err2) {
					console.error("Couldn't get item : %s", err2);
					callback(null);
					return;
				}
				else {
					if (results == null || results == undefined) {
						callback(null);
						return;
					}
					else {
						results.purchased = Boolean(results.purchased);
						callback(results);
						return;
					}
				}
			});
		}
	})
}