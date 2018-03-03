var express = require('express');
var router = express.Router();
var UserManagement = require('../management/userManagement');
var ListManagement = require('../management/listManagement');
var helpers = require('./helpers');

/* get the page for creating a new list */
router.get('/new', function(req, res, next) {
  res.render('newlist', {});
});

/* create a new list */
router.post('/new', function(req, res, next) {
  
  
});
/* Get the lists of a user */
/*
token : "user login token" || userid : "user id"
*/
router.post('/get', function(req, res, next) {
  helpers.resolveBody(req, function(body) {
    if (body == null) {
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Empty Request" }));
      return;
    }
    var json = helpers.toJson(body);
    if (json == null) {
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
      return;
    }
    if (json.token == null && json.userid == null) {
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error : "Invalid Arguments"}));
      return;
    }
    if (json.token != null && json.userid != null) {
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error : "ya can't have both"}));
      return;
    }
    if (json.token != null) {
      //get User id from UserManagement (user is logged in)
      UserManagement.getUser(json.token, function(User) {
        if (User == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error : "Unable to retrieve user"}));
          return;
        }
        else {
          ListManagement.getLists(User.getId(), function(lists) {
            if (lists == null) {
              res.setHeader("content-type", "application/json");
              res.status(400).send(JSON.stringify({ error : "Unable to retrive lists" }));
              return;
            }
            else {
              res.setHeader("content-type", "application/json");
              res.status(200).send(JSON.stringify(lists));
              return;
            }
          });
        }
      });
    }
    else {
      //get Lists from given id
      ListManagement.getLists(json.userid, function(lists) {
        if (lists == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error : "Unable to retrive lists" }));
          return;
        }
        else {
          res.setHeader("content-type", "application/json");
          res.status(200).send(JSON.stringify(lists));
          return;
        }
      });
    }
  });
});

/* display a list */
router.get('/:id', function(req, res, next) {
  // todo: get the list from the database

  // todo:
  res.render('list', { title: 'List' });
});


module.exports = router;
