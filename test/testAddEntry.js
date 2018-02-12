var chai = require('chai');
var creator = require('../database/./addEntry.js');
var cleaner = require('../database/./cleanDatabase.js');

global.expect = chai.expect;


//ADD USERS
describe('createUserDatabasae', function() {
	this.timeout(15000);
	beforeEach(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					done();
				});

			});
		});
	});

	it('add user Phil with id=1', function(done) {
		creator.createUser(1, "Phil", success => {
			expect(success).to.be.true;
			done();
			//return;
		});
	});

	it('add user with too large an id', function (done) {
		creator.createUser(2147483648, "Darrell", function(success) {
			expect(success).to.equal(false);
			done();

		});
	});

	it('add user with too small an id', function (done) {
		creator.createUser(-2147483649, "Darrell", function(success) {
			expect(success).to.equal(false);
			done();


		});
	});

	it('add user with duplicate id', function (done) {
		creator.createUser(8, "Darrell", function(success) {
			creator.createUser(8, "Tarence", function(success2) {
				expect(success2).to.equal(false);
				done();
			});
			
			//expect(success).to.equal(true);
			//done();
			//return;
		});	
	});

	it('add user, no name in username field', function (done) {
		creator.createUser(99, "", function(success) {
			expect(success).to.equal(false);
			done();
		});
	});
		
	it('add user, too large a name', function (done) {
		var sixty_five = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		creator.createUser(99, sixty_five, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});
});

//ADD LISTS (needs user_id, name)
describe('createListDatabasae', function() {
	this.timeout(15000);
	
	before(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser(11, "steven", function(success) {
						creator.createUser(111, "Pam", function(success) {
							done();
						});
					});
				});
			});
		});
	});



	it('add list', function (done) {
		creator.createList(11, "pams List 1", null, function(success) {
			expect(success).to.equal(true);
			done();
		});
	});

	it('add list', function (done) {
		creator.createList(111, "pams List 1", null, function(success) {
			expect(success).to.equal(true);
			done();
		});
	});

	it('add list not a user', function (done) {
		creator.createList(1111111, "pams List 1", null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});

	it('add list id out of bounds', function (done) {
		creator.createList(-1111111111111111, "pams List 1", null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});

	it('add list id out of bounds', function (done) {
		var sixty_five = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		creator.createList(-1111111111111111, sixty_five, null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});

	it('add list id list of size 0', function (done) {
		var zero = ""
		creator.createList(-1111111111111111, zero, null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});
});

//create items
describe('createItemsDatabase', function() {
	this.timeout(15000);
	before(function(done) {	
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser(11, "steven", function(success) {
						creator.createUser(111, "Pam", function(success) {
							creator.createList(111, "list 2", 33, function(success) {
								creator.createList(11, "list 1", 10, function(success) {
									done();
								});
							});
						});
					});
				});
			});
		});
	});


	it('add item 1', function (done) {
		creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 33, null, function(success) {
			expect(success).to.equal(true);
			done();
		});
	});

	it('add item to nonexistant list', function (done) {
		creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 0, null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});

	it('add item 2', function (done) {
		creator.createItem("an item", "www.picture.com", "Ronald McDonald", 0, 10, null, function(success) {
			expect(success).to.equal(true);
			done();
		});
	});

	it('add item number fields', function (done) {
		creator.createItem(8, 99, 11, 1, 10, null, function(success) {
			expect(success).to.equal(true);
			done();
		});
	});

	it('add item null fields', function (done) {
		creator.createItem(null, null, null, 1, 0, null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});

});
