var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

let loginurl = 'user/login';
let logouturl = 'user/logout';
let geturl = 'user/get';

var app = 'http://localhost:3000/';
chai.use(chaiHttp);

// Make sure the user is logged in first
describe('user/get', function() {
    var validtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyNzY3MWQ3M2EyNjA1Y2NkNDU0NDEzYzRjOTRlMjViM2Y2NmNkZWEifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5NDY3MDI1MzIxNzE5MTE2MDAiLCJlbWFpbCI6InJ5YW5ldmVyZXR0MzNAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImxtaEtjN1B1dnY2M24zYkkyMGRJNVEiLCJleHAiOjE1MTg0MDg1MDAsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiIyNTNkNDY1YmU2YWVlYjM0OTRkOGJlY2M0ZTBkOTA0MmJmYzRmMTZlIiwiaWF0IjoxNTE4NDA0OTAwLCJuYW1lIjoiUnlhbiBFdmVyZXR0IiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWkhZUDZ2eUZheVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQlUvT1NMZzhtczd0cXMvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlJ5YW4iLCJmYW1pbHlfbmFtZSI6IkV2ZXJldHQiLCJsb2NhbGUiOiJlbiJ9.en-SJ0AILdYzl-3KCsAUDYQZdS9SxBo_sNd6TDAjhLbb6FB1qHEYjXLRe0tFzvzj97JuOzco72R8DKo148Q4Yd0T7bYGBmqzkb8q9yFm-TuBzdlf2y1H0whplXn2690RlAEOx1fg8V_2sDY5CbwL_uc9Akv-LhxYti2Nmyt07t02a6NvCp-44YOgDpV9YytdE-eYtfB46GDRh8djNSREvxb9DYQXpTRA8OS_y4cKxqifOskh3q0CBC3apPuhsf7BFA5m-P5Xvb5bfMmsT47hL2vu_hKiYAsMXeXItpluFa2BhVkMEd03AwipdbNi266VxI4xVgSC-zgJ2noMAe-8QQ';

    it('successfully get a user', function(done) {

        chai.request(app).post(loginurl).send({
            tokenId : validtoken,
            provider : 'google',
            name : 'Ryan Everett',
            email : 'ryaneverett33@outlook.com'
        }).end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            chai.request(app).post(geturl).send({
                token : validtoken,
            }).end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    it('successfully failed to get user', function(done) {
        chai.request(app).post(geturl).send({
            token : -1,
        }).end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });
});