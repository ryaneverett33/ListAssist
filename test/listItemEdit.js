var mocha = require('mocha');
var chai = require('chai');
var chaihttp = require('chai-http');
var listHandler = require('../routes/list');
var expect = require('chai').expect;
var cleaner = require('../database/./cleanDatabase.js');
var creator = require('../database/./addEntry.js');
var pool = require('../database/./connections.js');
pool.initiate_test();

chai.use(chaihttp);

let item_edit_url = 'list/item/edit';
//let app = 'http://listassist.duckdns.org/'
var app = require('../app')

describe('list/item/edit', function(done) {
    this.timeout(15000);
    before(function(done) {
        cleaner.cleanUsers(function() {
            cleaner.cleanLists(function() {
                cleaner.cleanItems(function() {
                    creator.createUser("102313598252495021716", "will johnston", null, "willjohnston23@gmail.com", null,  function(success) {
                        creator.createList("102313598252495021716", "Mitch's list", 10, function(success2) {
                            creator.createList("102313598252495021716", "Mitch's list 2", 11, function(success2) {
                                //creator.createUser("10", "Ashay", null, "d@gmail.com", null,  function(success) {
                                    //name, picture_url, buyer, purchased, list_id, item_id, callback
                                    creator.createItem("an item", "www.picture.com", "Ronald McDonald", 1, 11, 37, function(success) {
                                        creator.createItem("item 2", "www.picturesque.com", "Tim Duncan", 0, 11, 38, function(success) {
                                            done();
                                        });
                                    });
                                //});
                            });
                        });
                    });
                });
            });
        });
    });
    

    var invalidtoken = '0';
    var validtoken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOWI5MjRiYjY1OWYwNzM1OGZkZjgyODhjZTU5ZjE4OWM0MDI4ZjQifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDIzMTM1OTgyNTI0OTUwMjE3MTYiLCJlbWFpbCI6IndpbGxqb2huc3RvbjIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYTM3OXVxeENZeVM4eUE4QVlPbUNPdyIsImV4cCI6MTUyMDIwMjE5NiwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImp0aSI6ImQwODY2MDFkZWFkZGMyNjNiNGNkZjk1MWI0OTFjZGRlZGJkYWUwZjAiLCJpYXQiOjE1MjAxOTg1OTYsIm5hbWUiOiJ3aWxsIGpvaG5zdG9uIiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tbXBxUThSenp6LTgvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUdpNGdmeDhrTTJMbVN2WWhnMTN0aE9XeG0yT2pGanc3US9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoid2lsbCIsImZhbWlseV9uYW1lIjoiam9obnN0b24ifQ.SvbLOUzIokDkZNcGT4gljDWDTOn182y5a6Jxl2mdGA8jGKnmi9q_nApR32DndBUsKa9-S1Sim_IkR-qI4WjuSeMA2h-fA7U1xrp1X1O2NqG4z5wd5Jv7cgEHrvoU0sDmIpPEYx3gmxB5z9WllSMxf64l-USxnK6Rz0Ie3_f3PNYf07D4-4Xzm-_m4dpkaHbkg7uSRngvu3nEodeA3BFVOMj2BheITML-lRgcjZ5JP9YqsDRqtgii63GpDw7m0JHtFlQeQinET6eMAwBfCz0ExVH_2JAVYHFgkRfPvVSR8HcUJ6PagHqQOcD3RuUPmxDepChdQVT8uXPENnBzQMrW5Q";
    
    it("edit an item name", function(done) {
        var data = {
            token : validtoken,
            id : 11,
            column : 'name',
            new_value : 'cs101'
        };
        chai.request(app).post(item_edit_url).send(data).end(function(err, res) {
            expect(res.status).equals(200);
            done();
        });
    });
    


    it("edit an item picture_url", function(done) {
        var data = {
            token : validtoken,
            id : 1,
            column : 'picture_url',
            new_value : 'www.edited.com'
        };
        chai.request(app).post(item_edit_url).send(data).end(function(err, res) {
            expect(res.status).equals(200);
            done();
        });
    });

    it("edit an item buyer", function(done) {
        var data = {
            token : validtoken,
            id : 1,
            column : 'buyer',
            new_value : 'Mitch Daniels'
        };
        chai.request(app).post(item_edit_url).send(data).end(function(err, res) {
            expect(res.status).equals(200);
            done();
        });
    });

    it("edit an item purchased", function(done) {
        var data = {
            token : validtoken,
            id : 1,
            column : 'purchased',
            new_value : '2'
        };
        chai.request(app).post(item_edit_url).send(data).end(function(err, res) {
            expect(res.status).equals(200);
            done();
        });
    });

    it("edit an item list_id fail", function(done) {
        var data = {
            token : validtoken,
            id : 1,
            column : 'list_id',
            new_value : '7'
        };
        chai.request(app).post(item_edit_url).send(data).end(function(err, res) {
            expect(res.status).equals(500);
            done();
        });
    });

    it("edit an item failed", function(done) {
        chai.request(app).post(loginurl).send({
            token : invalidtoken,
            id : 1,
            column : 'name',
            new_value : 'cs101'
        }).end(function(err, res) {
            expect(res.status).equals(500);
            done();
        });
    });

});