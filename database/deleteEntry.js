var pool = require('./connections.js');

//pool.initiate();

/*
Deletes a user, given a user id.
All lists and items user has will also be deleted
callback(boolean)
*/
exports.deleteUser = function deleteUser(id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding item to database: %s", error);
		  callback(false);
		  connection.release();
	      return;
	    }
	    else {
	    	//query the database to delete a user
			var query_string = 'DELETE FROM Users WHERE id=?';
	    	connection.query(query_string, [id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured adding item to database: %s", error2);
					callback(false);
					//pool.disconnect(connection);
					connection.release();
					return;
		        } else {
		        	//the user has been deleted
		        	//now get list id's to delete lists and items
		        	//results[0].row
		        	var query_string = 'SELECT id FROM Lists WHERE user_id=?'
		        	connection.query(query_string, [id], function(error2, results, fields) {
				        if (error2) {
							console.error("An error occured adding item to database: %s", error2);
							callback(false);
							//pool.disconnect(connection);
							connection.release();
							return;
				        } else {
				        	//the user has been deleted
				        	//now delete the users lists
				        	for (i = 0; i < results.length; i++) {

				        		exports.deleteList(results[i].id, function(r) {
				        			if (!r) {
				        				console.log("FALSE")
				        				callback(false)
										//pool.disconnect(connection)
										connection.release();
					        			return
				        			}
				        		})
				        	}
							callback(true);
							//pool.disconnect(connection);
							connection.release();
							return;
				        }
			      	});	
		        }
	      	});
	    }
  	});
}

/*
Deletes a list, given a list id.
All items in the list will also be deleted
callback(boolean)
*/
exports.deleteList = function deleteList(id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding item to database: %s", error);
		  callback(false);
		  connection.release();
	      return;
	    }
	    else {
	    	//query the database to delete a list
			var query_string = 'DELETE FROM Lists WHERE id=?';
	    	connection.query(query_string, [id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured adding item to database: %s", error2);
					callback(false);
					//pool.disconnect(connection);
					return;
		        } else {
		        	//the list has been deleted
		        	//now delete items with that list_id
		        	var query_string = 'DELETE FROM Items WHERE list_id=?';
		        	connection.query(query_string, [id], function(error3, results, fields) {
				        if (error3) {
							console.error("An error occured adding item to database: %s", error2);
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
  	});
}
/*
Deletes an item, given an item id.
callback(boolean)
*/
exports.deleteItem = function deleteItem(id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
		  console.error("Error adding item to database: %s", error);
		  connection.release();
	      //callback(false);
	      return;
	    }
	    else {
	    	//query the database to delete a item
			var query_string = 'DELETE FROM Items WHERE id=?';
	    	connection.query(query_string, [id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured adding item to database: %s", error2);
					callback(false);
					connection.release();
					//pool.disconnect(connection);
					return;
		        } else {
		        	//the item has been deleted
					callback(true);
					connection.release();
					//pool.disconnect(connection);
					return;
		        }
	      });
	    }
  	});
}