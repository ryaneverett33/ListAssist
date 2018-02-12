var add = require('./addEntry.js');
var pool = require('./connections.js');

pool.initiate_test();
 
var cleaner = require('../database/./cleanDatabase.js');

//cleaner.cleanUsers();

add.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 33, function(success) {
	if (success) {
		console.log("success!");
	} else {
		console.log("failure.");
	}

});