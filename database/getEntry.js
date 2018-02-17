var pool = require('./connections.js');

/*
pool.initiate();

getUser(1, function(results) {
	if (!results) {
		console.log("unable to query database");
	} else {
		console.log(results);
		//console.log(results['id']);
		console.log(results[0].id);

	}
});

getLists(1, function(results) {
	if (!results) {
		console.log("failure.");
	} else {
		console.log("ok!");
		//console.log(results);
	}
});


getItems(4, function(results) {
	if (!results) {
		console.log("failure.");
	} else {
		console.log("ok!");
		console.log(results);
	}
});
*/


/*
This function will return a RowDataPacket, which can be parsed in the following manner: results[<index>].column
Users table columns: id, username
user_id: unique id of user stored in database, accessible from google login
callback: function that will be used to return the results of the query
*/
function getUser(user_id, callback) {
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
function getLists(user_id, callback) {
	//for each list, get its items and add them to an array
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error getting user from database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	var lists = {};  //lists that user has, and it's items within
	    	var items = [];
	    	var query = connection.query('SELECT * FROM Lists where user_id=?', [user_id]);

	    	query
			  .on('error', function(err) {
			  	console.error("An error occured getting list(s) from database: %s", err);
			    // Handle error, an 'end' event will be emitted after this as well
			  })
			  .on('fields', function(fields) {
			  	console.log("FIELDS: %s", fields)
			    // the field packets for the rows to follow
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
			    	lists[row.name] = items;  //add items to list, if any
			    	connection.resume();  //resume the connection now that the item query is complete
			    });

			  })
			  .on('end', function() {
			    // all rows have been received
			    for (var key in lists) {
			    	console.log(key, lists[key]);
			    }
			    console.log("LISTS: %s", lists);
			  });
		}
	});
	      
}

module.exports.getUser = getUser;
module.exports.getItems = getItems;
module.exports.getLists = getLists;