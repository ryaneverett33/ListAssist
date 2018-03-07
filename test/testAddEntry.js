var chai = require('chai');
var creator = require('../database/./addEntry.js');
var cleaner = require('../database/./cleanDatabase.js');
var pool = require('../database/./connections.js');
pool.initiate_test();
global.expect = chai.expect;


//ADD USERS
describe('createUserDatabasae', function() {
	this.timeout(15000);
	before(function(done) {

		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					done();
				});

			});
		});
	});

	it('add user Phil with id=1', function(done) {
		//id, username, name, email, image
		creator.createUser("1", "Phil", "Phil M", "email@email.com" , "url", success => {
			expect(success).to.be.true;
			done();
			//return;
		});
	});

	it('add user with too large an id', function (done) {
		creator.createUser("0123456789012345678901234567890", "Darrell", "Darrel W", "gmail@gmail.com", "url.com", function(success) {
			expect(success).to.equal(false);
			done();

		});
	});

	it('add user with too small an id', function (done) {
		creator.createUser("", "Darrell", null, "d@gmail.com", null, function(success) {
			expect(success).to.equal(false);
			done();


		});
	});

	it('add user with duplicate id', function (done) {
		creator.createUser("8", "Darrell", null, "d@gmail.com", null, function(success) {
			creator.createUser("8", "Tarence", null, "t@gmail.com", null,  function(success2) {
				expect(success2).to.equal(false);
				done();
			});
			
			//expect(success).to.equal(true);
			//done();
			//return;
		});	
	});

	it('add user, no name in username field', function (done) {
		creator.createUser("99", "", null, "d@gmail.com", null,  function(success) {
			expect(success).to.equal(false);
			done();
		});
	});
		
	it('add user, too large a name', function (done) {
		var sixty_five = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		creator.createUser("99", sixty_five, null, "d@gmail.com", null,  function(success) {
			expect(success).to.equal(false);
			done();
		});
	});
});

//ADD LISTS (needs user_id, name)
describe('createListDatabase', function() {
	this.timeout(15000);
	
	before(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser("11", "steven", null, "d@gmail.com", null,  function(success) {
						creator.createUser("111", "Pam", null, "d@gmail.com", null,  function(success) {
							done();
						});
					});
				});
			});
		});
	});



	it('add list', function (done) {
		creator.createList("11", "stevens List", null, function(success) {
			expect(success).to.equal(true);
			done();
		});
	});

	it('add list', function (done) {
		creator.createList("111", "pams List", null, function(success) {
			expect(success).to.equal(true);
			done();
		});
	});

	/*it('add list not a user', function (done) {
		creator.createList("1111111", "pams List 1", null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});*/

	it('add list name too large', function (done) {
		var sixty_five = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		creator.createList("11", sixty_five, null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});

	it('add list name of size 0', function (done) {
		var zero = ""
		creator.createList("11", zero, null, function(success) {
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
					creator.createUser("11", "steven", null, "d@gmail.com", null,  function(success) {
						creator.createUser("111", "Pam", null, "d@gmail.com", null,  function(success) {
							creator.createList("111", "list 2", 33, function(success) {
								creator.createList("11", "list 1", 10, function(success) {
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

	/*it('add item to nonexistant list', function (done) {
		creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 0, null, function(success) {
			expect(success).to.equal(false);
			done();
		});
	});*/

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
