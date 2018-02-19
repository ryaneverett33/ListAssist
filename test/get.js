var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

let loginurl = 'user/login';
let logouturl = 'user/logout';
let geturl = 'user/get';

var app = 'http://listassist.duckdns.org/';
chai.use(chaiHttp);

// Make sure the user is logged in first
describe('user/get', function() {
    before(function() {
        console.log("\n TESTS MAY FAIL if validtoken isn't updated. Verify validtoken is updated before running\n");
    });
    var validtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlMTg3MTc3Zjk5ODdjMTkxMDg1MTA3ZjY4M2E2ZWEyNzdhZmJjOGQifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5NDY3MDI1MzIxNzE5MTE2MDAiLCJlbWFpbCI6InJ5YW5ldmVyZXR0MzNAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlJEclcwQ1ozNnh0dnIxTDVWNENRYlEiLCJleHAiOjE1MTkwMDgzNzAsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiI2YTczZjJkOGY1ZWMwYzA3NDQ0OWY1NjkzNTcyMGMzODkxZTM2ZGVlIiwiaWF0IjoxNTE5MDA0NzcwLCJuYW1lIjoiUnlhbiBFdmVyZXR0IiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWkhZUDZ2eUZheVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQlUvT1NMZzhtczd0cXMvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlJ5YW4iLCJmYW1pbHlfbmFtZSI6IkV2ZXJldHQiLCJsb2NhbGUiOiJlbiJ9.lxNeVNmI9O33o4SyvD-4uu3ugiSH-4jDCE6lT8DTOk4L7NbYjOy9JdQhYNz1Ykw7dnPF6OkPlkOX1UPidEi-WqOI5WlCXHepjzkri1d6qtWz30x96Y8A-XtdGyFyuzWUwJ4I_xkobJi7wzgYMWv40rB5S1CS4Pqxfocj_Oy7doDHIgSxlolxRlVOfvu3xFobivLfVQNwzj-TLpNz_qx6mC0XeV-sqSsMMbuYitHcjX0AppukHvuP_3YBshRuNnrFY8olmG2nSqN1uCuTz0QGiqZd6T4avgj8HYqWcfjC_m0AYuNC-CoEFeIgPiOmdVjd5Oov1qxEf-fks0kH1h9bkQ';

    it('successfully get a user', function(done) {

        chai.request(app).post(loginurl).send({
            tokenId : validtoken,
            provider : 'google',
            name : 'Ryan Everett',
            email : 'ryaneverett33@outlook.com'
        }).end(function(err, res) {
            expect(res).to.have.status(200);
            chai.request(app).post(geturl).send({
                token : validtoken,
            }).end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    it('successfully failed to get user', function(done) {
        chai.request(app).post(geturl).send({
            token : -1,
        }).end(function(err, res) {
            //expect(err).to.be.null;
            expect(res).to.have.status(400);
            done();
        });
    });
});