var mocha = require('mocha');
var chai = require('chai');
var expect = require('chai').expect;
var deleter = require('../database/deleteEntry');
var UserControl = require('../database/UserControl');
var pool = require('../database/./connections.js');
pool.initiate_test();



let userObj = {
    name : "testy name",
    profile_pic : "NULL",
    email : "testy email",
    id : 5,
    profile_pic : "testy image"
};
let cleanup = false;

describe('UserControl', function() {
    this.timeout(15000);

    it("successfully puts userObj into db", function(done) {
        UserControl.putUser(userObj, function(success) {
            //expect(success).equal(true, "Put userObj in db");
            expect(success).to.be.true;
            done();
        });
    });
    it("fails to put userObj into db", function(done) {
        UserControl.putUser(userObj, function(success) {
            expect(success).to.be.false;
            done();
        });   
    });
    it("successfully checks if userObj is in db", function(done) {
        UserControl.isUserInDb(userObj, function(exists) {
            expect(exists).to.be.true;
            done();
        });
    });
    it("successfully gets userObj from db", function(done) {
        UserControl.getUser(userObj.id, function(user) {
            expect(user).to.be.not.null;
            expect(user.getName()).to.equal(userObj.name);
            expect(user.getEmail()).to.equal(userObj.email);
            expect(user.getId()).to.equal(userObj.id.toString());
            expect(user.getImage()).to.equal(userObj.profile_pic);
            done();
        });
    });
    it("fails to get userObj from db", function(done) {
        UserControl.getUser('-1', function(user) {
            expect(user).to.be.null;
            done();
        });
    });
    //This should be in after but after() isn't working
    it("cleans up UserControl", function(done) {
        //delete added userObjs
        //delete user
        deleter.deleteUser(5, function(success) {
            console.log("UserControlTests cleanup: %s", success);
            //cleanup = true;
            done();
        });
    });
});