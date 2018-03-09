var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var ListManagement = require('../management/listManagement');
//var pool = require('../database/connections');
//require('../database/connections').initiate_test();
require('../database/connections').initiate_test();

var successfulId = "100946702532171911600";
var incorrectId = "-1";
var createdListId;
var itemId;
describe('list/new', function() {
    it('successfully creates a list lists', function(done){
        ListManagement.createList("testy listy", successfulId, function(id) {
            expect(id).to.not.be.null;
            createdListId = id;
            done();
        });
    });
    it('fails to create a list', function(done){
        ListManagement.createList("testy listy", null, function(id) {
            expect(id == null);
            done();
        });
    });
});
describe('list/add', function() {
    it('successfully adds an item to the list', function(done) {
        ListManagement.addItem("new item", createdListId, null, function(success) {
            expect(success).to.be.true;
            done();
        });
    });
    it('fails to add an item to the list', function(done) {
        ListManagement.addItem("new item", null, "picture link", function(success) {
            expect(success).to.be.false;
            done();
        });
    });
});
describe('list/edit', function() {
    it('successfully edits a list', function(done){
        ListManagement.getLists(successfulId, function(lists) {
            expect(lists).to.not.be.null;
            expect(lists[0]).to.not.be.null;
            var list = null;
            for (var i = 0; i < lists.length; i++) {
                var tmp_list = lists[i];
                if (tmp_list == null) continue;
                if (tmp_list.info.count > 0) {
                    list = tmp_list;
                    break;
                }
            }
            expect(list).to.not.be.null;
            var item = list.items[0];
            itemId = item.id;
            ListManagement.editItem(item.id, "picture_url", "http://google.com", function(success) {
                expect(success).to.be.true;
                done();
            });
        });
    });
    it('fails to edit a list', function(done){
        ListManagement.editItem(-1, "invalid", "doesntmatter", function(success) {
            expect(success).to.be.false;
            done();
        });
    });
});
describe('list/get', function() {
    it('successfully gets all lists', function(done){
        ListManagement.getLists(successfulId, function(lists) {
            expect(lists).to.not.be.null;
            done();
        });
    });
    it('fails to get all lists', function(done){
        ListManagement.getLists(incorrectId, function(lists) {
            console.log(lists);
            expect(lists.length).to.be.undefined;
            done();
        });
    });
});
describe('list/item/purchase', function() {
    it("Successfully purchases an item", function(done) {
        ListManagement.purchaseItem(itemId, "test purchase", function(success){
            expect(success).to.be.true;
            done();
        });
    });
    it("fails to purchase an item", function(done) {
        ListManagement.purchaseItem(itemId, "test purchase again", function(success){
            expect(success).to.be.false;
            done();
        });
    });
    it("fails to purchase invalid item", function(done) {
        ListManagement.purchaseItem(-1, "test invalid purchase", function(success) {
            expect(success).to.be.false;
            done();
        });
    })
});