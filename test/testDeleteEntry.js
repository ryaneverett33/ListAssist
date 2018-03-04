var chai = require('chai');
var creator = require('../database/./addEntry.js');
var getter = require('../database/./getEntry.js');
var deleter = require('../database/./deleteEntry.js');
var cleaner = require('../database/./cleanDatabase.js');

global.expect = chai.expect;

describe('deleteDatabase', function() {
	this.timeout(20000);

	beforeEach(function(done) {
		cleaner.cleanUsers(function(clean1) {
			cleaner.cleanLists(function(clean2) {
				cleaner.cleanItems(function(clean3) {
					creator.createUser("556", 'Mitch Daniels', null, "d@gmail.com", null,  function(success1) {
						creator.createList("556", 'Mitch\'s list', 10, function(success2) {
							creator.createList("556", "Mitch's list 2", 11, function(success3) {
								creator.createUser("10", 'Ashay', null, "d@gmail.com", null,  function(success4) {
									//name, picture_url, buyer, purchased, list_id, item_id, callback
									creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 11, null, function(success5) {
										done();
									});
								});
							});
						});
					});
				});
			});
		});
	});

	it('delete user mitch daniels (and his lists and items)', function(done) {
		//delete user, cascades down to user's lists and items
		deleter.deleteUser(556, function(results1) {
			expect(results1).to.be.true;
			//check to see if user still exists
			getter.getUser(556, function(results2) {
				expect(results2 == null);
				//check to see if user still has lists
				getter.getLists(556, function(results3) {
					expect(results3 == null);
					//check to see if user still has items
					getter.getItems(11, function(results4) {
						expect(results4 == null);
						done();
					});
				});	
			});
		});
	});

	it('delete an item', function(done) {
		deleter.deleteItem(1, function(results) {
			expect(results).to.be.true;
			//list only had one item in it, so it should now be null
			getter.getItems(11, function(results2) {
				expect(results2 == null);
				done();
			});
		});
	});

	it('delete a list', function(done) {
		deleter.deleteList(10, function(results) {
			//now user should not have list with that id
			getter.getLists(556, function(results2) {
				expect(results2 != null);
				if (results2 != null) {
					for (var i = 0; i < results2.length; i++) {
						expect(results2[i].row.id != 10);
					}
				}
				done();
			});
		});
	});

	it('delete a user that doesn\'t exist', function(done) {
		deleter.deleteUser(0, function(results) {
			//want this to return true, since the user is not in database after call
			expect(results).to.be.true;
			done();
		});
	});

	it('delete a list that doesn\'t exist', function(done) {
		deleter.deleteList(0, function(results) {
			//want this to return true, since the list is not in database after call
			expect(results).to.be.true;
			done();
		});
	});

	it('delete an item that doesn\'t exist', function(done) {
		deleter.deleteItem(0, function(results) {
			//want this to return true, since the item is not in database after call
			expect(results).to.be.true;
			done();
		});
	});
});