var pool = require('./connections.js');

//pool.initiate();


deleteUser(1, function(success) {
	if (success) {
		console.log("success.");
	} else {
		console.log("ooooh");
	}
})
deleteUser(2, function(success) {
	if (success) {
		console.log("success.");
	} else {
		console.log("ooooh");
	}
})
deleteUser(3, function(success) {
	if (success) {
		console.log("success.");
	} else {
		console.log("ooooh");
	}
})
/*
Deletes a user, given a user id.
All lists and items user has will also be deleted
callback(boolean)
*/
function deleteUser(id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding item to database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to delete a user
			var query_string = 'DELETE FROM Users WHERE id=?';
	    	connection.query(query_string, [id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured adding item to database: %s", error2);
					callback(false);
					pool.disconnect(connection);
					return;
		        } else {
		        	//the user has been deleted
					callback(true);
					pool.disconnect(connection);
					return;
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
function deleteList(id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding item to database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to delete a list
			var query_string = 'DELETE FROM Lists WHERE id=?';
	    	connection.query(query_string, [id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured adding item to database: %s", error2);
					callback(false);
					pool.disconnect(connection);
					return;
		        } else {
		        	//the list has been deleted
					callback(true);
					pool.disconnect(connection);
					return;
		        }
	      });
	    }
  	});
}
/*
Deletes an item, given an item id.
callback(boolean)
*/
function deleteItem(id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding item to database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to delete a item
			var query_string = 'DELETE FROM Items WHERE id=?';
	    	connection.query(query_string, [id], function(error2, results, fields) {
		        if (error2) {
					console.error("An error occured adding item to database: %s", error2);
					callback(false);
					pool.disconnect(connection);
					return;
		        } else {
		        	//the item has been deleted
					callback(true);
					pool.disconnect(connection);
					return;
		        }
	      });
	    }
  	});
}
module.exports.deleteUser = deleteUser;
module.exports.deleteItem = deleteItem;
module.exports.deleteList = deleteList;