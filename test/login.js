var mocha = require('mocha');
var chai = require('chai');
var chaihttp = require('chai-http');
var userRouteHandler = require('../routes/userRouteHandler');
var expect = require('chai').expect;

chai.use(chaihttp);
let loginurl = 'user/login';
let app = 'http://localhost:3000/'
describe('user/login', function(done) {
    var invalidtoken = '0';
    var validtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyNzY3MWQ3M2EyNjA1Y2NkNDU0NDEzYzRjOTRlMjViM2Y2NmNkZWEifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5NDY3MDI1MzIxNzE5MTE2MDAiLCJlbWFpbCI6InJ5YW5ldmVyZXR0MzNAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImxtaEtjN1B1dnY2M24zYkkyMGRJNVEiLCJleHAiOjE1MTg0MDg1MDAsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiIyNTNkNDY1YmU2YWVlYjM0OTRkOGJlY2M0ZTBkOTA0MmJmYzRmMTZlIiwiaWF0IjoxNTE4NDA0OTAwLCJuYW1lIjoiUnlhbiBFdmVyZXR0IiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWkhZUDZ2eUZheVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQlUvT1NMZzhtczd0cXMvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlJ5YW4iLCJmYW1pbHlfbmFtZSI6IkV2ZXJldHQiLCJsb2NhbGUiOiJlbiJ9.en-SJ0AILdYzl-3KCsAUDYQZdS9SxBo_sNd6TDAjhLbb6FB1qHEYjXLRe0tFzvzj97JuOzco72R8DKo148Q4Yd0T7bYGBmqzkb8q9yFm-TuBzdlf2y1H0whplXn2690RlAEOx1fg8V_2sDY5CbwL_uc9Akv-LhxYti2Nmyt07t02a6NvCp-44YOgDpV9YytdE-eYtfB46GDRh8djNSREvxb9DYQXpTRA8OS_y4cKxqifOskh3q0CBC3apPuhsf7BFA5m-P5Xvb5bfMmsT47hL2vu_hKiYAsMXeXItpluFa2BhVkMEd03AwipdbNi266VxI4xVgSC-zgJ2noMAe-8QQ';
    it("logins a user successfully", function(done) {
        var data = {
            tokenId : validtoken,
            provider : 'google',
            name : 'Ryan Everett',
            email : 'ryaneverett33@outlook.com'
        };
        chai.request(app).post(loginurl).send(data).end(function(err, res) {
            console.log(JSON.stringify({
                tokenId : validtoken,
                provider : 'google',
                name : 'Ryan Everett',
                email : 'ryaneverett33@outlook.com'
            }));
            console.log(err);
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