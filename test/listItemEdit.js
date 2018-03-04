var mocha = require('mocha');
var chai = require('chai');
var chaihttp = require('chai-http');
var listHandler = require('../routes/list');
var expect = require('chai').expect;

chai.use(chaihttp);

let item_edit_url = 'list/item/edit';
let app = 'http://listassist.duckdns.org/'

describe('list/item/edit', function(done) {
    before(function() {
        //clean test_database
        cleaner.cleanUsers(function() {
            cleaner.cleanLists(function() {
                cleaner.cleanItems(function() {
                    //create new user
                    creator.createUser(1, "Genghis Khan", function(success) {
                        //create list for user
                        creator.createList(1, "Potential Countries to Invade", "desc", 1, function(success) {
                            //create item in list
                            creator.createItem("Persia", "www.picture.com", null, 1, 1, 1, function(success) {
                                done(); 
                            });
                        });
                    });
                });
            });
        });
    });
    

    var invalidtoken = '0';
    var validtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlMTg3MTc3Zjk5ODdjMTkxMDg1MTA3ZjY4M2E2ZWEyNzdhZmJjOGQifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5NDY3MDI1MzIxNzE5MTE2MDAiLCJlbWFpbCI6InJ5YW5ldmVyZXR0MzNAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlJEclcwQ1ozNnh0dnIxTDVWNENRYlEiLCJleHAiOjE1MTkwMDgzNzAsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiI2YTczZjJkOGY1ZWMwYzA3NDQ0OWY1NjkzNTcyMGMzODkxZTM2ZGVlIiwiaWF0IjoxNTE5MDA0NzcwLCJuYW1lIjoiUnlhbiBFdmVyZXR0IiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWkhZUDZ2eUZheVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQlUvT1NMZzhtczd0cXMvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlJ5YW4iLCJmYW1pbHlfbmFtZSI6IkV2ZXJldHQiLCJsb2NhbGUiOiJlbiJ9.lxNeVNmI9O33o4SyvD-4uu3ugiSH-4jDCE6lT8DTOk4L7NbYjOy9JdQhYNz1Ykw7dnPF6OkPlkOX1UPidEi-WqOI5WlCXHepjzkri1d6qtWz30x96Y8A-XtdGyFyuzWUwJ4I_xkobJi7wzgYMWv40rB5S1CS4Pqxfocj_Oy7doDHIgSxlolxRlVOfvu3xFobivLfVQNwzj-TLpNz_qx6mC0XeV-sqSsMMbuYitHcjX0AppukHvuP_3YBshRuNnrFY8olmG2nSqN1uCuTz0QGiqZd6T4avgj8HYqWcfjC_m0AYuNC-CoEFeIgPiOmdVjd5Oov1qxEf-fks0kH1h9bkQ';
    
    it("logins a user successfully", function(done) {
        var data = {
            tokenId : validtoken,
            provider : 'google',
            name : 'Ryan Everett',
            email : 'ryaneverett33@outlook.com'
        };
        chai.request(app).post(loginurl).send(data).end(function(err, res) {
            /*expect(err == null);
            expect(res.status === 200);*/
            expect(res.status).equals(200);
            done();
        });
    });
    it("logins a user failed", function(done) {
        chai.request(app).post(loginurl).send({
            tokenId : invalidtoken,
            provider : 'google',
            name : 'blah',
            email : 'mail@mail.com'
        }).end(function(err, res) {
            /*expect(err == null);
            expect(res.status === 500);*/
            
            expect(res.status).equals(500);
            done();
        });
    });
});