var chai = require('chai');
var creator = require('../database/./addEntry.js');
var getter = require('../database/./getEntry.js');
var cleaner = require('../database/./cleanDatabase.js');

global.expect = chai.expect;

describe('getUserDatabase', function() {
	this.timeout(15000);
	before(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser(555, "Mitch Daniels", function(success) {
						creator.createUser(888, "Cornelius Vanderbilt", function(success2) {
							done();
						});
					});
				});
			});
		});
	});

	it('get user 555 (Mitch Daniels)', function(done) {
		getter.getUser(555, function(results) {
			expect(results[0].id == 555);
			expect(results[0].username === "Mitch Daniels");
			done();
		});
	});

	it('get user 888 (Cornelius Vanderbilt)', function(done) {
		getter.getUser(888, function(results) {
			expect(results[0].id == 888);
			expect(results[0].username === "Cornelius Vanderbilt");
			done();
		});
	});

	it('get user that doesn\'t exist', function(done) {
		getter.getUser(888, function(results) {
			expect(results == false);
			done();
		});
	});
});

describe('getListDatabase', function() {
	this.timeout(15000);
	before(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser(555, "Mitch Daniels", function(success) {
						creator.createList(555, "Mitch's list", "boilermakerz", 10, function(success2) {
							creator.createList(555, "Mitch's list 2", "IU sucks", 11, function(success2) {
								creator.createUser(10, "Ashay", function(success) {
									//name, picture_url, buyer, purchased, list_id, item_id, callback
									creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 11, null, function(success) {
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

	it('get user 555\'s lists', function(done) {
		getter.getLists(555, function(results) {
			expect(results[0].row.id == 10);
			expect(results[0].row.user_id == 555);
			expect(results[0].row.name === "Mitch's list");
			expect(results[0].row.desciption === "boilermakerz");
			expect(results[1].row.id == 11);
			expect(results[1].row.user_id == 555);
			expect(results[1].row.name === "Mitch's list 2");
			expect(results[1].row.desciption === "IU sucks");
			expect(results[1].items[0].id == 1);
			done();
		});
	});


	it('get list that doesn\'t exist', function(done) {
		getter.getLists(12, function(results) {
			expect(results == null);
			done();
		});
	});

	it('get user who doesn\'t have a list', function(done) {
		getter.getLists(10, function(results) {
			expect(results == null);
			done();
		});
	});
});


describe('getItemsDatabase', function() {
	this.timeout(15000);
	before(function(done) {
		cleaner.cleanUsers(function() {
			cleaner.cleanLists(function() {
				cleaner.cleanItems(function() {
					creator.createUser(555, "Mitch Daniels", function(success) {
						creator.createList(555, "Mitch's list", "boilermakerz", 10, function(success2) {
							creator.createList(555, "Mitch's list 2", "IU sucks", 11, function(success2) {
								creator.createUser(10, "Ashay", function(success) {
									//name, picture_url, buyer, purchased, list_id, item_id, callback
									creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 11, 37, function(success) {
										creator.createItem("item 2", "www.picturesque.com", "Tim Duncan", 0, 11, 38, function(success) {
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
	});

	it('get list 11\'s items (2)', function(done) {
		getter.getItems(11, function(results) {
			expect(results[0].id == 37);
			expect(results[0].name === "Ronald McDonald");
			expect(results[1].id == 38);
			expect(results[1].name === "Tim Duncan");
			done();
		});
	});


	it('get items from empty list', function(done) {
		getter.getItems(10, function(results) {
			expect(results == null);
			done();
		});
	});

	it('get items from list that doesn\'t exist', function(done) {
		getter.getLists(1111, function(results) {
			expect(results == null);
			done();
		});
	});

});