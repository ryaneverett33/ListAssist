var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var ListManagement = require('../management/listManagement');
//var pool = require('../database/connections');
//require('../database/connections').initiate_test();
require('../database/connections').initiate();

var successfulId = "100946702532171911600";
var incorrectId = "0";
describe('list/add', function() {
    it('successfully gets all lists', function(done){
        ListManagement.createList("testy listy", successfulId, function(id) {
            console.log("ID: %s", id);
            expect(id).to.not.be.null;
        });
    });
    /*it('fails to get all lists', function(done){
        ListManagement.createList("testy listy", incorrectId, function(id) {
            expect(id == null);
        });
    });*/
});
describe('list/new', function() {
    it('successfully creates a list', function(done){

    });
    it('fails to create a list', function(done){

    });
});
describe('list/edit', function() {
    it('successfully edits a list', function(done){

    });
    it('fails to edit a list', function(done){

    });
});
describe('list/get', function() {
    it('successfully gets a list', function(done){

    });
    it('fails to get a list', function(done){

    });
});