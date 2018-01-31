var express = require('express');
var router = express.Router();
var authenticator = require('../management/authenticator');
/*
id: user id
name: profile name
imageUrl: url to profile pic
email: profile email
tokenId: token ID
provider: [google, ANYTHING ELSE WE PLAN ON implementing]
*/
router.post('/login', function(req, res, next) {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log("Final body: " + body);
    });
    console.log("Called login");
    if (req == null) {
        res.setHeader("content-type", "application/json");
        res.send(400, JSON.stringify({ error: "Empty Request" }));
        return;
    }
    var json;
    try {
        json = JSON.parse(req.body);
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
    authenticator.authenticate({ tokenId: json.tokenId, provider: json.provider }, function(success) {
        if (success) {
            res.setHeader("content-type", "application/json");
            res.send(200, JSON.stringify({ error: "gg" }));
        }
        else {
            console.log("OAuth token not authenticated");
            res.setHeader("content-type", "application/json");
            res.send(400, JSON.stringify({ error: "Bad OAuth Token" }));
        }
    })
    res.send("CALLED LOGIN");
});
router.post('/logout', function(req, res, next) {
    console.log("Called logout");
    res.send("CALLED LOGOUT");
});
module.exports = router;