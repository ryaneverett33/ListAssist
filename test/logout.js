var mocha = require('mocha');
var chai = require('chai');
var chaihttp = require('chai-http');
var userRouteHandler = require('../routes/userRouteHandler');
var expect = require('chai').expect;

chai.use(chaihttp);
let loginurl = 'user/login';
let logouturl = 'user/logout';
let app = 'http://listassist.duckdns.org/';
// Make sure the user is logged in first
describe('user/logout', function(done) {
    var validtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlMTg3MTc3Zjk5ODdjMTkxMDg1MTA3ZjY4M2E2ZWEyNzdhZmJjOGQifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5NDY3MDI1MzIxNzE5MTE2MDAiLCJlbWFpbCI6InJ5YW5ldmVyZXR0MzNAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImNPYnpKbXYyRWZzdTFLRmFOWVI3RWciLCJleHAiOjE1MTkwMDEyMDksImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiIzZmQ3MDNiNWM3MjNhMTYzZDZlNjA5MDU3MzZkNDZhMzQ4NTIwMzVjIiwiaWF0IjoxNTE4OTk3NjA5LCJuYW1lIjoiUnlhbiBFdmVyZXR0IiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWkhZUDZ2eUZheVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQlUvT1NMZzhtczd0cXMvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlJ5YW4iLCJmYW1pbHlfbmFtZSI6IkV2ZXJldHQiLCJsb2NhbGUiOiJlbiJ9.LbsSFq4jdHdpXp7XuWbNp0pDLJLBLo6y7-btA7EhNRTX6ykRt2kKpdEPRJsuGOCcCgDob9FeUf9tqXvDLriCVXqiErSmzmEg5AMCLQmFIgoSD5liCRITuUyNqUYDosrl4qBtZ0OKLQgKx_VoZs9HSNR1ZBERoLvRn8A4kmr_s0_JwLUmJXYlBjB9yjoaA0ImsVhKzIlvIADyd42SmWfOQUyoxXVzX86c84I--rrK_aDaQMCChA-ZOv03_h6qx-ynXMW25n1_w7r6eRW_n2Z2eqcVT3y8y7nHrmFxGBZul_pLPs_kqNRNsyGTY8LT_o4PMtNp_9TIXF-KM_3-Vm35yA';
    it('successfully logs out a user', function(done) {
        var data = {
            token : validtoken
        }
        chai.request(app).post(logouturl).send(data).end(function(err, res) {
            //expect(;
            expect(res.status).equal(200);
            done();
        });
    });
    it('failed to logout a user', function(done) {
        var baddata = {
            token : -1
        };
        chai.request(app).post(logouturl).send(baddata).end(function(err, res) {
            /*expect(err == null);
            expect(res.status === 500);*/
            expect(res.status).equal(400);
            done();
        });
    });
});