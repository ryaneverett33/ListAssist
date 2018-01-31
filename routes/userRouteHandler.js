var express = require('express');
var router = express.Router();
var authenticator = require('../management/authenticator');
var helpers = require('./helpers');
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
        /*try {
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
        }*/
        //authenticate before proceeding
        authenticator.authenticate({ tokenId: json.tokenId, provider: json.provider }, function(success) {
            if (success) {
                res.setHeader("content-type", "application/json");
                res.send(200, JSON.stringify({ error: "gg" }));
                return;
            }
            else {
                console.log("OAuth token not authenticated");
                res.setHeader("content-type", "application/json");
                res.send(400, JSON.stringify({ error: "Bad OAuth Token" }));
                return;
            }
        })
        //res.send("CALLED LOGIN");
    });
});
router.post('/logout', function(req, res, next) {
    console.log("Called logout");
    res.send("CALLED LOGOUT");
});
module.exports = router;