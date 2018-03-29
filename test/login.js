var mocha = require('mocha');
var chai = require('chai');
var chaihttp = require('chai-http');
var userRouteHandler = require('../routes/userRouteHandler');
var expect = require('chai').expect;

chai.use(chaihttp);
let loginurl = 'user/login';
let app = 'http://listassist.duckdns.org/'
describe('user/login', function(done) {
    before(function() {
        console.log("\n TESTS MAY FAIL if validtoken isn't updated. Verify validtoken is updated before running\n");
    });
    var invalidtoken = '0';
    var validtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM3NmVhMWUyZjRjOTM3YzMzM2QxZTI0YjU2NDczOGZjMDRjOTkwMDkifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5NDY3MDI1MzIxNzE5MTE2MDAiLCJlbWFpbCI6InJ5YW5ldmVyZXR0MzNAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImtHVFROQnh6WWdrcEk4YmhQd0ZvZ1EiLCJleHAiOjE1MjIzNDQ0MzAsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiJlMjgxNDM4YzRkMWExYmMyZGIwNmQwY2U2YmY2YzY3YTdlNDlkZmFhIiwiaWF0IjoxNTIyMzQwODMwLCJuYW1lIjoiUnlhbiBFdmVyZXR0IiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWkhZUDZ2eUZheVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQlUvT1NMZzhtczd0cXMvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlJ5YW4iLCJmYW1pbHlfbmFtZSI6IkV2ZXJldHQiLCJsb2NhbGUiOiJlbiJ9.NVu9zi_gK1WX6ALZ3b0FakaZtsEkkMZ8NnNnbAu4kHjX7tnizoMCYBlP-8JEdYsoFoSsHDH5-e3tulqYwNfgh4X2TjJgOR8R4ZBhZnvPlN4QhnYER96Ka780exnpTXWHFwnOlMz0O0fDsHrI6zATfTwzaWPCCsl-omUNlTJbWweo79eJwT9XeM-1_GpptVZAS8KFZu9W35txnAGnvEXI7PmeFeDXB_fIf7JYO2spn_Z0xQj2vXPhl2F6rGg8mza_6A4xaP0_lN7Wa5nRCIGHYGI3gqolnss8O9s07dBP8NDCKGBSKzsn_knCD-HmsWSba5PR3hE6Nl17cXpK1h5aNw';
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