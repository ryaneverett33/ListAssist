var chai = require('chai');
var setter = require('../database/./setEntry.js');
var creator = require('../database/./addEntry.js');
var cleaner = require('../database/./cleanDatabase.js');

global.expect = chai.expect;

describe('setUserDatabasae', function() {
	this.timeout(15000);
	
	before(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser(11, "family", function(success) {
						creator.createUser(111, "matters", function(success) {
							done();
						});
					});
				});
			});
		});
	});

	it('set user 11 name to number', function(done) {
		setUser(11, 123, function(success) {
			expect(success).to.be.true;
		});
	});

	it('set user 11 name to new name', function(done) {
		setUser(11, "new name", function(success) {
			expect(success).to.be.true;
		});
	});

	it('set user 11 name to new invalid name', function(done) {
		setUser(11, "", function(success) {
			expect(success).to.be.false;
		});
	});

	it('set user 11 name to new invalid name (too large)', function(done) {
		var sixty_five = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		setUser(11, sixty_five, function(success) {
			expect(success).to.be.false;
		});
	});
});


describe('setListDatabase', function() {
	this.timeout(15000);
	before(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser(11, "family", function(success) {
						creator.createUser(111, "matters", function(success) {
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

	//name, user id
	//id, column, new_value, callback
	it('set list 33 to new name', function(done) {
		setList(33, "name", "list 99", function(success) {
			expect(success).to.be.true;
		});
	});

	it('set list 33 to new user_id', function(done) {
		setList(33, "name", 11, function(success) {
			expect(success).to.be.true;
		});
	});

	it('set list 33 to invalid name', function(done) {
		setList(33, "name", "", function(success) {
			expect(success).to.be.true;
		});
	});

	it('set list 33 to invalid name', function(done) {
		setList(33, "name", 77, function(success) {
			expect(success).to.be.true;
		});
	});

	it('set list 33 to invalid user_id', function(done) {
		setList(33, "user_id", "lkj", function(success) {
			expect(success).to.be.true;
		});
	});

});


describe('setListDatabase', function() {
	this.timeout(15000);
	before(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser(11, "family", function(success) {
						creator.createUser(111, "matters", function(success) {
							creator.createList(111, "list 2", 33, function(success) {
								creator.createList(11, "list 1", 10, function(success) {
									creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 11, 100, function(success) {
										done();						
								});
							});
						});
					});
				});
			});
		});
	});
	//exports.setItem = function setItem(id, column, new_value, callback) {
	//changable columns: name (string entries), picture_url (string entries),
	//buyer (string), purchased (int, 0 if false), list_id (int)

	it('set item to valid ', function(done) {
		setItem(100, "name", "ok", function(success) {
			expect(success).to.be.true;
		});
	});

	it('set item name to be invalid ', function(done) {
		setItem(100, "name", "", function(success) {
			expect(success).to.be.false;
		});
	});

	it('set item  picture_url to be invalid', function(done) {
		setItem(100, "picture_url", "", function(success) {
			expect(success).to.be.false;
		});
	});

	it('set item  buyer to be invalid', function(done) {
		setItem(100, "buyer", 99, function(success) {
			expect(success).to.be.false;
		});
	});

	it('set item  list_id to be invalid', function(done) {
		setItem(100, "list_id", "string", function(success) {
			expect(success).to.be.false;
		});
	});

	it('set item buyer to be invalid', function(done) {
		setItem(100, "buyer", 99, function(success) {
			expect(success).to.be.false;
		});
	});
});

