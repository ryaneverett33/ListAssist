var pool = require('./connections.js');


/*
pool.initiate();
createUser(1, "Will", function(success) {
	if (success) {
		console.log("success!");
	} else {
		console.log("failure.");
	}
});

createUser(666, "Phil", function(success) {
	if (success) {
		console.log("success!");
	} else {
		console.log("failure.");
	}
});

createList(1, "Will's list", function(success) {
	if (success) {
		console.log("success!");
	} else {
		console.log("failure.");
	}
});


createItem("item2", "www.picture2.com", "Fantasia", 1, 4, function(success) {
	if (success) {
		console.log("success!");
	} else {
		console.log("failure.");
	}
});
*/

/*
Upon success, this function adds a user row in the database
id: int, this should be the unique id acquired via the google login in the frontend
name: string
callback function returns a boolean value
*/
function createUser(id, name, callback) {
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
callback function returns a boolean value
*/
function createList(id, name, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding list to database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
	    	//query the database to add a new list
	    	var query_string = 'INSERT INTO Lists VALUES (NULL,?,?);';
	    	connection.query(query_string, [name, id], function(error2, results, fields) {
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
  	});
}

/*
Upon success, this function adds an item row in the database
name: string, picture_url: string, buyer: string, purchased: int (0 if false), list_id: int
callback function returns a boolean value
*/
function createItem(name, picture_url, buyer, purchased, list_id, callback) {
	pool.connect(function(error, connection) {
		//check for errors
	    if (error) {
	      console.error("Error adding item to database: %s", error);
	      callback(false);
	      return;
	    }
	    else {
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
	    }
  	});
}