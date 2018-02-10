var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require('../app');

chai.use(chaiHttp);

it('shows the homepage', function () { // <= Pass in done callback
    chai.request(app)
        .get('/')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done(); // <= Call done to signal callback end
        });
});