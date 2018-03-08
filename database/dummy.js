var deleter = require('./deleteEntry.js');
var creator = require('../database/./addEntry.js');

var pool = require('./connections.js');
pool.initiate_test();

/*
creator.createUser("555", "Phil", "Phil M", "email@email.com" , "url", success => {
			//expect(success).to.be.true;
			//done();
			//return;
			console.log(success)
});

creator.createList("555", "Mitch's list", 10, function(success2) {
	creator.createList("555", "Mitch's list 2", 11, function(success2) {
		creator.createUser("10", "Ashay", null, "d@gmail.com", null,  function(success) {
			//name, picture_url, buyer, purchased, list_id, item_id, callback
			creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 11, null, function(success) {
				creator.createItem("another one", "yep", null, 0,11, null, function(success) {
					console.log(success);
				//done();
				});
			});
		});
	});
});
*/


deleter.deleteList(10, function(success) {
	console.log(success)
})

deleter.deleteUser(555, function(success) {
	console.log(success)
})