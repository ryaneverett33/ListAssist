var express = require('express');
var router = express.Router();
var authenticator = require('../management/authenticator');
var helpers = require('./helpers');
var userManager = require('../management/userManagement'); 
/*
id: user id
name: profile name
imageUrl: url to profile pic
email: profile email
tokenId: token ID
provider: [google, ANYTHING ELSE WE PLAN ON implementing]
*/
router.post('/login', function(req, res, next) {
    console.log("Called login");
    helpers.resolveBody(req, function(body) {
        console.log("body: " + body);
        if (body == null) {
            res.setHeader("content-type", "application/json");
            res.send(400, JSON.stringify({ error: "Empty Request" }));
            return;
        }
        var json = body;
        try {
            json = JSON.parse(body);
            if (json == null) {
                console.log("json null");
                res.setHeader("content-type", "application/json");
                res.send(400, JSON.stringify({ error: "Bad JSON" }));
                return;
            }
        }
        catch (e) {
            console.log(e);
            res.setHeader("content-type", "application/json");
            res.send(400, JSON.stringify({ error: "Bad JSON" }));
            return;
        }
        //authenticate before proceeding
        var AuthObj = {
            tokenId : json.tokenId,
            provider : json.provider,
            name : json.name,
            email : json.email
        };
        authenticator.authenticate(AuthObj, function(UserObj) {
            if (UserObj !== null) {
                /*res.setHeader("content-type", "application/json");
                res.send(200, "Authenticated: " + JSON.stringify(UserObj));
                return;*/
            }
            else {
                res.setHeader("content-type", "application/json");
                res.send(400, "Failed to Authenticate");
                return;
            }
        });
    });
});
router.post('/logout', function(req, res, next) {
    console.log("Called logout");
    res.send("CALLED LOGOUT");
});
module.exports = router;