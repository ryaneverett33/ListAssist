var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');

var app = require('../app');

chai.use(chaiHttp);

/*
    HTTP Tests
*/
describe('homepage', () => {
    it('shows the homepage', function (done) { // <= Pass in done callback
        chai.request(app)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done(); // <= Call done to signal callback end
            });
    });

})

describe('error page', () => {
    it('shows the error page', function (done) { // <= Pass in done callback
        chai.request(app)
            .get('/TESTERRORROUTE')
            .end(function (err, res) {
                expect(res.status).to.not.be.null;
                done(); // <= Call done to signal callback end
            });
    });

})

describe('googlesignin page', () => {
    it('shows the sign in page', function (done) { // <= Pass in done callback
        chai.request(app)
            .get('/googlesignin.html')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done(); // <= Call done to signal callback end
            });
    });
})