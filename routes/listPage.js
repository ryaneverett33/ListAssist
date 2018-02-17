var express = require('express');
var router = express.Router();
var httproot = require('../util/http-root');

/* GET home page. */
router.get('/:listId/', function(req, res, next) {
  console.log("Requested list id is " + req.params.listId);
  var listId = req.params.listId;
  //check if list id is valid
  if (listId == 0) {
    //return example
    //serve the items page
    res.render('itemsExample');   
  }
  else {
    //send error
    res.render('error', {
      message : "Invalid List, doesn't exist",
      error : {
        status : 400,
        stack : ex
      }
    });
  }
  //res.sendFile('/listpage.html', {root : httproot.getRoot()});
});

module.exports = router;
