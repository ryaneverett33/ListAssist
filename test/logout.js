var mocha = require('mocha');
var chai = require('chai');
var chaihttp = require('chai-http');
var userRouteHandler = require('../routes/userRouteHandler');

chai.use(chaihttp);
let loginurl = 'user/login';
let logouturl = 'user/logout';
let app = 'http://localhost:3000/';
// Make sure the user is logged in first
describe('user/logout', function() {
    var validtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyNzY3MWQ3M2EyNjA1Y2NkNDU0NDEzYzRjOTRlMjViM2Y2NmNkZWEifQ.eyJhenAiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzM1OTkyMTEyMzEtcWNlOG9saTltNGtqbGI5ZmwwYWgzNWV2ZzRlOHNlanUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5NDY3MDI1MzIxNzE5MTE2MDAiLCJlbWFpbCI6InJ5YW5ldmVyZXR0MzNAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkFCWlVQSWwxSW84bUQ4WDBCNWNwNlEiLCJleHAiOjE1MTg0MDA3NzAsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiIxODczMWE5ZjdmYmM4YmZiNmRlZDQ5YjU0M2UyOGZiZDVmOGY3ZjIyIiwiaWF0IjoxNTE4Mzk3MTcwLCJuYW1lIjoiUnlhbiBFdmVyZXR0IiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWkhZUDZ2eUZheVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQlUvT1NMZzhtczd0cXMvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlJ5YW4iLCJmYW1pbHlfbmFtZSI6IkV2ZXJldHQiLCJsb2NhbGUiOiJlbiJ9.NUOJTMstwIGR9g_5hAlaYd7HFjQnuQqiSM6-7umTvdexQyYSCH9fp86gGjuQPTdBQRkGmI2Bp0X0vGCeQjar7W2GTqLdBq8WGCp8EMQND25n5tG6aVODEWAwAkdDfX_lOXOtCxVNfhMsw9ADxkLN3U0VeC7IUdYoF6q-1kAkAwmzYjnyGXQPGELlL5mTrtfbJSceio9Hqcb54G2SHqj364TF770H0PAnLY3WRE5IVi59rJ5neGQVWNg4zxpvMCuk8qorWOq2JA423Qdm1RjGTQh3wCgs3TyeGBXB2r2O2w7pwOoLb-vrx6zK_og9h0iPn_dZ1jIdd46duKJex8Nqxw';
    it('successfully logs out a user', function() {
        chai.request(app).post(logouturl).send({
            tokenId : validtoken,
        }).end(function(err, res) {
            expect(err == null);
            expect(res.status === 200);
        });
    });
    it('failed to logout a user', function() {
        chai.request(app).post(logouturl).send({
            tokenId : -1,
        }).end(function(err, res) {
            expect(err == null);
            expect(res.status === 500);
        });
    });
});